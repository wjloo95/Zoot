import React from 'react';
import { Layout } from 'antd';
import { ListingsSection } from './children';

const { Content } = Layout;

export const Listings = () => {
  return (
    <Content className="listings">
      <ListingsSection />
      <div className="map"></div>
    </Content>
  );
};
