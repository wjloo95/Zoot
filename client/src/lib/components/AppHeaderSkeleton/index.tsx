import React from 'react';
import { Layout, Avatar } from 'antd';
import logo2 from '../../../components/AppHeader/assets/Logo2.png';

const { Header } = Layout;

export const AppHeaderSkeleton = () => {
  return (
    <Header className="app-header">
      <div className="app-header-search-section">
        <div className="app-header-logo">
          <Avatar
            src={logo2}
            shape="square"
            style={{ width: '90px', height: '100%', verticalAlign: 'top' }}
          />
        </div>
      </div>
    </Header>
  );
};
