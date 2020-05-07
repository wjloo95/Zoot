import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import { ListingCard, ErrorBanner } from '../../../../lib/components';
import {
  Listings as ListingsData,
  ListingsVariables,
} from '../../../../lib/graphql/queries/Listings/__generated__/Listings';
import { ListingsSort } from '../../../../lib/graphql/globalTypes';
import { LISTINGS } from '../../../../lib/graphql/queries';
import { NoListings } from '../NoListings';
import { ListingsSortSection } from '../ListingsSortSection';
import { ListingsPagination } from '../ListingsPagination';
import { ListingsSkeleton } from '../ListingsSkeleton';

import { List, Affix, Typography } from 'antd';
const { Item } = List;
const { Title } = Typography;

interface IParams {
  location: string;
}

const PAGE_LIMIT = 6;

export const ListingsSection = () => {
  const [sort, setSort] = useState(ListingsSort.RATINGS_VALUE);
  const [page, setPage] = useState(1);

  const { location } = useParams<IParams>();
  const locationRef = useRef(location);

  const { data, loading, error } = useQuery<ListingsData, ListingsVariables>(
    LISTINGS,
    {
      skip: locationRef.current !== location && page !== 1,
      variables: {
        location,
        sort,
        limit: PAGE_LIMIT,
        page,
      },
    }
  );

  useEffect(() => {
    setPage(1);
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

  const listingsSectionElement =
    listings && listings.result.length ? (
      <div>
        <Affix offsetTop={64}>
          <ListingsPagination
            total={listings.total}
            page={page}
            limit={PAGE_LIMIT}
            setPage={setPage}
          />
          <ListingsSortSection sort={sort} setSort={setSort} />
        </Affix>
        <List
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
            <Item>
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
      <Title level={3} className="listings__title">
        {listings.total} Results for "{listingsRegion}"
      </Title>
    ) : null;

  return loading ? (
    <div className="listings-section">
      <ListingsSkeleton />
    </div>
  ) : (
    <div className="listings-section">
      {listingsRegionElement}
      {listingsSectionElement}
    </div>
  );
};
