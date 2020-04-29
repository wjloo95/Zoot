import { IResolvers } from 'apollo-server-express';
import { listings } from '../mockListings';

export const resolvers: IResolvers = {
  Query: {
    listings: () => {
      return listings;
    },
  },
  Mutation: {
    deleteListing: (root: undefined, args: { id: string }) => {
      const { id } = args;

      for (let i = 0; i < listings.length; i++) {
        if (listings[i].id === id) {
          return listings.splice(i, 1)[0];
        }
      }

      throw new Error('Failed to delete listing');
    },
  },
};
