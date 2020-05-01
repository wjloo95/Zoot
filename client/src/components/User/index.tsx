import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Col, Layout, Row, Tabs, Typography } from 'antd';

import { USER } from '../../lib/graphql/queries';
import {
  User as UserData,
  UserVariables,
} from '../../lib/graphql/queries/User/__generated__/User';
import { useParams } from 'react-router-dom';
import { UserProfile, UserBookings, UserListings } from './children';
import { Viewer } from '../../lib/types';
import { ErrorBanner, PageSkeleton } from '../../lib/components';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Paragraph } = Typography;

interface IProps {
  viewer: Viewer;
}

const PAGE_LIMIT = 4;

export const User = ({ viewer }: IProps) => {
  const { id } = useParams();

  const [listingsPage, setListingsPage] = useState(1);
  const [bookingsPage, setBookingsPage] = useState(1);

  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id,
      bookingsPage,
      listingsPage,
      limit: PAGE_LIMIT,
    },
  });

  if (error) {
    return (
      <Content className="user">
        <ErrorBanner description="This user may not exist or we've encountered an error. Please try again soon." />
        <PageSkeleton />
      </Content>
    );
  }

  const user = data ? data.user : null;
  const isViewer = viewer.id === id;
  const userProfileElement = user ? (
    <UserProfile user={user} isViewer={isViewer} />
  ) : null;

  const userListings = user ? user.listings : null;
  const userBookings = user ? user.bookings : null;

  const userListingsElement = userListings ? (
    <UserListings
      userListings={userListings}
      listingsPage={listingsPage}
      limit={PAGE_LIMIT}
      setListingsPage={setListingsPage}
    />
  ) : (
    <div className="user-listings">
      <Paragraph className="user-listings__description">
        This section highlights the listings this user currently hosts and has
        made available for bookings.
      </Paragraph>
    </div>
  );

  const userBookingsElement = userBookings ? (
    <UserBookings
      userBookings={userBookings}
      bookingsPage={bookingsPage}
      limit={PAGE_LIMIT}
      setBookingsPage={setBookingsPage}
    />
  ) : (
    <UserBookings
      userBookings={null}
      bookingsPage={bookingsPage}
      limit={PAGE_LIMIT}
      setBookingsPage={setBookingsPage}
    />
  );

  return loading ? (
    <Content className="user">
      <PageSkeleton />
    </Content>
  ) : (
    <Content className="user">
      <Row gutter={12} justify="start">
        <Col xs={24}>{userProfileElement}</Col>
        <Col xs={24}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Listings" key="1">
              {userListingsElement}
            </TabPane>
            <TabPane tab="Bookings" key="2">
              {userBookingsElement}
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Content>
  );
};
