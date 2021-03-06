import React, { useState, useRef, useEffect } from 'react';
import {
  StaysHome,
  Host,
  Listing,
  Listings,
  NotFound,
  User,
  Login,
  Register,
  Stripe,
  AppFooter,
  ScrollToTop,
  AppHome,
  FlightsHome,
  ExperiencesHome,
} from './index';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StripeProvider, Elements } from 'react-stripe-elements';

import { Viewer } from '../lib/types';
import { AppHeader } from './AppHeader';
import { useMutation } from '@apollo/react-hooks';
import {
  LogIn as LogInData,
  LogInVariables,
} from '../lib/graphql/mutations/LogIn/__generated__/LogIn';
import { LOG_IN } from '../lib/graphql/mutations';
import { HomeSkeleton, ErrorBanner } from '../lib/components';

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
      <Router>
        <div className="app-skeleton">
          <AppHeader viewer={viewer} setViewer={setViewer} />
          <HomeSkeleton />
        </div>
      </Router>
    );
  }

  const logInErrorBannerElement = error ? (
    <ErrorBanner description="We weren't able to verify if you were logged in. Please try again later!" />
  ) : null;

  return (
    <>
      <StripeProvider
        apiKey={process.env.REACT_APP_S_PUBLISHABLE_KEY as string}
      >
        <Router>
          <ScrollToTop />
          <div id="app">
            {logInErrorBannerElement}
            <AppHeader viewer={viewer} setViewer={setViewer} />
            <Switch>
              <Route exact path="/">
                <AppHome viewer={viewer} />
              </Route>
              <Route exact path="/listings" component={StaysHome} />
              <Route exact path="/login">
                <Login setViewer={setViewer} />
              </Route>
              <Route exact path="/register">
                <Register setViewer={setViewer} />
              </Route>
              <Route exact path="/host">
                <Host viewer={viewer} />
              </Route>
              <Route exact path="/listing/:id">
                <Elements>
                  <Listing viewer={viewer} />
                </Elements>
              </Route>
              <Route exact path="/listings/:location?" component={Listings} />
              <Route exact path="/user/:id">
                <User viewer={viewer} setViewer={setViewer} />
              </Route>
              <Route exact path="/stripe">
                <Stripe viewer={viewer} setViewer={setViewer} />
              </Route>
              <Route exact path="/flights" component={FlightsHome} />
              <Route exact path="/experiences" component={ExperiencesHome} />
              <Route component={NotFound} />
            </Switch>
            <AppFooter />
          </div>
        </Router>
      </StripeProvider>
    </>
  );
};

export default App;
