import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  Listings as ListingsData,
  ListingsVariables,
} from '../../lib/graphql/queries/Listings/__generated__/Listings';
import { LISTINGS } from '../../lib/graphql/queries';
import { ListingsSort } from '../../lib/graphql/globalTypes';
import { ListingsSection, NoListings } from './children';
import { Layout, Typography } from 'antd';
import { useParams } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

const PAGE_LIMIT = 6;

export const Listings = () => {
  const { location } = useParams();
  const { data, loading, error } = useQuery<ListingsData, ListingsVariables>(
    LISTINGS,
    {
      variables: {
        location,
        sort: ListingsSort.PRICE_LOW_TO_HIGH,
        limit: PAGE_LIMIT,
        page: 1,
      },
    }
  );

  const listings = data ? data.listings : null;
  const listingsRegion = listings ? listings.region : null;

  const listingsSectionElement =
    listings && listings.result.length ? (
      <ListingsSection listings={listings} />
    ) : (
      <NoListings listingsRegion={listingsRegion} />
    );

  const listingsRegionElement = listingsRegion ? (
    <Title level={3} className="listings__title">
      Results for "{listingsRegion}"
    </Title>
  ) : null;

  return (
    <Content className="listings">
      {listingsRegionElement}
      {listingsSectionElement}
    </Content>
  );
};
