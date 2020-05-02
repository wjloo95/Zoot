import { IResolvers } from 'apollo-server-express';
import { Listing, Database } from '../../../lib/types';
import { ListingArgs } from './types';
import { Request } from 'express';
import { ObjectID } from 'mongodb';

export const listingResolvers: IResolvers = {
  Query: {
    listing: async (
      _root: undefined,
      { id }: ListingArgs,
      { db, req }: { db: Database; req: Request }
    ) => {
      try {
        const listing = await db.listings.findOne({ _id: new ObjectID(id) });

        if (!listing) {
          throw new Error('Listing could not be found');
        }

        return listing;
      } catch (error) {
        throw new Error(`Failed to find listing: ${error}`);
      }
    },
  },
  Listing: {
    id: (listing: Listing): string => {
      return listing._id.toString();
    },
  },
};
