import React from 'react';
import { Link } from 'react-router-dom';
import { FrownOutlined } from '@ant-design/icons';

export const NotFound = () => {
  return (
    <div className="not-found" style={{ marginTop: '15px' }}>
      <h1 className="not-found__description-title">
        Uh oh! Something went wrong.
      </h1>
      <FrownOutlined
        style={{ fontSize: '40px', color: 'var(--dark-font-color)' }}
      />
      <span className="not-found__description-subtitle">
        The page you're looking for can't be found
      </span>
      <Link to="/" className="not-found__cta">
        Go to Home
      </Link>
    </div>
  );
};
