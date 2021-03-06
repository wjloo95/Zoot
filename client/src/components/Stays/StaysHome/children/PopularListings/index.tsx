import React from 'react';
import { List, Typography } from 'antd';
import { ListingCard } from '../../../../../lib/components';
import { Listings } from '../../../../../lib/graphql/queries/Listings/__generated__/Listings';

interface IProps {
  listings: Listings['listings']['result'];
}

const { Title } = Typography;

export const PopularListings = ({ listings }: IProps) => {
  return (
    <div className="home-listings">
      <Title level={4} className="home-listings__title">
        Our Most Popular Listings
      </Title>
      <List
        grid={{
          column: 4,
          gutter: 15,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 4,
        }}
        dataSource={listings}
        renderItem={(listing) => (
          <List.Item>
            <ListingCard listing={listing} />
          </List.Item>
        )}
      />
    </div>
  );
};
