import React, { ChangeEvent, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Redirect, Link } from 'react-router-dom';

import Logo from '../../lib/assets/DarkLogo.png';

import { Viewer } from '../../lib/types';

import {
  Register as RegisterData,
  RegisterVariables,
} from '../../lib/graphql/mutations/Register/__generated__/Register';
import { REGISTER } from '../../lib/graphql/mutations';

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
  const [formInputs, setFormInputs] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [register, { data, loading, error }] = useMutation<
    RegisterData,
    RegisterVariables
  >(REGISTER, {
    onCompleted: (data) => {
      if (data && data.register) {
        if (data.register.token === 'existing') {
          displayErrorMessage(
            'Sorry! This email already exists in our database. Please login or try another email.'
          );
        } else {
          setViewer(data.register);
          if (data.register.token) {
            sessionStorage.setItem('token', data.register.token);
          }
          displaySuccessNotification(
            "Registration Successful! Let's Get Started 👋"
          );
        }
      }
    },
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      register({ variables: { input: formInputs } });
    } catch {
      displayErrorMessage(
        "Sorry! We weren't able to create this account. Please try again later!"
      );
    }
  };

  if (data && data.register) {
    const { id: viewerId } = data.register;
    if (viewerId !== null) {
      return <Redirect to={`/user/${viewerId}`} />;
    }
  }

  const registerErrorBanner = error ? (
    <ErrorBanner description="We weren't able to create this account. Please try again soon." />
  ) : null;

  return loading ? (
    <div className="log-in" style={{ justifyContent: 'center' }}>
      <Spin size="large" tip="Creating your account..." />
    </div>
  ) : (
    <div className="log-in">
      {registerErrorBanner}
      <div className="log-in-card">
        <Link to="/">
          <img src={Logo} alt="Zoot" />
        </Link>
        <div className="log-in-card-intro">
          <h1>Create an Account!</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-element">
            <label>Name</label>
            <input
              type="text"
              name="name"
              required
              onChange={handleInputChange}
              value={formInputs.name}
            />
          </div>
          <div className="form-element">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              onChange={handleInputChange}
              value={formInputs.email}
            />
          </div>
          <div className="form-element">
            <label>Password</label>
            <input
              type="password"
              name="password"
              required
              onChange={handleInputChange}
              value={formInputs.password}
            />
          </div>
          <button type="submit" className="local-login-button">
            Register
          </button>
        </form>
        <div className="login-divider">
          -- or <Link to="/login">login</Link> --
        </div>
      </div>
      <div className="log-in-overlay"></div>
    </div>
  );
};
