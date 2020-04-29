import { IResolvers } from 'apollo-server-express';
import { Database } from '../lib/types';
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
  },
};
