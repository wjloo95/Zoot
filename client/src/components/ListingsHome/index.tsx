import React from 'react';
import { Layout } from 'antd';

import { HomeHero } from './children';

import mapBackground from './assets/map-background.jpg';

const { Content } = Layout;

export const ListingsHome = () => {
  return (
    <Content
      className="home"
      style={{ backgroundImage: `url(${mapBackground})` }}
    >
      <HomeHero />
    </Content>
  );
};
