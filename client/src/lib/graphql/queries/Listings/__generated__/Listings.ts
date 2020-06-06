/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingsSort } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: Listings
// ====================================================

export interface Listings_listings_result {
  __typename: "Listing";
  id: string;
  name: string;
  thumbnailImage: string;
  image: string;
  street: string;
  latitude: number;
  longitude: number;
  reviews: number;
  rating: number | null;
  price: number;
  numOfGuests: number;
}

export interface Listings_listings {
  __typename: "Listings";
  region: string | null;
  total: number;
  result: Listings_listings_result[];
}

export interface Listings {
  listings: Listings_listings;
}

export interface ListingsVariables {
  location?: string | null;
  sort: ListingsSort;
  limit: number;
  page: number;
}
