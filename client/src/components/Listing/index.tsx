import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LISTING } from '../../lib/graphql/queries';
import {
  Listing as ListingData,
  ListingVariables,
} from '../../lib/graphql/queries/Listing/__generated__/Listing';
import { useParams } from 'react-router-dom';
import { Layout, Col, Row } from 'antd';
import { PageSkeleton, ErrorBanner } from '../../lib/components';
import {
  ListingDetails,
  ListingBookings,
  ListingCreateBooking,
} from './children';
import { listingBookings } from './children/ListingBookings/mockBookings';
import { Viewer } from '../../lib/types';

const { Content } = Layout;

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
      <Content className="listings">
        <ErrorBanner description="This listing may not exist or we might have encountered an error. Please try again soon." />
        <PageSkeleton />
      </Content>
    );
  }

  const listing = data ? data.listing : null;
  const image = listing ? listing.image : null;
  // const listingBookings = listing ? listing.bookings : null;

  const listingDetailsElement = listing ? (
    <ListingDetails listing={listing} />
  ) : null;

  const listingBookingsElement = listingBookings ? (
    <ListingBookings listingBookings={listingBookings} limit={PAGE_LIMIT} />
  ) : null;

  const ListingCreateBookingElement = listing ? (
    <ListingCreateBooking
      price={listing.price}
      viewer={viewer}
      host={listing.host}
      bookingsIndex={listing.bookingsIndex}
    />
  ) : null;

  return loading ? (
    <Content className="listing">
      <PageSkeleton />
    </Content>
  ) : (
    <div className="listing-container">
      <div style={{ position: 'relative' }}>
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="listing-details__image"
        />
      </div>
      <Content className="listing">
        <Row gutter={24} justify="space-between">
          <Col xs={24} lg={14}>
            {listingDetailsElement}
            {listingBookingsElement}
          </Col>
          <Col xs={24} lg={10}>
            {ListingCreateBookingElement}
          </Col>
        </Row>
      </Content>
    </div>
  );
};
