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

export enum PropertyType {
  APARTMENT = "APARTMENT",
  HOUSE = "HOUSE",
  OTHER = "OTHER",
}

export enum RoomType {
  ENTIRE_HOME = "ENTIRE_HOME",
  PRIVATE_ROOM = "PRIVATE_ROOM",
  SHARED_ROOM = "SHARED_ROOM",
}

export interface AddFavoriteInput {
  id: string;
  userId: string;
}

export interface ConnectStripeInput {
  code: string;
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

export interface LogInInput {
  code: string;
}

export interface RemoveFavoriteInput {
  id: string;
  userId: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
