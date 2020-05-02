import React from 'react';
import { Layout } from 'antd';

import { HomeHero } from './children';

const { Content } = Layout;

export const ListingsHome = () => {
  return (
    <Content className="home">
      <HomeHero />
    </Content>
  );
};
