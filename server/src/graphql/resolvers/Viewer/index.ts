import { IResolvers } from 'apollo-server-express';
import { Google, Stripe } from '../../../lib/api';
import { LogInArgs, ConnectStripeArgs, RegisterArgs } from './types';
import { Database, Viewer, User } from '../../../lib/types';
import { logInViaGoogle } from './logInViaGoogle';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { Response, Request } from 'express';
import { logInViaCookie } from './logInViaCookie';
import { logInViaLocal } from './logInViaLocal';
import { authorize, cookieOptions } from '../../../lib/utils';

export const viewerResolvers: IResolvers = {
  Query: {
    authUrl: () => {
      try {
        return Google.authUrl;
      } catch (error) {
        throw new Error(`Failed to query Google Auth URL: ${error}`);
      }
    },
  },
  Mutation: {
    register: async (
      _root: undefined,
      { input }: RegisterArgs,
      { db, res }: { db: Database; res: Response }
    ): Promise<Viewer> => {
      const { name, password } = input;
      const email = input.email.toLowerCase();
      const existingUser = await db.users.findOne({ email });
      if (existingUser) {
        return { token: 'existing', didRequest: true };
      } else {
        const SALT_ROUNDS = 10;

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const today = new Date();

        const sinceString =
          today.getFullYear() +
          '-' +
          ('0' + (today.getMonth() + 1)).slice(-2) +
          '-' +
          ('0' + today.getDate()).slice(-2);

        const token = crypto.randomBytes(16).toString('hex');

        const viewer = await db.users.insertOne({
          token,
          name,
          email,
          avatar: '',
          about: '',
          location: 'No Location Provided',
          since: sinceString,
          income: 0,
          bookings: [],
          listings: [],
          favoriteListings: [],
          password: hashedPassword,
        });
        const returnedViewer = viewer.ops[0];

        res.cookie('viewer', returnedViewer._id, {
          ...cookieOptions,
          maxAge: 365 * 24 * 60 * 60 * 1000,
        });

        return {
          _id: returnedViewer._id,
          token: returnedViewer.token,
          avatar: returnedViewer.avatar,
          walletId: returnedViewer.walletId,
          didRequest: true,
        };
      }
    },
    logIn: async (
      _root: undefined,
      { input }: LogInArgs,
      { db, req, res }: { db: Database; req: Request; res: Response }
    ): Promise<Viewer> => {
      const code = input ? input.code : '';
      const email = input ? input.email : '';
      const password = input ? input.password : '';

      const token = crypto.randomBytes(16).toString('hex');

      const viewer: User | null | undefined = input
        ? code === 'local'
          ? await logInViaLocal(email, password, db, res)
          : await logInViaGoogle(code, token, db, res)
        : await logInViaCookie(token, db, req, res);

      // Wrong Password or Account is connected to Google
      if (viewer === null) return { token: 'wrong', didRequest: true };
      if (!viewer) return { didRequest: true };

      return {
        _id: viewer._id,
        token: viewer.token,
        avatar: viewer.avatar,
        walletId: viewer.walletId,
        didRequest: true,
      };
    },
    logOut: (
      _root: undefined,
      _args: {},
      { res }: { res: Response }
    ): Viewer => {
      try {
        res.clearCookie('viewer', cookieOptions);
        return { didRequest: true };
      } catch (error) {
        throw new Error(`Failed to log out: ${error}`);
      }
    },
    connectStripe: async (
      _root: undefined,
      { input }: ConnectStripeArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<Viewer> => {
      try {
        const { code } = input;

        const viewer = await authorize(db, req);

        if (!viewer) {
          throw new Error('Could not find viewer');
        }

        const wallet = await Stripe.connect(code);

        if (!wallet) {
          throw new Error('Stripe Connection Error');
        }

        const updateRes = await db.users.findOneAndUpdate(
          { _id: viewer._id },
          { $set: { walletId: wallet.stripe_user_id } },
          { returnOriginal: false }
        );

        if (!updateRes.value) {
          throw new Error('Viewer could not be updated');
        }

        return {
          _id: updateRes.value._id,
          token: updateRes.value.token,
          avatar: updateRes.value.avatar,
          walletId: updateRes.value.walletId,
          didRequest: true,
        };
      } catch (error) {
        throw new Error(`Failed to connect to Stripe: ${error}`);
      }
    },
    disconnectStripe: async (
      _root: undefined,
      _args: {},
      { db, req }: { db: Database; req: Request }
    ): Promise<Viewer> => {
      try {
        const viewer = await authorize(db, req);

        if (!viewer || !viewer.walletId) {
          throw new Error(
            'Could not find viewer or viewer has not connected with Stripe'
          );
        }

        const wallet = await Stripe.disconnect(viewer.walletId);
        if (!wallet) {
          throw new Error('Error disconnecting with Stripe');
        }

        const updateRes = await db.users.findOneAndUpdate(
          { _id: viewer._id },
          { $set: { walletId: undefined } },
          { returnOriginal: false }
        );

        if (!updateRes.value) {
          throw new Error('Viewer could not be updated');
        }

        return {
          _id: updateRes.value._id,
          token: updateRes.value.token,
          avatar: updateRes.value.avatar,
          walletId: updateRes.value.walletId,
          didRequest: true,
        };
      } catch (error) {
        throw new Error(`Failed to disconnect from Stripe: ${error}`);
      }
    },
  },
  Viewer: {
    id: (viewer) => viewer._id,
    hasWallet: (viewer) => {
      return !!viewer.walletId;
    },
  },
};
