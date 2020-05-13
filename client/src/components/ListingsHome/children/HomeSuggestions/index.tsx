import React from 'react';
import { Link } from 'react-router-dom';

import newYorkImage from '../../assets/newyork.jpg';
import losAngelesImage from '../../assets/los-angeles.jpg';
import londonImage from '../../assets/london.jpg';
import parisImage from '../../assets/france.jpg';

export const HomeSuggestions = () => {
  return (
    <div className="listings-suggestions">
      <div className="suggestion-container">
        <Link to="/listings/London">
          <div className="suggestion-card">
            <img alt="london" src={londonImage} className="suggestion-image" />
            <h1 className="suggestion-name">London</h1>
          </div>
        </Link>
      </div>
      <div className="suggestion-container">
        <Link to="/listings/Los%20Angeles">
          <div className="suggestion-card">
            <img
              alt="los-angeles"
              src={losAngelesImage}
              className="suggestion-image"
            />
            <h1 className="suggestion-name">Los Angeles</h1>
          </div>
        </Link>
      </div>
      <div className="suggestion-container">
        <Link to="/listings/New%20York">
          <div className="suggestion-card">
            <img
              alt="new-york"
              src={newYorkImage}
              className="suggestion-image"
            />
            <h1 className="suggestion-name">New York</h1>
          </div>
        </Link>
      </div>
      <div className="suggestion-container">
        <Link to="/listings/Paris">
          <div className="suggestion-card">
            <img alt="paris" src={parisImage} className="suggestion-image" />
            <h1 className="suggestion-name">Paris</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};
