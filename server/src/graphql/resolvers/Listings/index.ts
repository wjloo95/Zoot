import { IResolvers } from 'apollo-server-express';
import { ListingsArgs, ListingsData, ListingsSort } from './types';
import { Database } from '../../../lib/types';

export const listingsResolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      { sort, limit, page }: ListingsArgs,
      { db }: { db: Database }
    ): Promise<ListingsData> => {
      try {
        const data: ListingsData = {
          total: 0,
          result: [],
        };

        let cursor = await db.listings.find({});

        if (sort && sort === ListingsSort.PRICE_LOW_TO_HIGH) {
          cursor = cursor.sort({ price: 1 });
        }

        if (sort && sort === ListingsSort.PRICE_HIGH_TO_LOW) {
          cursor = cursor.sort({ price: -1 });
        }

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`Failed to query listings: ${error}`);
      }
    },
  },
};
