import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  Listings as ListingsData,
  ListingsVariables,
} from '../../lib/graphql/queries/Listings/__generated__/Listings';
import { LISTINGS } from '../../lib/graphql/queries';
import { ListingsSort } from '../../lib/graphql/globalTypes';
import { ListingsSection } from './children';
import { Layout } from 'antd';
import { useParams } from 'react-router-dom';

const { Content } = Layout;

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

  const listingsSectionElement = listings ? (
    <ListingsSection listings={listings} />
  ) : null;

  return <Content className="listings">{listingsSectionElement}</Content>;
};
