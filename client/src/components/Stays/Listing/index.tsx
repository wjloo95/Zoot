import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import { LISTING } from '../../../lib/graphql/queries';
import {
  Listing as ListingData,
  ListingVariables,
} from '../../../lib/graphql/queries/Listing/__generated__/Listing';
import { PageSkeleton, ErrorBanner } from '../../../lib/components';
import { ListingDetails, ListingCreateBooking } from './children';
import { Viewer } from '../../../lib/types';

interface IProps {
  viewer: Viewer;
}

interface IParams {
  id: string;
}

const PAGE_LIMIT = 3;
export const Listing = ({ viewer }: IProps) => {
  const { id } = useParams<IParams>();
  const { data, loading, error } = useQuery<ListingData, ListingVariables>(
    LISTING,
    { variables: { id, bookingsPage: 0, limit: PAGE_LIMIT } }
  );

  if (error) {
    return (
      <div className="listings">
        <ErrorBanner description="This listing may not exist or we might have encountered an error. Please try again soon." />
        <PageSkeleton />
      </div>
    );
  }

  const listing = data ? data.listing : null;
  const image = listing
    ? listing.largeImage
      ? listing.largeImage
      : listing.image
    : null;

  const listingDetailsElement = listing ? (
    <ListingDetails listing={listing} />
  ) : null;

  const listingCreateBookingElement = listing ? (
    <ListingCreateBooking
      price={listing.price}
      minimum={listing.minimum}
      viewer={viewer}
      host={listing.host}
      bookingsIndex={listing.bookingsIndex}
    />
  ) : null;

  return loading ? (
    <div className="listing">
      <PageSkeleton />
    </div>
  ) : (
    <div className="listing-container">
      <div style={{ position: 'relative' }}>
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="listing-details__image"
        />
      </div>
      <div className="listing">
        <div className="listing-sections">
          <div className="listing-section listing-section-details">
            {listingDetailsElement}
          </div>
          <div className="listing-section listing-section-booking">
            {listingCreateBookingElement}
          </div>
        </div>
      </div>
    </div>
  );
};
