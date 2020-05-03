import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Col, Layout, Row, Tabs } from 'antd';

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

interface IProps {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

const PAGE_LIMIT = 3;

export const User = ({ viewer, setViewer }: IProps) => {
  const { id, stripe_error } = useParams();

  const { data, loading, error, refetch } = useQuery<UserData, UserVariables>(
    USER,
    {
      variables: {
        id,
      },
    }
  );

  if (error) {
    return (
      <Content className="user">
        <ErrorBanner description="This user may not exist or we've encountered an error. Please try again soon." />
        <PageSkeleton />
      </Content>
    );
  }

  const handleRefetch = async () => {
    await refetch();
  };

  const user = data ? data.user : null;
  const isViewer = viewer.id === id;
  const userProfileElement = user ? (
    <UserProfile
      user={user}
      isViewer={isViewer}
      viewer={viewer}
      setViewer={setViewer}
      handleRefetch={handleRefetch}
    />
  ) : null;
  const stripeErrorBanner = stripe_error ? (
    <ErrorBanner description="We had an issue connecting with Stripe. Please try again soon." />
  ) : null;

  return loading ? (
    <Content className="user">
      <PageSkeleton />
    </Content>
  ) : (
    <Content className="user">
      {stripeErrorBanner}
      <Row gutter={12} justify="start">
        <Col xs={24}>{userProfileElement}</Col>
        <Col xs={24}>
          <Tabs defaultActiveKey="1" keyboard size="large">
            <TabPane tab="Listings" key="1">
              <UserListings id={id} limit={PAGE_LIMIT} />
            </TabPane>
            <TabPane tab="Bookings" key="2">
              <UserBookings id={id} limit={PAGE_LIMIT} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Content>
  );
};
