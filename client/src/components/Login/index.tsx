import React, { useEffect, useRef } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';

// Image Assets
import googleLogo from './assets/google_logo.jpg';
import facebookLogo from './assets/f_logo_RGB-White_58.png';

import { Viewer } from '../../lib/types';
import { AuthUrl as AuthUrlData } from '../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl';
import {
  LogIn as LogInData,
  LogInVariables,
} from '../../lib/graphql/mutations/LogIn/__generated__/LogIn';
import { AUTH_URL } from '../../lib/graphql/queries/AuthUrl';
import { LOG_IN } from '../../lib/graphql/mutations/LogIn';
import {
  displayErrorMessage,
  displaySuccessNotification,
} from '../../lib/utils/';

import { Card, Layout, Typography, Spin } from 'antd';
import { ErrorBanner } from '../../lib/components';
import { Redirect } from 'react-router-dom';
const { Content } = Layout;
const { Text, Title } = Typography;
interface IProps {
  setViewer: (viewer: Viewer) => void;
}

export const Login = ({ setViewer }: IProps) => {
  const client = useApolloClient();
  const [
    logIn,
    { data: logInData, loading: logInLoading, error: logInError },
  ] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn);
        if (data.logIn.token) {
          sessionStorage.setItem('token', data.logIn.token);
        }
        displaySuccessNotification("Login Successful! Let's Get Started 👋");
      }
    },
  });
  const logInRef = useRef(logIn);

  const handleAuthorize = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({
        query: AUTH_URL,
      });
      window.location.href = data.authUrl;
    } catch {
      displayErrorMessage(
        "Sorry! We weren't able to log you in. Please try again later!"
      );
    }
  };

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      logInRef.current({
        variables: {
          input: { code },
        },
      });
    }
  }, []);

  if (logInLoading) {
    return (
      <Content className="log-in">
        <Spin size="large" tip="Logging you in..." />
      </Content>
    );
  }

  if (logInData && logInData.logIn) {
    const { id: viewerId } = logInData.logIn;
    return <Redirect to={`/user/${viewerId}`} />;
  }

  const logInErrorBanner = logInError ? (
    <ErrorBanner description="We weren't able to log you in. Please try again soon." />
  ) : null;

  return (
    <Content className="log-in">
      {logInErrorBanner}
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
        <button
          className="log-in-card-button log-in-card__google-button"
          onClick={handleAuthorize}
        >
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
