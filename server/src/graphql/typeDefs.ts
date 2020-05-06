import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  enum ListingsSort {
    PRICE_LOW_TO_HIGH
    PRICE_HIGH_TO_LOW
    RATINGS_COUNT
    RATINGS_VALUE
  }

  input LogInInput {
    code: String!
  }

  input ConnectStripeInput {
    code: String!
  }

  input HostListingInput {
    title: String!
    description: String!
    image: String!
    type: String!
    address: String!
    price: Int!
    numOfGuests: Int!
  }

  input CreateBookingInput {
    id: ID!
    source: String!
    checkIn: String!
    checkOut: String!
  }

  type Booking {
    id: ID!
    listing: Listing!
    tenant: User!
    checkIn: String!
    checkOut: String!
  }

  type Bookings {
    total: Int!
    result: [Booking!]!
  }

  type Listing {
    id: ID!
    host: User!
    name: String!
    description: String!
    property: String!
    room: String!
    notes: String!
    rules: String!
    thumbnail: String!
    image: String!
    street: String!
    city: String!
    state: String!
    country: String!
    latitude: Float!
    longitude: Float!
    price: Int!
    bathrooms: Int!
    bedrooms: Int!
    minimum: Int!
    numOfGuests: Int!
    reviews: Int!
    rating: Int!
    bookings(limit: Int!, page: Int!): Bookings
    bookingsIndex: String!
  }

  type Listings {
    region: String
    total: Int!
    result: [Listing!]!
  }

  type User {
    id: ID!
    name: String!
    avatar: String!
    about: String!
    location: String!
    since: String!
    hasWallet: Boolean!
    income: Int
    bookings(limit: Int!, page: Int!): Bookings
    listings(limit: Int!, page: Int!): Listings!
  }

  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }

  type Query {
    authUrl: String!
    user(id: ID!): User!
    listing(id: ID!): Listing!
    listings(
      location: String
      sort: ListingsSort!
      limit: Int!
      page: Int!
    ): Listings!
  }

  type Mutation {
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
    connectStripe(input: ConnectStripeInput!): Viewer!
    disconnectStripe: Viewer!
    hostListing(input: HostListingInput!): Listing!
    createBooking(input: CreateBookingInput!): Booking!
  }
`;
