import React, { useState, useRef, useEffect } from 'react';
import {
  ListingsHome,
  Host,
  Listing,
  Listings,
  NotFound,
  User,
  Login,
} from './index';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Layout, Spin } from 'antd';
import { Viewer } from '../lib/types';
import { AppHeader } from './AppHeader';
import { useMutation } from '@apollo/react-hooks';
import {
  LogIn as LogInData,
  LogInVariables,
} from '../lib/graphql/mutations/LogIn/__generated__/LogIn';
import { LOG_IN } from '../lib/graphql/mutations';
import { AppHeaderSkeleton, ErrorBanner } from '../lib/components';
import { Stripe } from './Stripe';
import { AppFooter } from './AppFooter';
import { ComingSoon } from './ComingSoon';
import ScrollToTop from './ScrollToTop';
import { AppHome } from './AppHome';

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn);

        if (data.logIn.token) {
          sessionStorage.setItem('token', data.logIn.token);
        } else {
          sessionStorage.removeItem('token');
        }
      }
    },
  });

  const logInRef = useRef(logIn);

  useEffect(() => {
    logInRef.current();
  }, []);

  if (!viewer.didRequest && !error) {
    return (
      <Layout className="app-skeleton">
        <AppHeaderSkeleton />
        <div className="app-skeleton__spin-section">
          <Spin size="large" tip="Getting Set Up" />
        </div>
      </Layout>
    );
  }

  const logInErrorBannerElement = error ? (
    <ErrorBanner description="We weren't able to verify if you were logged in. Please try again later!" />
  ) : null;

  return (
    <>
      <Router>
        <ScrollToTop />
        <Layout id="app">
          {logInErrorBannerElement}
          <AppHeader viewer={viewer} setViewer={setViewer} />
          <Switch>
            <Route exact path="/" component={AppHome} />
            <Route exact path="/listings" component={ListingsHome} />
            <Route exact path="/login">
              <Login setViewer={setViewer} />
            </Route>
            <Route exact path="/host">
              <Host viewer={viewer} />
            </Route>
            <Route exact path="/listing/:id">
              <Listing viewer={viewer} />
            </Route>
            <Route exact path="/listings/:location?" component={Listings} />
            <Route exact path="/user/:id">
              <User viewer={viewer} setViewer={setViewer} />
            </Route>
            <Route exact path="/stripe">
              <Stripe viewer={viewer} setViewer={setViewer} />
            </Route>
            <Route exact path="/comingsoon" component={ComingSoon} />
            <Route component={NotFound} />
          </Switch>
          <AppFooter />
        </Layout>
      </Router>
    </>
  );
};

export default App;
