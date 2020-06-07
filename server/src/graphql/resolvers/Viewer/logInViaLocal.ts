import bcrypt from 'bcrypt';

import { Database, User } from '../../../lib/types';
import { Response } from 'express';
import { cookieOptions } from '../../../lib/utils';

export const logInViaLocal = async (
  email: string,
  password: string,
  db: Database,
  res: Response
): Promise<User | null | undefined> => {
  email = email.toLowerCase();
  const currentUser = await db.users.findOne({ email });

  if (!currentUser) {
    return undefined;
  }

  const isCorrectPassword = currentUser.password
    ? await bcrypt.compare(password, currentUser.password)
    : false;

  if (!isCorrectPassword) {
    return null;
  }
  const viewer = currentUser;

  res.cookie('viewer', viewer._id, {
    ...cookieOptions,
    maxAge: 365 * 24 * 60 * 60 * 1000,
  });

  return viewer;
};
