import React from 'react';
import { List } from 'antd';
import { ListingCard } from '../../../../lib/components';
import { Listings } from '../../../../lib/graphql/queries/Listings/__generated__/Listings';

const { Item } = List;

interface IProps {
  listings: Listings['listings'];
}

export const ListingsSection = ({ listings }: IProps) => {
  return (
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
  );
};
