import React from 'react';
import { Link } from 'react-router-dom';

export const SignedOutHost = () => {
  return (
    <div className="host-content">
      <div className="host__form-header">
        <h4 className="host__form-title">
          You'll have to be signed in and connected with Stripe to host a
          listing!
        </h4>
        <span>
          We only allow users who've signed in to our application and have
          connected with Stripe to host new listings. You can sign in at the{' '}
          <Link to="/login">/login</Link> page and connect with Stripe shortly
          after.
        </span>
      </div>
    </div>
  );
};
