import { Database, User } from '../../../lib/types';
import { Google } from '../../../lib/api';
import { Response } from 'express';
import { cookieOptions } from '../../../lib/utils';

export const logInViaGoogle = async (
  code: string,
  token: string,
  db: Database,
  res: Response
): Promise<User | undefined> => {
  const { user } = await Google.logIn(code);
  if (!user) {
    throw new Error('Google login error');
  }

  const userNamesList = user.names && user.names.length ? user.names : null;
  const userPhotosList = user.photos && user.photos.length ? user.photos : null;
  const userEmailsList =
    user.emailAddresses && user.emailAddresses.length
      ? user.emailAddresses
      : null;

  const name = userNamesList ? userNamesList[0].displayName : null;

  let userId =
    userNamesList &&
    userNamesList[0].metadata &&
    userNamesList[0].metadata.source
      ? userNamesList[0].metadata.source.id
      : null;

  const avatar =
    userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;

  const userEmail =
    userEmailsList && userEmailsList[0].value ? userEmailsList[0].value : null;

  if (!userId || !name || !avatar || !userEmail) {
    throw new Error('Google login error');
  }

  const email = userEmail.toLowerCase();
  const currentUser = await db.users.findOne({ email });
  let viewer;

  if (currentUser) {
    const updatedRes = await db.users.findOneAndUpdate(
      { email },
      {
        $set: {
          avatar,
          token,
        },
      },
      { upsert: true, returnOriginal: false }
    );
    viewer = updatedRes.value;
  } else {
    const today = new Date();
    const sinceString =
      today.getFullYear() +
      '-' +
      ('0' + (today.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + today.getDate()).slice(-2);

    const returnedViewer = await db.users.insertOne({
      token,
      name,
      email,
      avatar,
      about: `Google Sign-In User at ${email}`,
      location: 'No Location Provided',
      since: sinceString,
      income: 0,
      bookings: [],
      listings: [],
      favoriteListings: [],
    });

    viewer = returnedViewer.ops[0];
  }

  res.cookie('viewer', viewer?._id, {
    ...cookieOptions,
    maxAge: 365 * 24 * 60 * 60 * 1000,
  });

  return viewer;
};
