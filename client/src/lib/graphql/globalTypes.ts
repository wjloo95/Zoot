/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ListingsSort {
  PRICE_HIGH_TO_LOW = "PRICE_HIGH_TO_LOW",
  PRICE_LOW_TO_HIGH = "PRICE_LOW_TO_HIGH",
  RATINGS_COUNT = "RATINGS_COUNT",
  RATINGS_VALUE = "RATINGS_VALUE",
}

export interface ConnectStripeInput {
  code: string;
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

export interface LogInInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
