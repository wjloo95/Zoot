import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Tabs } from 'antd';

import { USER } from '../../lib/graphql/queries';
import {
  User as UserData,
  UserVariables,
} from '../../lib/graphql/queries/User/__generated__/User';
import { useParams } from 'react-router-dom';
import {
  UserProfile,
  UserBookings,
  UserListings,
  UserFavorites,
} from './children';
import { Viewer } from '../../lib/types';
import { ErrorBanner, PageSkeleton } from '../../lib/components';

import './style.css';

const { TabPane } = Tabs;

interface IProps {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

interface IParams {
  id: string;
  stripe_error: string;
}

const PAGE_LIMIT = 3;

export const User = ({ viewer, setViewer }: IProps) => {
  const { id, stripe_error } = useParams<IParams>();

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
      <main className="user">
        <ErrorBanner description="This user may not exist or we've encountered an error. Please try again soon." />
        <PageSkeleton />
      </main>
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
    <main className="user">
      <PageSkeleton />
    </main>
  ) : (
    <main>
      {stripeErrorBanner}
      <div className="user">
        <>{userProfileElement}</>
        <>
          <Tabs keyboard defaultActiveKey="1" size="large">
            <TabPane tab="Listings" key="1">
              <UserListings id={id} limit={PAGE_LIMIT} />
            </TabPane>
            <TabPane tab="Bookings" key="2">
              <UserBookings id={id} limit={PAGE_LIMIT} />
            </TabPane>
            <TabPane tab="Favorites" key="3">
              <UserFavorites id={id} limit={PAGE_LIMIT} />
            </TabPane>
          </Tabs>
        </>
      </div>
    </main>
  );
};
