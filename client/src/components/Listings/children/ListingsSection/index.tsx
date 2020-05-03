import React, { useState } from 'react';
import { List } from 'antd';
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

const { Item } = List;

const PAGE_LIMIT = 6;

export const ListingsSection = () => {
  const [filter, setFilter] = useState(ListingsSort.PRICE_LOW_TO_HIGH);
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
