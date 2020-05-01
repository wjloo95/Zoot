import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { MenuItems } from './children';
import { Viewer } from '../../lib/types';

const { Header: AntHeader } = Layout;

interface IProps {
  viewer: Viewer;
}

export const Header = ({ viewer }: IProps) => {
  return (
    <AntHeader className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <Link to="/">Hi!</Link>
        </div>
      </div>
      <div className="app-header__menu-section">
        <MenuItems viewer={viewer} />
      </div>
    </AntHeader>
  );
};
