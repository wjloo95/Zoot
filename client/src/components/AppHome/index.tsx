import React from 'react';

// import './style.css';
import { HomeHero } from '../HomeHero';
import { ComingSoon } from '../ComingSoon';

export const AppHome = () => {
  return (
    <>
      <HomeHero />
      <ComingSoon page="Home Page" />
    </>
  );
};
