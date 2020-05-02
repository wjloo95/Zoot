import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { List, Typography, Layout, Spin } from 'antd';
import {
  ListingCard,
  ErrorBanner,
  PageSkeleton,
} from '../../../../lib/components';
import InfiniteScroll from 'react-infinite-scroller';
import {
  UserBookings as UserBookingsData,
  UserBookingsVariables,
} from '../../../../lib/graphql/queries/User/__generated__/UserBookings';
import { USER_BOOKINGS } from '../../../../lib/graphql/queries';
import { HomeOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';

const { Content } = Layout;
const { Paragraph, Text } = Typography;

interface IProps {
  id: string;
  limit: number;
}

export const UserBookings = ({ id, limit }: IProps) => {
  const { data, loading, error, fetchMore } = useQuery<
    UserBookingsData,
    UserBookingsVariables
  >(USER_BOOKINGS, { variables: { id, bookingsPage: 0, limit } });

  if (error) {
    return (
      <Content className="user">
        <ErrorBanner description="We've encountered an error retrieving this user's bookings. Please try again soon." />
        <PageSkeleton />
      </Content>
    );
  }

  const user = data ? data.user : null;
  const userBookings = user ? user.bookings : null;

  const total = userBookings ? userBookings.total : 0;
  const result = userBookings ? userBookings.result : [];

  const fetchMoreBookings = () => {
    fetchMore({
      variables: { id, bookingsPage: result.length / limit + 1, limit },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          ...fetchMoreResult,
          user: {
            ...fetchMoreResult.user,
            listings: {
              ...fetchMoreResult.user.bookings,
              result:
                prev.user.bookings && fetchMoreResult.user.bookings
                  ? [
                      ...prev.user.bookings.result,
                      ...fetchMoreResult.user.bookings.result,
                    ]
                  : [],
            },
          },
        };
      },
    });
  };

  const userBookingsList = (
    <List
      header={
        <>
          {total > 0 && (
            <Title level={2} underline>{`${total} Total Bookings`}</Title>
          )}
          <Paragraph className="user-bookings__description">
            This section highlights the bookings you've made, and the
            check-in/check-out dates associated with said bookings.
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
      locale={{ emptyText: 'This user has not made any bookings!' }}
      renderItem={(userBooking) => {
        const bookingHistory = (
          <div className="user-bookings__booking-history">
            <div>
              Check in: <Text strong>{userBooking.checkIn}</Text>
            </div>
            <div>
              Check out: <Text strong>{userBooking.checkOut}</Text>
            </div>
          </div>
        );

        return (
          <List.Item>
            {bookingHistory}
            <ListingCard listing={userBooking.listing} />
          </List.Item>
        );
      }}
    />
  );

  return loading ? (
    <Content className="user">
      <PageSkeleton />
    </Content>
  ) : (
    <div className="user-bookings">
      <InfiniteScroll
        hasMore={!loading && total > result.length}
        loadMore={fetchMoreBookings}
        loader={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spin
              indicator={<HomeOutlined spin />}
              tip="Loading more bookings..."
            />
          </div>
        }
      >
        {userBookingsList}
      </InfiniteScroll>
    </div>
  );
};
