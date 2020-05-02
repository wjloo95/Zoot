import React from 'react';
import { List, Typography, Layout, Spin } from 'antd';
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
import InfiniteScroll from 'react-infinite-scroller';
import { HomeOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';

const { Content } = Layout;
const { Paragraph } = Typography;

interface IProps {
  id: string;
  limit: number;
}

export const UserListings = ({ id, limit }: IProps) => {
  const { data, loading, error, fetchMore } = useQuery<
    UserListingsData,
    UserListingsVariables
  >(USER_LISTINGS, {
    variables: { id, listingsPage: 0, limit },
  });

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

  const total = userListings ? userListings.total : 0;
  const result = userListings ? userListings.result : [];

  const fetchMoreListings = () => {
    fetchMore({
      variables: { id, listingsPage: result.length / limit + 1, limit },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          ...fetchMoreResult,
          user: {
            ...fetchMoreResult.user,
            listings: {
              ...fetchMoreResult.user.listings,
              result: [
                ...prev.user.listings.result,
                ...fetchMoreResult.user.listings.result,
              ],
            },
          },
        };
      },
    });
  };

  const userListingsList = userListings ? (
    <List
      header={
        <>
          {total > 0 && (
            <Title level={2} underline>{`${total} Total Listings`}</Title>
          )}
          <Paragraph className="user-listings__description">
            This section highlights the listings this user currently hosts and
            has made available for bookings.
          </Paragraph>
        </>
      }
      grid={{
        column: 3,
        gutter: 8,
        xs: 1,
        sm: 2,
        lg: 4,
      }}
      dataSource={result ? result : undefined}
      locale={{ emptyText: 'This user has not listed a property!' }}
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
      <InfiniteScroll
        hasMore={!loading && total > result.length}
        loadMore={fetchMoreListings}
        loader={
          <div key={id} style={{ display: 'flex', justifyContent: 'center' }}>
            <Spin
              indicator={<HomeOutlined spin />}
              tip="Loading more listings..."
            />
          </div>
        }
      >
        {userListingsList}
      </InfiniteScroll>
    </div>
  );
};
