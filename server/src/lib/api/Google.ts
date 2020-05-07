import { google } from 'googleapis';
import { createClient } from '@google/maps';
import { parseAddress } from '../utils';

const authClient = new google.auth.OAuth2(
  process.env.G_CLIENT_ID,
  process.env.G_CLIENT_SECRET,
  `${process.env.PUBLIC_URL}/login`
);

const maps = createClient({ key: `${process.env.G_GEOCODE_KEY}`, Promise });

export const Google = {
  authUrl: authClient.generateAuthUrl({
    access_type: 'online',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  }),
  logIn: async (code: string) => {
    const { tokens } = await authClient.getToken(code);

    authClient.setCredentials(tokens);

    const { data } = await google
      .people({ version: 'v1', auth: authClient })
      .people.get({
        resourceName: 'people/me',
        personFields: 'emailAddresses,names,photos',
      });

    return { user: data };
  },
  geocode: async (address: string) => {
    const res = await maps.geocode({ address }).asPromise();

    if (res.status < 200 || res.status > 299) {
      throw new Error('Failed to geocode address');
    }

    return {
      ...parseAddress(res.json.results[0].address_components),
      ...res.json.results[0].geometry.location,
    };
  },
};
