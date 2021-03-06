import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import { ListingCard, ErrorBanner } from '../../../lib/components';
import {
  Listings as ListingsData,
  ListingsVariables,
  Listings_listings_result,
} from '../../../lib/graphql/queries/Listings/__generated__/Listings';
import { ListingsSort } from '../../../lib/graphql/globalTypes';
import { LISTINGS } from '../../../lib/graphql/queries';

import { List } from 'antd';
import {
  ListingsSkeleton,
  ListingsPagination,
  ListingsSortSection,
  NoListings,
  ListingsMap,
} from './children';
const { Item } = List;

interface IParams {
  location: string;
}

const PAGE_LIMIT = 6;

export const Listings = () => {
  const [sort, setSort] = useState(ListingsSort.RATINGS_COUNT);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(PAGE_LIMIT);
  const [
    selectedListing,
    setSelectedListing,
  ] = useState<Listings_listings_result | null>(null);

  const { location } = useParams<IParams>();
  const locationRef = useRef(location);

  const { data, loading, error } = useQuery<ListingsData, ListingsVariables>(
    LISTINGS,
    {
      skip:
        locationRef.current !== location &&
        page !== 1 &&
        pageLimit !== PAGE_LIMIT,
      variables: {
        location,
        sort,
        limit: pageLimit,
        page,
      },
    }
  );

  useEffect(() => {
    setPage(1);
    setPageLimit(PAGE_LIMIT);
    locationRef.current = location;
  }, [location]);

  if (error) {
    return (
      <div className="listings-section">
        <ErrorBanner
          description={`
          We either couldn't find anything matching your search or have encountered an error.
          If you're searching for a unique location, try searching by country.
          `}
        />
        <ListingsSkeleton />
      </div>
    );
  }

  const listings = data ? data.listings : null;
  const listingsRegion = listings ? listings.region : null;
  const resultListings = listings ? listings.result : null;

  const listingsSectionElement =
    listings && listings.result.length ? (
      <div>
        <ListingsPagination
          total={listings.total}
          page={page}
          limit={pageLimit}
          setPage={setPage}
          setPageLimit={setPageLimit}
        />
        <ListingsSortSection sort={sort} setSort={setSort} />
        <List
          className="listings-list"
          grid={{
            column: 3,
            gutter: 8,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
          }}
          dataSource={listings.result}
          renderItem={(listing) => (
            <Item
              onMouseEnter={() => {
                setSelectedListing(listing);
              }}
              onMouseLeave={() => {
                setSelectedListing(null);
              }}
            >
              <ListingCard listing={listing} />
            </Item>
          )}
        />
      </div>
    ) : (
      <NoListings listingsRegion={listingsRegion} />
    );

  const listingsRegionElement =
    listings && listingsRegion ? (
      <div className="listings__title">
        {listings.total} Results for "{listingsRegion}"
      </div>
    ) : null;

  return loading ? (
    <div className="listings-section">
      <ListingsSkeleton />
    </div>
  ) : (
    <div className="listings">
      <div className="listings-section">
        {listingsRegionElement}
        {listingsSectionElement}
      </div>
      <ListingsMap
        listings={resultListings}
        selectedListing={selectedListing}
        setSelectedListing={setSelectedListing}
      />
    </div>
  );
};
