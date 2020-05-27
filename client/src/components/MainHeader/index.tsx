import React from 'react';
import { useHistory, Link, NavLink } from 'react-router-dom';

import { Viewer } from '../../lib/types';
import { SearchBar } from '../SearchBar';

import Logo from '../../lib/assets/DarkLogo.png';
import './style.css';
import { HomeOutlined, RocketOutlined, TeamOutlined } from '@ant-design/icons';

interface IProps {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const MainHeader = ({ viewer, setViewer }: IProps) => {
  const history = useHistory();
  const { location } = history;

  if (location.pathname === '/' || location.pathname === '/login') {
    return null;
  }

  const splitPath = location.pathname.split('/');

  const headerColor = location.pathname.includes('/listings')
    ? 'var(--primary-color)'
    : location.pathname.includes('/flights')
    ? 'var(--light-secondary-color)'
    : location.pathname.includes('/experiences')
    ? 'var(--dark-secondary-color)'
    : 'var(--dark-font-color)';

  const headerSearch =
    splitPath.length <= 2 ||
    (splitPath.length === 3 && splitPath[2] === '') ? null : (
      <SearchBar placeholder="Search 'San Francisco'" type="header" />
    );

  return (
    <nav
      className="main-header-container"
      style={{
        boxShadow: `0 2px 8px ${headerColor}`,
        borderBottom: `1px solid ${headerColor}`,
      }}
    >
      <div className="main-header-left">
        <div className="main-header-logo">
          <Link to="/">
            <img src={Logo} alt="Zoot" className="main-header-image" />
          </Link>
        </div>
        <div className="main-header-search">{headerSearch}</div>
      </div>
      <ul className="main-header-expanded">
        <li className="main-header-menu-item">
          <NavLink
            to="/flights"
            className="main-header-link"
            activeClassName="main-header-active"
          >
            <RocketOutlined />
            Flights
          </NavLink>
        </li>
        <li className="main-header-menu-item">
          <NavLink
            to="/listings"
            className="main-header-link"
            activeClassName="main-header-active"
          >
            <HomeOutlined />
            Stays
          </NavLink>
        </li>
        <li className="main-header-menu-item">
          <NavLink
            to="/experiences"
            className="main-header-link"
            activeClassName="main-header-active"
          >
            <TeamOutlined />
            Experiences
          </NavLink>
        </li>
        <li className="main-header-menu-item main-header-menu-item-sign-in">
          <Link to="/login">
            <button>Sign In</button>
          </Link>
        </li>
      </ul>
      <div className="main-header-burger"></div>
    </nav>
  );
};
