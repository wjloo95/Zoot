import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Input, Layout, Avatar } from 'antd';
import { MenuItems } from './children';
import { Viewer } from '../../lib/types';
import { searchValid } from '../../lib/utils';
import { displayErrorMessage } from '../../lib/utils';
import logo2 from './assets/Logo2.png';

const { Header: AntHeader } = Layout;
const { Search } = Input;

interface IProps {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const AppHeader = ({ viewer, setViewer }: IProps) => {
  const [search, setSearch] = useState('');
  const history = useHistory();
  const { location } = history;

  useEffect(() => {
    const pathnameSubStrings = location.pathname.split('/');

    if (!location.pathname.includes('/listings')) {
      setSearch('');
      return;
    }

    if (
      location.pathname.includes('/listings') &&
      pathnameSubStrings.length === 3
    ) {
      setSearch(pathnameSubStrings[2]);
      return;
    }
  }, [location]);

  const onSearch = (value: string) => {
    const trimmedValue = value.trim();
    if (searchValid(value)) {
      displayErrorMessage('Please enter a valid search term!');
    } else {
      history.push(`/listings/${trimmedValue}`);
    }
  };
  const headerSearch =
    location.pathname !== '/listings' ? (
      <div className="app-header__search-input">
        <Search
          placeholder="Search 'San Francisco'"
          enterButton
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={onSearch}
        />
      </div>
    ) : null;

  return (
    <AntHeader className="app-header">
      <div className="app-header-search-section">
        <div className="app-header-logo">
          <Link to="/">
            <Avatar
              src={logo2}
              shape="square"
              style={{ width: '90px', height: '100%', verticalAlign: 'top' }}
            />
          </Link>
        </div>
        {headerSearch}
      </div>
      <div className="app-header-menu-section">
        <MenuItems viewer={viewer} setViewer={setViewer} />
      </div>
    </AntHeader>
  );
};
