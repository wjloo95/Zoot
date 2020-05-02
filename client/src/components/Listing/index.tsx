import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LISTING } from '../../lib/graphql/queries';
import {
  Listing as ListingData,
  ListingVariables,
} from '../../lib/graphql/queries/Listing/__generated__/Listing';
import { useParams } from 'react-router-dom';
import { Layout } from 'antd';
import { PageSkeleton, ErrorBanner } from '../../lib/components';

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

  return loading ? (
    <Content className="listings">
      <PageSkeleton />
    </Content>
  ) : (
    <h2>Listing</h2>
  );
};
