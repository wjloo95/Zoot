import { Request } from 'express';
import { Database, User, ListingType } from '../types';
import { HostListingInput } from '../../graphql/resolvers/Listing/types';

export const authorize = async (
  db: Database,
  req: Request
): Promise<User | null> => {
  const token = req.get('X-CSRF-TOKEN');
  const viewer = await db.users.findOne({
    _id: req.signedCookies.viewer,
    token,
  });

  return viewer;
};

export const verifyHostListingInput = ({
  title,
  description,
  type,
  price,
}: HostListingInput) => {
  if (title.length > 100) {
    throw new Error('Listing title must be under 100 characters');
  }
  if (description.length > 5000) {
    throw new Error('Listing description must be under 5000 characters');
  }
  if (
    type !== ListingType.Apartment &&
    type !== ListingType.House &&
    type !== ListingType.Hotel
  ) {
    throw new Error('Listing type must be either an apartment or house');
  }
  if (price < 0) {
    throw new Error('Price must be greater than 0');
  }
};
