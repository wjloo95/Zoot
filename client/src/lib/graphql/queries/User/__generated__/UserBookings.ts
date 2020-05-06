/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserBookings
// ====================================================

export interface UserBookings_user_bookings_result_listing {
  __typename: "Listing";
  id: string;
  name: string;
  thumbnail: string;
  street: string;
  reviews: number;
  rating: number;
  price: number;
  numOfGuests: number;
}

export interface UserBookings_user_bookings_result {
  __typename: "Booking";
  id: string;
  listing: UserBookings_user_bookings_result_listing;
  checkIn: string;
  checkOut: string;
}

export interface UserBookings_user_bookings {
  __typename: "Bookings";
  total: number;
  result: UserBookings_user_bookings_result[];
}

export interface UserBookings_user {
  __typename: "User";
  id: string;
  bookings: UserBookings_user_bookings | null;
}

export interface UserBookings {
  user: UserBookings_user;
}

export interface UserBookingsVariables {
  id: string;
  bookingsPage: number;
  limit: number;
}
