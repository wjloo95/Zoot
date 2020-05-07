import { Database, User } from '../../../lib/types';
import { Google } from '../../../lib/api';
import { Response } from 'express';
import { cookieOptions } from '../../../lib/utils';
import { ObjectID } from 'mongodb';

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

  const userName = userNamesList ? userNamesList[0].displayName : null;

  let userId =
    userNamesList &&
    userNamesList[0].metadata &&
    userNamesList[0].metadata.source
      ? userNamesList[0].metadata.source.id
      : null;

  const userAvatar =
    userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;

  const userEmail =
    userEmailsList && userEmailsList[0].value ? userEmailsList[0].value : null;

  if (!userId || !userName || !userAvatar || !userEmail) {
    throw new Error('Google login error');
  }

  userId = userId + 'ABC';

  const today = new Date();
  const sinceString =
    today.getFullYear() +
    '-' +
    ('0' + (today.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + today.getDate()).slice(-2);

  const updateRes = await db.users.findOneAndUpdate(
    { _id: new ObjectID(userId) },
    {
      $set: {
        name: userName,
        avatar: userAvatar,
        about: `Google Sign-In User at ${userEmail}`,
        since: sinceString,
        location: 'No Location Provided',
        bookings: [],
        listings: [],
        token,
      },
    },
    { upsert: true, returnOriginal: false }
  );

  const viewer = updateRes.value;

  res.cookie('viewer', userId, {
    ...cookieOptions,
    maxAge: 365 * 24 * 60 * 60 * 1000,
  });

  return viewer;
};
