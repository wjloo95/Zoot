import React from 'react';
import { Layout } from 'antd';

import { HomeHero } from './children';

import mapBackground from './assets/map-background.jpg';
import { useHistory } from 'react-router-dom';

const { Content } = Layout;

export const ListingsHome = () => {
  let history = useHistory();

  const onSearch = (value: string) => {
    history.push(`/listings/${value}`);
  };
  return (
    <Content
      className="home"
      style={{ backgroundImage: `url(${mapBackground})` }}
    >
      <HomeHero onSearch={onSearch} />
    </Content>
  );
};
