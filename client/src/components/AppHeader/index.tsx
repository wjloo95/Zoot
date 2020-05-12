import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MenuItems } from './children';
import { Viewer } from '../../lib/types';
import Logo from '../../lib/assets/DarkLogo.png';
import { SearchBar } from '../index';

interface IProps {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const AppHeader = ({ viewer, setViewer }: IProps) => {
  const history = useHistory();
  const { location } = history;

  if (
    location.pathname === '/' ||
    location.pathname === '/listings' ||
    location.pathname === '/login'
  ) {
    return null;
  }

  const headerSearch =
    location.pathname !== '/listings' ? (
      <SearchBar placeholder="Search 'San Francisco'" type="header" />
    ) : null;

  return (
    <div className="app-header">
      <div className="app-header-search-section">
        <div className="app-header-logo">
          <Link to="/">
            <img src={Logo} alt="Zoot" />
          </Link>
        </div>
        {headerSearch}
      </div>
      <div className="app-header-menu-section">
        <MenuItems viewer={viewer} setViewer={setViewer} />
      </div>
    </div>
  );
};
