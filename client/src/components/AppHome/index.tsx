import React from 'react';

import { HomeHero } from '../HomeHero';
import { HomeSection } from './children';
import './style.css';
// import { ComingSoon } from '../ComingSoon';

export const AppHome = () => {
  return (
    <>
      <HomeHero />
      {/* <ComingSoon page="Home Page" /> */}
      <div className="home-body">
        <HomeSection
          name="Flights"
          image=""
          description="Book a flight for your next trip!"
        />
        <HomeSection
          name="Stays"
          image=""
          description="Find an incredible place to stay from Zoot's respository of over 500,000 apartments and houses around the globe!"
        />
        <HomeSection
          name="Experiences"
          image=""
          description="Meet amazing people and discover unforgettable experiences wherever you're headed!"
        />
      </div>
    </>
  );
};
