import { Request } from 'express';
import { Database, User, ListingType, BookingsIndex } from '../types';
import { HostListingInput } from '../../graphql/resolvers/Listing/types';
import { AddressComponent } from '@google/maps';

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

export const parseAddress = (addressComponents: AddressComponent[]) => {
  let country = null;
  let admin = null;
  let city = null;

  for (const component of addressComponents) {
    if (component.types.includes('country')) {
      country = component.long_name;
    }

    if (component.types.includes('administrative_area_level_1')) {
      admin = component.long_name;
    }

    if (
      component.types.includes('locality') ||
      component.types.includes('postal_town') ||
      component.types.includes('neighborhood')
    ) {
      city = component.long_name;
    }
  }

  return { country, admin, city };
};

export const resolveBookingsIndex = (
  bookingsIndex: BookingsIndex,
  checkInDate: string,
  checkOutDate: string
) => {
  let dateCursor = new Date(checkInDate);
  let checkOut = new Date(checkOutDate);
  const newBookingsIndex: BookingsIndex = { ...bookingsIndex };

  while (dateCursor <= checkOut) {
    const y = dateCursor.getUTCFullYear();
    const m = dateCursor.getUTCMonth();
    const d = dateCursor.getUTCDate();

    if (!newBookingsIndex[y]) {
      newBookingsIndex[y] = {};
    }

    if (!newBookingsIndex[y][m]) {
      newBookingsIndex[y][m] = {};
    }

    if (!newBookingsIndex[y][m][d]) {
      newBookingsIndex[y][m][d] = true;
    } else {
      throw new Error(
        'Selected dates cannot overlap dates that have already been booked'
      );
    }

    dateCursor = new Date(dateCursor.getTime() + 86400000);
  }

  return newBookingsIndex;
};
