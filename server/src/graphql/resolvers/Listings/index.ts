import { IResolvers } from 'apollo-server-express';
import {
  ListingsArgs,
  ListingsData,
  ListingsSort,
  ListingsQuery,
  LocationsData,
} from './types';
import { Database } from '../../../lib/types';
import { Google } from '../../../lib/api';
import { miscLocations } from './locationData';

export const listingsResolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      { location, sort, limit, page }: ListingsArgs,
      { db }: { db: Database }
    ): Promise<ListingsData> => {
      try {
        const query: ListingsQuery = {};

        const data: ListingsData = {
          region: null,
          total: 0,
          result: [],
        };

        if (location) {
          const { country, state, city } = await Google.geocode(location);

          if (city) query.city = city;
          if (state) query.state = state;
          if (country) {
            query.country = country;
          } else {
            throw new Error('No Country Found');
          }

          const cityText = city ? `${city}, ` : '';
          const stateText = state ? `${state}, ` : '';
          data.region = `${cityText}${stateText}${country}`;
        }

        let cursor = await db.listings.find(query);

        if (sort && sort === ListingsSort.PRICE_LOW_TO_HIGH) {
          cursor = cursor.sort({ price: 1 });
        }

        if (sort && sort === ListingsSort.PRICE_HIGH_TO_LOW) {
          cursor = cursor.sort({ price: -1 });
        }

        if (sort && sort === ListingsSort.RATINGS_COUNT) {
          cursor = cursor.sort({ reviews: -1 });
        }

        if (sort && sort === ListingsSort.RATINGS_VALUE) {
          cursor = cursor.sort({ rating: -1 });
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
    locations: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<LocationsData> => {
      try {
        let countries = await db.listings.distinct('country');

        const locations = [...miscLocations, ...countries];
        return { result: locations };
      } catch (error) {
        throw new Error(`Failed to get locations: ${error}`);
      }
    },
  },
};
