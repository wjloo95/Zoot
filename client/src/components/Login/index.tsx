import React from 'react';
import { Card, Layout, Typography } from 'antd';
import './Login.css';

// Image Assets
import googleLogo from './assets/google_logo.jpg';
import facebookLogo from './assets/f_logo_RGB-White_58.png';
import { Viewer } from '../../lib/types';

const { Content } = Layout;
const { Text, Title } = Typography;

interface IProps {
  setViewer: (viewer: Viewer) => void;
}

export const Login = ({ setViewer }: IProps) => {
  return (
    <Content className="log-in">
      <Card className="log-in-card">
        <div className="log-in-card__intro">
          <Title level={1} className="log-in-card__intro-title">
            <span role="img" aria-label="wave">
              ✈️🏠
            </span>
          </Title>
          <Title level={3} className="log-in-card__intro-title">
            Log in to Zoot!
          </Title>
          <Text>Sign in to get started on your next adventure!</Text>
        </div>
        <button className="log-in-card-button log-in-card__facebook-button">
          <img
            src={facebookLogo}
            alt="Facebook Logo"
            className="log-in-card-button-logo log-in-card__facebook-button-logo"
          />
          <span className="log-in-card-button-text log-in-card__facebook-button-text">
            Continue with Facebook
          </span>
        </button>
        <button className="log-in-card-button log-in-card__google-button">
          <img
            src={googleLogo}
            alt="Google Logo"
            className="log-in-card-button-logo log-in-card__google-button-logo"
          />
          <span className="log-in-card-button-text log-in-card__google-button-text">
            Sign in with Google
          </span>
        </button>
        <Text type="secondary">
          Note: By signing in, you will be redirected to the selected host's
          consent form to sign in through their portal.
        </Text>
      </Card>
    </Content>
  );
};
