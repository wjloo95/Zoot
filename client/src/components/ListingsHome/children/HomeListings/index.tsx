import React from 'react';
import { List, Typography } from 'antd';
import { ListingCard } from '../../../../lib/components';
import { Listings } from '../../../../lib/graphql/queries/Listings/__generated__/Listings';

interface IProps {
  listings: Listings['listings']['result'];
}

const { Title } = Typography;

export const HomeListings = ({ listings }: IProps) => {
  return (
    <div className="home-listings">
      <Title level={4} className="home-listings__title">
        Premium Listings
      </Title>
      <List
        grid={{
          gutter: 8,
          xs: 1,
          sm: 2,
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
