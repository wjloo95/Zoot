import React from 'react';

// import './style.css';
import { HomeHero } from '../../HomeHero';
import { ComingSoon } from '../../ComingSoon';

export const FlightsHome = () => {
  return (
    <>
      <HomeHero />
      <ComingSoon page="Flights" />
    </>
  );
};
