import { Booking, ListingType } from '../../../lib/types';

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
  title: string;
  description: string;
  image: string;
  type: ListingType;
  address: string;
  price: number;
  numOfGuests: number;
}

export interface HostListingArgs {
  input: HostListingInput;
}
