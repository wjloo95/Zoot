import { Database, User } from '../../../lib/types';
import { Request, Response } from 'express';
import { cookieOptions } from '../../../lib/utils';
import { ObjectID } from 'mongodb';

export const logInViaCookie = async (
  token: string,
  db: Database,
  req: Request,
  res: Response
): Promise<User | undefined> => {
  const updateRes = await db.users.findOneAndUpdate(
    { _id: new ObjectID(req.signedCookies.viewer) },
    { $set: { token } },
    { returnOriginal: false }
  );

  let viewer = updateRes.value;

  if (!viewer) {
    res.clearCookie('viewer', cookieOptions);
  } else {
    return viewer;
  }
};
