import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Input, Layout } from 'antd';
import { MenuItems } from './children';
import { Viewer } from '../../lib/types';

const { Header: AntHeader } = Layout;
const { Search } = Input;

interface IProps {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const AppHeader = ({ viewer, setViewer }: IProps) => {
  const { location } = useHistory();

  const onSearch = (value: string) => {};

  const headerSearch =
    location.pathname !== '/listings' ? (
      <div className="app-header__search-input">
        <Search
          placeholder="Search 'San Francisco'"
          enterButton
          onSearch={onSearch}
        />
      </div>
    ) : null;

  return (
    <AntHeader className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <Link to="/">Hi!</Link>
        </div>
        {headerSearch}
      </div>
      <div className="app-header__menu-section">
        <MenuItems viewer={viewer} setViewer={setViewer} />
      </div>
    </AntHeader>
  );
};
