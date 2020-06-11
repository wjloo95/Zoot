import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import {
  HomeListingsSkeleton,
  PopularListings,
  HomeSuggestions,
} from './children';

import './style.css';

import {
  ListingsVariables,
  Listings as ListingsData,
} from '../../../lib/graphql/queries/Listings/__generated__/Listings';
import { LISTINGS } from '../../../lib/graphql/queries';
import { ListingsSort } from '../../../lib/graphql/globalTypes';
import { HomeHero } from '../../HomeHero';

const PAGE_LIMIT = 8;
const PAGE_NUMBER = 1;

export const StaysHome = () => {
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

  const popularListingsSection = loading ? (
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
          <h2 className="listings-home-US-title">Plan Your Next Escape!</h2>
          <p>
            Zoot has over 500,000 listings across the globe for trips of all
            kinds
          </p>
          <Link
            to="/listings/United%20States"
            className="listings-home-US-button"
          >
            Highly Rated Listings in the United States
          </Link>
        </div>
        {popularListingsSection}
      </div>
    </>
  );
};
