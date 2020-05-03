import { Listing } from '../../../lib/types';

export enum ListingsSort {
  PRICE_LOW_TO_HIGH = 'PRICE_LOW_TO_HIGH',
  PRICE_HIGH_TO_LOW = 'PRICE_HIGH_TO_LOW',
}

export interface ListingsArgs {
  location: string | null;
  sort: ListingsSort;
  limit: number;
  page: number;
}

export interface ListingsData {
  total: number;
  result: Listing[];
}

export interface ListingsQuery {
  country?: string;
  admin?: string;
  city?: string;
}
