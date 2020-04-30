import { IResolvers } from 'apollo-server-express';
import { Google } from '../../../lib/api';
import { LogInArgs } from './types';

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
    logIn: (type: LogInArgs) => {
      return 'Mutation.logIn';
    },
    logOut: () => {
      return 'Mutation.logOut';
    },
  },
  Viewer: {
    id: (viewer) => viewer._id,
    hasWallet: (viewer) => {
      return !!viewer.walletID;
    },
  },
};
