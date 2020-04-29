import { IResolvers } from 'apollo-server-express';
import { Database, Listing } from '../lib/types';
import { ObjectID } from 'mongodb';

export const resolvers: IResolvers = {
  Query: {
    listings: async (root: undefined, args: {}, context: { db: Database }) => {
      const { db } = context;
      return await db.listings.find({}).toArray();
    },
  },
  Mutation: {
    deleteListing: async (
      root: undefined,
      args: { id: string },
      context: { db: Database }
    ) => {
      const { id } = args;
      const { db } = context;

      const deletedListing = await db.listings.findOneAndDelete({
        _id: new ObjectID(id),
      });

      if (!deletedListing.value) {
        throw new Error('Failed to delete listing');
      }

      return deletedListing.value;
    },
    Listing: {
      // Trivial resolvers since they just return a value with the same key, so they aren't necessary
      /*
      title: (listing: Listing) => listing.title,
      image: (listing: Listing) => listing.image,
      address: (listing: Listing) => listing.address,
      price: (listing: Listing) => listing.price,
      numOfGuests: (listing: Listing) => listing.numOfGuests,
      numOfBeds: (listing: Listing) => listing.numOfBeds,
      numOfBaths: (listing: Listing) => listing.numOfBaths,
      rating: (listing: Listing) => listing.rating,
      */
      id: (listing: Listing) => listing._id.toString(),
    },
  },
};
