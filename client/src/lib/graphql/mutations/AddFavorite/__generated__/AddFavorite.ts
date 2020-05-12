/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddFavoriteInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: AddFavorite
// ====================================================

export interface AddFavorite_addFavorite {
  __typename: "Listing";
  id: string;
}

export interface AddFavorite {
  addFavorite: AddFavorite_addFavorite;
}

export interface AddFavoriteVariables {
  input: AddFavoriteInput;
}
