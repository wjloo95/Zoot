import { IResolvers } from 'apollo-server-express';
import { Google } from '../../../lib/api';

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
    logIn: () => {
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
