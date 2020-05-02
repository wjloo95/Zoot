import merge from 'lodash.merge';
import { listingResolvers } from './Listing';
import { userResolvers } from './User';
import { viewerResolvers } from './Viewer';
import { bookingResolvers } from './Booking';
import { listingsResolvers } from './Listings';

export const resolvers = merge(
  listingsResolvers,
  listingResolvers,
  bookingResolvers,
  userResolvers,
  viewerResolvers
);
