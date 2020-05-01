import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

const { Header: AntHeader } = Layout;

export const Header = () => {
  return (
    <AntHeader className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <Link to="/">Hi!</Link>
        </div>
      </div>
    </AntHeader>
  );
};
