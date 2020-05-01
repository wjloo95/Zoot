import React, { useState } from 'react';
import { Home, Host, Listing, Listings, NotFound, User, Login } from './index';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Layout, Affix } from 'antd';
import { Viewer } from '../lib/types';
import { Header } from './Header';

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);

  return (
    <Router>
      <Layout id="app">
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
          <Route>
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
