import React, { useEffect, useRef } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { Redirect, Link } from 'react-router-dom';

import googleLogo from './assets/GoogleLogo.png';
import Logo from '../../lib/assets/DarkLogo.png';

import { Viewer } from '../../lib/types';

import { AuthUrl as AuthUrlData } from '../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl';
import { AUTH_URL } from '../../lib/graphql/queries';

import {
  LogIn as LogInData,
  LogInVariables,
} from '../../lib/graphql/mutations/LogIn/__generated__/LogIn';
import { LOG_IN } from '../../lib/graphql/mutations';

import {
  displayErrorMessage,
  displaySuccessNotification,
} from '../../lib/utils/';
import { ErrorBanner } from '../../lib/components';

import { Spin } from 'antd';
import LoginBackground from '../../lib/assets/LoginBackground.jpg';
import './style.css';
interface IProps {
  setViewer: (viewer: Viewer) => void;
}

export const Login = ({ setViewer }: IProps) => {
  const client = useApolloClient();
  const [logIn, { data, loading, error }] = useMutation<
    LogInData,
    LogInVariables
  >(LOG_IN, {
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

  if (data && data.logIn) {
    const { id: viewerId } = data.logIn;
    return <Redirect to={`/user/${viewerId}`} />;
  }

  const logInErrorBanner = error ? (
    <ErrorBanner description="We weren't able to log you in. Please try again soon." />
  ) : null;

  return loading ? (
    <div className="log-in" style={{ justifyContent: 'center' }}>
      <Spin size="large" tip="Logging you in..." />
    </div>
  ) : (
    <div
      className="log-in"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      {logInErrorBanner}
      <div className="log-in-card">
        <Link to="/">
          <img src={Logo} alt="Zoot" />
        </Link>
        <div className="log-in-card-intro">
          <h1>Log in to get started!</h1>
        </div>
        <button className="log-in-card-button" onClick={handleAuthorize}>
          <img
            src={googleLogo}
            alt="Google Logo"
            className="log-in-card-button-logo"
          />
          <span className="log-in-card-button-text ">Sign in with Google</span>
        </button>
        Note: By signing in, you will be redirected to sign in through Google's
        portal.
      </div>
      <div className="log-in-overlay"></div>
    </div>
  );
};
