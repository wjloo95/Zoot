import React from 'react';
import { Viewer } from '../../../../lib/types';
import { Link } from 'react-router-dom';
import placeholder from '../../../../lib/assets/UserPlaceholder.png';
import {
  UserOutlined,
  UserAddOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

interface IProps {
  viewer: Viewer;
}

export const LoginSection = ({ viewer }: IProps) => {
  const loggedInSection = (
    <div className="home-body-login">
      <img src={viewer.avatar || placeholder} alt="User Profile" />
      <div>Welcome back! We're happy to see you again </div>
      <Link
        to={`/user/${viewer.id}`}
        className="right-section-button right-login-button"
      >
        <UserOutlined /> Profile <ArrowRightOutlined />
      </Link>
    </div>
  );
  const loggedOutSection = (
    <div className="home-body-login">
      <div>Please Login to Get Started!</div>
      <Link to="/login" className="right-section-button right-login-button">
        <UserAddOutlined /> Login <ArrowRightOutlined />
      </Link>
    </div>
  );

  return viewer.id ? loggedInSection : loggedOutSection;
};
