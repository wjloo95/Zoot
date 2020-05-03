import { IResolvers } from 'apollo-server-express';
import { Google, Stripe } from '../../../lib/api';
import { LogInArgs, ConnectStripeArgs } from './types';
import { Database, Viewer, User } from '../../../lib/types';
import { logInViaGoogle } from './logInViaGoogle';
import crypto from 'crypto';
import { Response, Request } from 'express';
import { logInViaCookie } from './logInViaCookie';
import { authorize } from '../../../lib/utils';

export const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === 'development' ? false : true,
};

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
    logIn: async (
      _root: undefined,
      { input }: LogInArgs,
      { db, req, res }: { db: Database; req: Request; res: Response }
    ): Promise<Viewer> => {
      const code = input ? input.code : null;
      const token = crypto.randomBytes(16).toString('hex');

      const viewer: User | undefined = code
        ? await logInViaGoogle(code, token, db, res)
        : await logInViaCookie(token, db, req, res);

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
      args: {},
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
        throw new Error('Failed to connect to Stripe');
      }
    },
    disconnectStripe: async (): Promise<Viewer> => {
      return { didRequest: true };
    },
  },
  Viewer: {
    id: (viewer) => viewer._id,
    hasWallet: (viewer) => {
      return !!viewer.walletID;
    },
  },
};
