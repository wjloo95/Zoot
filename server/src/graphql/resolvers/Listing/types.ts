import { Booking } from '../../../lib/types';

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
  property: string;
  room: string;
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
