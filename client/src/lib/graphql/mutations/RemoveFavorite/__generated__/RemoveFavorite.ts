/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RemoveFavoriteInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: RemoveFavorite
// ====================================================

export interface RemoveFavorite_removeFavorite {
  __typename: "Listing";
  id: string;
}

export interface RemoveFavorite {
  removeFavorite: RemoveFavorite_removeFavorite;
}

export interface RemoveFavoriteVariables {
  input: RemoveFavoriteInput;
}
