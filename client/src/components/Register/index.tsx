import React, { useEffect, useRef } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { Redirect, Link } from 'react-router-dom';

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
interface IProps {
  setViewer: (viewer: Viewer) => void;
}

export const Register = ({ setViewer }: IProps) => {
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

  const logInErrorBanner = error ? (
    <ErrorBanner description="We weren't able to log you in. Please try again soon." />
  ) : null;

  return loading ? (
    <div className="log-in" style={{ justifyContent: 'center' }}>
      <Spin size="large" tip="Creating your account..." />
    </div>
  ) : (
    <div className="log-in">
      {logInErrorBanner}
      <div className="log-in-card">
        <Link to="/">
          <img src={Logo} alt="Zoot" />
        </Link>
        <div className="log-in-card-intro">
          <h1>Create your Account!</h1>
        </div>
        <form>
          <div className="form-element">
            <label>Name</label>
            <input type="text" name="name" required />
          </div>
          <div className="form-element">
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          <div className="form-element">
            <label>Password</label>
            <input type="password" name="password" required />
          </div>
          <button type="submit" className="local-login-button">
            Register
          </button>
        </form>
        <div className="login-divider">
          -- or <Link to="register">login</Link> --
        </div>
      </div>
      <div className="log-in-overlay"></div>
    </div>
  );
};
