import { Request } from 'express';
import {
  Database,
  User,
  BookingsIndex,
  RoomType,
  PropertyType,
} from '../types';
import { HostListingInput } from '../../graphql/resolvers/Listing/types';
import { AddressComponent } from '@google/maps';
import { ObjectID } from 'mongodb';

export const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === 'development' ? false : true,
};

export const authorize = async (
  db: Database,
  req: Request
): Promise<User | null> => {
  const token = req.get('X-CSRF-TOKEN');
  const viewer = await db.users.findOne({
    _id: new ObjectID(req.signedCookies.viewer),
    token,
  });

  return viewer;
};

export const verifyHostListingInput = ({
  name,
  description,
  notes,
  rules,
  room,
  property,
  price,
}: HostListingInput) => {
  if (name.length > 100) {
    throw new Error('Listing title must be under 100 characters');
  }
  if (description.length > 5000) {
    throw new Error('Listing description must be under 5000 characters');
  }
  if (notes.length > 5000) {
    throw new Error('Listing notes must be under 5000 characters');
  }
  if (rules.length > 5000) {
    throw new Error('Listing rules must be under 5000 characters');
  }
  if (
    room !== RoomType.EntireHome &&
    room !== RoomType.PrivateRoom &&
    room !== RoomType.SharedRoom
  ) {
    throw new Error('Your listing must have a room type');
  }
  if (
    property !== PropertyType.Apartment &&
    property !== PropertyType.House &&
    property !== PropertyType.Other
  ) {
    throw new Error(
      'If your listing is neither an apartment or house, please select Other!'
    );
  }
  if (price < 0) {
    throw new Error('Price must be greater than 0');
  }
};

export const parseAddress = (addressComponents: AddressComponent[]) => {
  let country = null;
  let state = null;
  let stateShort = null;
  let city = null;

  for (const component of addressComponents) {
    if (component.types.includes('country')) {
      country = component.long_name;
    }

    if (component.types.includes('administrative_area_level_1')) {
      state = component.long_name;
      stateShort = component.short_name;
    }

    if (
      component.types.includes('locality') ||
      component.types.includes('postal_town') ||
      component.types.includes('neighborhood')
    ) {
      city = component.long_name;
    }
  }

  if (country === 'United States') {
    state = stateShort;
  }

  return { country, state, city };
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
