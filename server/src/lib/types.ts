import { ObjectID, Collection } from 'mongodb';

export enum RoomType {
  EntireHome = 'ENTIRE_HOME',
  PrivateRoom = 'PRIVATE_ROOM',
  SharedRoom = 'SHARED_ROOM',
}

interface BookingsIndexMonth {
  [key: string]: boolean;
}

interface BookingsIndexYear {
  [key: string]: BookingsIndexMonth;
}

export interface BookingsIndex {
  [key: string]: BookingsIndexYear;
}
export interface Listing {
  _id: ObjectID;
  host: string;
  name: string;
  description: string;
  property: string;
  room: string;
  notes: string;
  rules: string;
  thumbnail?: string;
  image: string;
  street: string;
  city: string;
  state: string;
  country: string;
  latitude?: number;
  longitude?: number;
  price: number;
  bathrooms: number;
  bedrooms: number;
  minimum: number;
  numOfGuests: number;
  reviews: number;
  rating?: number;
  bookings: ObjectID[];
  bookingsIndex: BookingsIndex;
  authorized?: boolean;
}

export interface User {
  _id: string;
  token: string;
  name: string;
  avatar: string;
  about: string;
  location: string;
  since: string;
  walletId?: string;
  income: number;
  bookings: ObjectID[];
  listings: ObjectID[];
  authorized?: boolean;
}

export interface Booking {
  _id: ObjectID;
  listing: ObjectID;
  tenant: string;
  checkIn: string;
  checkOut: string;
}

export interface Database {
  listings: Collection<Listing>;
  users: Collection<User>;
  // premium_listings: Collection<Listing>;
  // premium_users: Collection<User>;
  bookings: Collection<Booking>;
}

export interface Viewer {
  _id?: string;
  token?: string;
  avatar?: string;
  walletId?: string;
  didRequest: boolean;
}
