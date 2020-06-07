/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserFavorites
// ====================================================

export interface UserFavorites_user_favoriteListings_result {
  __typename: "Listing";
  id: string;
  name: string;
  thumbnailImage: string;
  image: string;
  street: string;
  reviews: number;
  rating: number | null;
  price: number;
  numOfGuests: number;
}

export interface UserFavorites_user_favoriteListings {
  __typename: "Favorites";
  total: number;
  result: UserFavorites_user_favoriteListings_result[];
}

export interface UserFavorites_user {
  __typename: "User";
  id: string;
  favoriteListings: UserFavorites_user_favoriteListings | null;
}

export interface UserFavorites {
  user: UserFavorites_user;
}

export interface UserFavoritesVariables {
  id: string;
  listingsPage: number;
  limit: number;
}
