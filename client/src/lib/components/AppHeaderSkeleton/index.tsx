import React from 'react';
import Logo from '../../../components/AppHeader/assets/NewLogoCropped.png';

export const AppHeaderSkeleton = () => {
  return (
    <div className="app-header">
      <div className="app-header-search-section">
        <div className="app-header-logo">
          <img src={Logo} alt="Zoot" />
        </div>
      </div>
    </div>
  );
};
