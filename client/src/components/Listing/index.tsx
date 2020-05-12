import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import { LISTING } from '../../lib/graphql/queries';
import {
  Listing as ListingData,
  ListingVariables,
} from '../../lib/graphql/queries/Listing/__generated__/Listing';
import { PageSkeleton, ErrorBanner } from '../../lib/components';
import { ListingDetails, ListingCreateBooking } from './children';
import { Viewer } from '../../lib/types';

import { Layout, Col, Row } from 'antd';
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
  const image = listing ? listing.largeImage : null;

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
          </Col>
          <Col xs={24} lg={10}>
            {listingCreateBookingElement}
          </Col>
        </Row>
      </Content>
    </div>
  );
};
