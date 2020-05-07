import { IResolvers } from 'apollo-server-express';
import { Listing, Database, User } from '../../../lib/types';
import {
  ListingArgs,
  ListingBookingsArgs,
  ListingBookingsData,
  HostListingArgs,
} from './types';
import { Request } from 'express';
import { ObjectID } from 'mongodb';
import { authorize, verifyHostListingInput } from '../../../lib/utils';
import { Google, Cloudinary } from '../../../lib/api';

export const listingResolvers: IResolvers = {
  Query: {
    listing: async (
      _root: undefined,
      { id }: ListingArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<Listing> => {
      try {
        const listing = await db.listings.findOne({ _id: new ObjectID(id) });

        if (!listing) {
          throw new Error('Listing could not be found');
        }

        const viewer = await authorize(db, req);

        if (viewer && viewer._id === listing.host) {
          listing.authorized = true;
        }

        return listing;
      } catch (error) {
        throw new Error(`Failed to find listing: ${error}`);
      }
    },
  },
  Mutation: {
    hostListing: async (
      _root: undefined,
      { input }: HostListingArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<Listing> => {
      verifyHostListingInput(input);

      const viewer = await authorize(db, req);

      if (!viewer) {
        throw new Error('Viewer cannot be found');
      }

      const { country, state, city, lat, lng } = await Google.geocode(
        input.street
      );

      if (!country || !state || !city) {
        throw new Error('Invalid address input');
      }

      const imageUrl = await Cloudinary.upload(input.image);

      const insertedResult = await db.listings.insertOne({
        ...input,
        _id: new ObjectID(),
        host: viewer._id,
        image: imageUrl,
        bookings: [],
        bookingsIndex: {},
        latitude: lat,
        longitude: lng,
        country,
        state,
        city,
        reviews: 0,
      });

      const newListing: Listing = insertedResult.ops[0];

      await db.users.updateOne(
        { _id: viewer._id },
        { $push: { listings: newListing._id } }
      );

      return newListing;
    },
  },
  Listing: {
    id: (listing: Listing): string => {
      return listing._id.toString();
    },
    host: async (
      listing: Listing,
      _args: {},
      { db }: { db: Database }
    ): Promise<User> => {
      const hostUser = await db.users.findOne({
        _id: new ObjectID(listing.host),
      });

      if (!hostUser) {
        throw new Error('Host could not be found');
      }

      return hostUser;
    },
    bookingsIndex: (listing: Listing): string => {
      return JSON.stringify(listing.bookingsIndex);
    },
    bookings: async (
      listing: Listing,
      { limit, page }: ListingBookingsArgs,
      { db }: { db: Database }
    ): Promise<ListingBookingsData | null> => {
      try {
        if (!listing.authorized) {
          return null;
        }

        const data: ListingBookingsData = {
          total: 0,
          result: [],
        };

        let cursor = await db.bookings.find({
          _id: { $in: listing.bookings },
        });

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`Failed to query user bookings: ${error}`);
      }
    },
  },
};
