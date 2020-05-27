import React from 'react';
import { Link } from 'react-router-dom';
import { EllipsisOutlined } from '@ant-design/icons';

interface IProps {
  page: string;
}

export const ComingSoon = ({ page }: IProps) => {
  return (
    <div
      className="not-found"
      style={{ marginTop: '5px', color: 'var(--dark-font-color)' }}
    >
      <h1 className="not-found__description-title">{page} is coming soon!</h1>
      <EllipsisOutlined style={{ fontSize: '40px' }} />
      <span className="not-found__description-subtitle">
        The team is in the process of putting this feature together. Please come
        back later once we have completed development!
      </span>
      <Link to="/" className="not-found__cta">
        Go to Home
      </Link>
    </div>
  );
};
