import React, { useState } from 'react';
import { List, Typography, Layout } from 'antd';
import {
  ListingCard,
  ErrorBanner,
  PageSkeleton,
} from '../../../../lib/components';
import { useQuery } from '@apollo/react-hooks';
import { USER_LISTINGS } from '../../../../lib/graphql/queries';
import {
  UserListings as UserListingsData,
  UserListingsVariables,
} from '../../../../lib/graphql/queries/User/__generated__/UserListings';

const { Content } = Layout;
const { Paragraph } = Typography;

interface IProps {
  id: string;
  limit: number;
}

export const UserListings = ({ id, limit }: IProps) => {
  const [listingsPage, setListingsPage] = useState(1);
  const { data, loading, error } = useQuery<
    UserListingsData,
    UserListingsVariables
  >(USER_LISTINGS, { variables: { id, listingsPage, limit } });

  if (error) {
    return (
      <Content className="user">
        <ErrorBanner description="We've encountered an error retrieving this user's listings. Please try again soon." />
        <PageSkeleton />
      </Content>
    );
  }

  const user = data ? data.user : null;
  const userListings = user ? user.listings : null;

  const total = userListings ? userListings.total : null;
  const result = userListings ? userListings.result : null;

  const userListingsList = userListings ? (
    <List
      grid={{
        gutter: 8,
        xs: 1,
        sm: 2,
        lg: 4,
      }}
      dataSource={result ? result : undefined}
      locale={{ emptyText: 'This user has not listed a property!' }}
      pagination={{
        position: 'top',
        current: listingsPage,
        total: total ? total : undefined,
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
  ) : null;

  return loading ? (
    <Content className="user">
      <PageSkeleton />
    </Content>
  ) : (
    <div className="user-listings">
      <Paragraph className="user-listings__description">
        This section highlights the listings this user currently hosts and has
        made available for bookings.
      </Paragraph>
      {userListingsList}
    </div>
  );
};
