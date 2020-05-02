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
import { ListingDetails } from './children';

const { Content } = Layout;

const PAGE_LIMIT = 3;
export const Listing = () => {
  const { id } = useParams();
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
  const listingBookings = listing ? listing.bookings : null;

  const listingDetailsElement = listing ? (
    <div className="listing-container">
      <div
        style={{ backgroundImage: `url(${listing.image})` }}
        className="listing-details__image"
      />
      <Content className="listing">
        <Row gutter={24} justify="space-between">
          <Col xs={24} lg={14}>
            <ListingDetails listing={listing} />
          </Col>
        </Row>
      </Content>
    </div>
  ) : null;
  return loading ? (
    <Content className="listings">
      <PageSkeleton />
    </Content>
  ) : (
    <>{listingDetailsElement}</>
  );
};
