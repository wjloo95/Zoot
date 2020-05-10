import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import {
  HomeHero,
  HomeListingsSkeleton,
  PopularListings,
  HomeSuggestions,
} from './children';

import './style.css';

import {
  ListingsVariables,
  Listings as ListingsData,
} from '../../lib/graphql/queries/Listings/__generated__/Listings';
import { LISTINGS } from '../../lib/graphql/queries';
import { ListingsSort } from '../../lib/graphql/globalTypes';

const PAGE_LIMIT = 6;
const PAGE_NUMBER = 1;

export const ListingsHome = () => {
  const { data, loading } = useQuery<ListingsData, ListingsVariables>(
    LISTINGS,
    {
      variables: {
        sort: ListingsSort.RATINGS_COUNT,
        limit: PAGE_LIMIT,
        page: PAGE_NUMBER,
      },
      fetchPolicy: 'cache-and-network',
    }
  );

  const topListingsSection = loading ? (
    <HomeListingsSkeleton />
  ) : data ? (
    <PopularListings listings={data.listings.result} />
  ) : null;

  return (
    <>
      <HomeHero />
      <div className="listings-home-bottom">
        <HomeSuggestions />
        <div className="listings-home-US">
          <h2 className="listings-home-US-title">
            Your guide for all things rental
          </h2>
          <p>
            Zoot has over 500,000 listings across the globe for your next
            getaway
          </p>
          <Link
            to="/listings/United%20States"
            className="listings-home-US-button"
          >
            Highly Rated Listings in the United States
          </Link>
        </div>
        {topListingsSection}
      </div>
    </>
  );
};
