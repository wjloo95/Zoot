import React, { useState } from 'react';
import { List, Affix } from 'antd';
import { ListingCard } from '../../../../lib/components';
import {
  Listings as ListingsData,
  ListingsVariables,
} from '../../../../lib/graphql/queries/Listings/__generated__/Listings';
import { ListingsSort } from '../../../../lib/graphql/globalTypes';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { LISTINGS } from '../../../../lib/graphql/queries';
import { NoListings } from '../NoListings';
import Title from 'antd/lib/typography/Title';
import { ListingsSortSection } from '../ListingsSortSection';
import { ListingsPagination } from '../ListingsPagination';

const { Item } = List;

const PAGE_LIMIT = 4;

export const ListingsSection = () => {
  const [sort, setSort] = useState(ListingsSort.PRICE_LOW_TO_HIGH);
  const [page, setPage] = useState(1);
  const { location } = useParams();
  const { data, loading, error } = useQuery<ListingsData, ListingsVariables>(
    LISTINGS,
    {
      variables: {
        location,
        sort,
        limit: PAGE_LIMIT,
        page,
      },
    }
  );

  const listings = data ? data.listings : null;
  const listingsRegion = listings ? listings.region : null;

  const listingsSectionElement =
    listings && listings.result.length ? (
      <div className="listings-section">
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
            gutter: 8,
            xs: 1,
            sm: 2,
            lg: 4,
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

  const listingsRegionElement = listingsRegion ? (
    <Title level={3} className="listings__title">
      Results for "{listingsRegion}"
    </Title>
  ) : null;

  return (
    <div>
      {listingsRegionElement}
      {listingsSectionElement}
    </div>
  );
};
