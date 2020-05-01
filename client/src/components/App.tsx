import React, { useState, useRef, useEffect } from 'react';
import { Home, Host, Listing, Listings, NotFound, User, Login } from './index';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Layout, Affix, Spin } from 'antd';
import { Viewer } from '../lib/types';
import { Header } from './Header';
import { useMutation } from '@apollo/react-hooks';
import {
  LogIn as LogInData,
  LogInVariables,
} from '../lib/graphql/mutations/LogIn/__generated__/LogIn';
import { LOG_IN } from '../lib/graphql/mutations/LogIn';
import { AppHeaderSkeleton, ErrorBanner } from '../lib/components';

const initialViewer: Viewer = {
  id: null,
  token: null,
  name: null,
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
    <Router>
      <Layout id="app">
        {logInErrorBannerElement}
        <Affix offsetTop={0} className="app__affix-header">
          <Header viewer={viewer} setViewer={setViewer} />
        </Affix>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route
            exact
            path="/login"
            render={(props) => <Login {...props} setViewer={setViewer} />}
          /> */}
          <Route exact path="/login">
            <Login setViewer={setViewer} />
          </Route>
          <Route exact path="/host" component={Host} />
          <Route exact path="/listing/:id" component={Listing} />
          <Route exact path="/listings/:location?" component={Listings} />
          <Route exact path="/user/:id" component={User} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
