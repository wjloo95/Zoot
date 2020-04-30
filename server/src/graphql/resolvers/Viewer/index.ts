import { IResolvers } from 'apollo-server-express';
import { Google } from '../../../lib/api';
import { LogInArgs } from './types';
import { Database, Viewer, User } from '../../../lib/types';
import { logInViaGoogle } from './logInViaGoogle';
import crypto from 'crypto';

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
      { db }: { db: Database }
    ): Promise<Viewer> => {
      const code = input ? input.code : null;
      const token = crypto.randomBytes(16).toString('hex');

      const viewer: User | undefined = code
        ? await logInViaGoogle(code, token, db)
        : undefined;

      if (!viewer) return { didRequest: true };

      return {
        _id: viewer._id,
        token: viewer.token,
        avatar: viewer.avatar,
        walletId: viewer.walletId,
        didRequest: true,
      };
    },
    logOut: (): Viewer => {
      try {
        return { didRequest: true };
      } catch (error) {
        throw new Error(`Failed to log out: ${error}`);
      }
    },
  },
  Viewer: {
    id: (viewer) => viewer._id,
    hasWallet: (viewer) => {
      return !!viewer.walletID;
    },
  },
};
