import { Booking, PropertyType, RoomType } from '../../../lib/types';

export interface ListingArgs {
  id: string;
}

export interface ListingBookingsArgs {
  limit: number;
  page: number;
}

export interface ListingBookingsData {
  total: number;
  result: Booking[];
}

export interface HostListingInput {
  name: string;
  description: string;
  property: PropertyType;
  room: RoomType;
  notes: string;
  rules: string;
  image: string;
  street: string;
  price: number;
  bathrooms: number;
  bedrooms: number;
  minimum: number;
  numOfGuests: number;
}

export interface HostListingArgs {
  input: HostListingInput;
}

export interface AddFavoriteInput {
  id: string;
  userId: string;
}
export interface AddFavoriteArgs {
  input: AddFavoriteInput;
}
export interface RemoveFavoriteInput {
  id: string;
  userId: string;
}
export interface RemoveFavoriteArgs {
  input: AddFavoriteInput;
}
