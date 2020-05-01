import merge from 'lodash.merge';
import { listingResolvers } from './Listing';
import { userResolvers } from './User';
import { viewerResolvers } from './Viewer';
import { bookingResolvers } from './Booking';

export const resolvers = merge(
  listingResolvers,
  bookingResolvers,
  userResolvers,
  viewerResolvers
);
