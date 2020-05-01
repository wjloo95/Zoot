import React from 'react';
import { List, Typography } from 'antd';
import { ListingCard } from '../../../../lib/components';
import { User } from '../../../../lib/graphql/queries/User/__generated__/User';

interface Props {
  userListings: User['user']['listings'];
  listingsPage: number;
  limit: number;
  setListingsPage: (page: number) => void;
}

const { Paragraph } = Typography;

export const UserListings = ({
  userListings,
  listingsPage,
  limit,
  setListingsPage,
}: Props) => {
  const { total, result } = userListings;
  console.log(userListings);

  const userListingsList = (
    <List
      grid={{
        gutter: 8,
        xs: 1,
        sm: 2,
        lg: 4,
      }}
      dataSource={result}
      locale={{ emptyText: 'This user has not listed a property!' }}
      pagination={{
        position: 'top',
        current: listingsPage,
        total,
        defaultPageSize: limit,
        hideOnSinglePage: true,
        showLessItems: true,
        onChange: (page: number) => setListingsPage(page),
      }}
      renderItem={(userListing) => (
        <List.Item>
          <ListingCard listing={userListing} />
        </List.Item>
      )}
    />
  );

  return (
    <div className="user-listings">
      <Paragraph className="user-listings__description">
        This section highlights the listings this user currently hosts and has
        made available for bookings.
      </Paragraph>
      {userListingsList}
    </div>
  );
};
