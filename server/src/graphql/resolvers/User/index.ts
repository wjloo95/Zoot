import { IResolvers } from 'apollo-server-express';
import { UserArgs, UserListsArgs, UserListsData } from './types';
import { Database, User, Booking, Listing } from '../../../lib/types';
import { Request } from 'express';
import { authorize } from '../../../lib/utils';
import { ObjectID } from 'mongodb';
import { AddFavoriteArgs } from '../Listing/types';

export const userResolvers: IResolvers = {
  Query: {
    user: async (
      _root: undefined,
      { id }: UserArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<User> => {
      try {
        const user = await db.users.findOne({ _id: new ObjectID(id) });

        if (!user) {
          throw new Error("User can't be found");
        }

        const viewer = await authorize(db, req);

        if (viewer && viewer._id === user._id) {
          user.authorized = true;
        }
        return user;
      } catch (error) {
        throw new Error(`Failed to find user: ${error}`);
      }
    },
  },
  Mutation: {
    addFavorite: async (
      _root: undefined,
      { input }: AddFavoriteArgs,
      { db }: { db: Database }
    ): Promise<Listing | null> => {
      try {
        const currentListing = await db.listings.findOne({
          _id: new ObjectID(input.id),
        });

        await db.users.findOneAndUpdate(
          { _id: new ObjectID(input.userId) },
          { $addToSet: { favoriteListings: currentListing?._id } }
        );

        return currentListing;
      } catch (error) {
        throw new Error(`Failed to add favorite: ${error}`);
      }
    },
    removeFavorite: async (
      _root: undefined,
      { input }: AddFavoriteArgs,
      { db }: { db: Database }
    ): Promise<Listing | null> => {
      try {
        const currentListing = await db.listings.findOne({
          _id: new ObjectID(input.id),
        });
        await db.users.findOneAndUpdate(
          { _id: new ObjectID(input.userId) },
          { $pull: { favoriteListings: currentListing?._id } },
          { returnOriginal: false }
        );

        return currentListing;
      } catch (error) {
        throw new Error(`Failed to remove favorite: ${error}`);
      }
    },
  },
  User: {
    id: (user: User) => user._id,
    hasWallet: (user: User) => !!user.walletId,
    income: (user: User) => (user.authorized ? user.income : null),
    bookings: async (
      user: User,
      { limit, page }: UserListsArgs,
      { db }: { db: Database }
    ): Promise<UserListsData<Booking> | null> => {
      try {
        if (!user.authorized) {
          return null;
        }

        const data: UserListsData<Booking> = {
          total: 0,
          result: [],
        };

        let cursor = await db.bookings.find({
          _id: { $in: user.bookings },
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
    listings: async (
      user: User,
      { limit, page }: UserListsArgs,
      { db }: { db: Database }
    ): Promise<UserListsData<Listing> | null> => {
      try {
        const data: UserListsData<Listing> = {
          total: 0,
          result: [],
        };

        let cursor = await db.listings.find({
          _id: { $in: user.listings },
        });

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`Failed to query user listings: ${error}`);
      }
    },
    favoriteListings: async (
      user: User,
      { limit, page }: UserListsArgs,
      { db }: { db: Database }
    ): Promise<UserListsData<Listing> | null> => {
      try {
        const data: UserListsData<Listing> = {
          total: 0,
          result: [],
        };

        let cursor = await db.listings.find({
          _id: { $in: user.favoriteListings },
        });

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`Failed to query user favorites: ${error}`);
      }
    },
  },
};
