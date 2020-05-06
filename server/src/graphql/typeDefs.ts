import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  enum ListingsSort {
    PRICE_LOW_TO_HIGH
    PRICE_HIGH_TO_LOW
    RATINGS_COUNT
    RATINGS_VALUE
  }

  enum CancellationType {
    STRICT
    FLEXIBLE
    MODERATE
  }

  enum RoomType {
    ENTIRE_HOME
    PRIVATE_ROOM
    SHARED_ROOM
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
    name: String!
    description: String!
    notes: String!
    rules: String!
    roomType: RoomType!
    propertyType: String!
    cancellation: CancellationType!
    thumbnail: String!
    image: String!
    host: User!
    street: String!
    city: String!
    state: String!
    country: String!
    latitude: Float!
    longitude: Float!
    price: Int!
    numOfGuests: Int!
    includedGuests: Int!
    bathrooms: Int!
    bedrooms: Int!
    minNights: Int!
    maxNights: Int!
    numReviews: Int!
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
    since: String!
    location: String!
    about: String!
    avatar: String!
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
