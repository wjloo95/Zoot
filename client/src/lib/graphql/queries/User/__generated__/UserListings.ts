/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserListings
// ====================================================

export interface UserListings_user_listings_result {
  __typename: "Listing";
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
}

export interface UserListings_user_listings {
  __typename: "Listings";
  total: number;
  result: UserListings_user_listings_result[];
}

export interface UserListings_user {
  __typename: "User";
  id: string;
  listings: UserListings_user_listings;
}

export interface UserListings {
  user: UserListings_user;
}

export interface UserListingsVariables {
  id: string;
  listingsPage: number;
  limit: number;
}
