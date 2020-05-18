import React from 'react';
import { Link } from 'react-router-dom';

import { PageSkeleton } from '../../../../../lib/components';

interface IProps {
  listingsRegion: string | null;
}

export const NoListings = ({ listingsRegion }: IProps) => {
  return listingsRegion ? (
    <div>
      <div className="no-listings-text">
        It appears that no listings have yet been created for{' '}
        <span className="no-listings-mark">"{listingsRegion}"</span>
      </div>
      <div className="no-listings-text">
        Be the first person to create a{' '}
        <Link to="/host">listing in this area</Link>!
      </div>
    </div>
  ) : (
    <PageSkeleton />
  );
};
