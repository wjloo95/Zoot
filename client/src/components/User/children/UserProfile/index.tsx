import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';

import { User as UserData } from '../../../../lib/graphql/queries/User/__generated__/User';
import {
  formatPrice,
  displaySuccessNotification,
  displayErrorMessage,
} from '../../../../lib/utils';
import { DisconnectStripe as DisconnectStripeData } from '../../../../lib/graphql/mutations/DisconnectStripe/__generated__/DisconnectStripe';
import { useMutation } from '@apollo/react-hooks';
import { DISCONNECT_STRIPE } from '../../../../lib/graphql/mutations';
import { Viewer } from '../../../../lib/types';

import placeholder from '../../../../lib/assets/UserPlaceholder.png';
interface IProps {
  user: UserData['user'];
  isViewer: boolean;
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
  handleRefetch: () => void;
}

const STRIPE_URL = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_S_CLIENT_ID}&scope=read_write`;

export const UserProfile = ({
  user,
  isViewer,
  viewer,
  setViewer,
  handleRefetch,
}: IProps) => {
  const [avatarImage, setAvatarImage] = useState(user.avatar || placeholder);
  const [disconnectStripe] = useMutation<DisconnectStripeData>(
    DISCONNECT_STRIPE,
    {
      onCompleted: (data) => {
        if (data && data.disconnectStripe) {
          setViewer({ ...viewer, hasWallet: data.disconnectStripe.hasWallet });
          displaySuccessNotification(
            "You've successfully disconnected from Stripe!",
            "You'll have to reconnect with Stripe to continue to create listings."
          );
          handleRefetch();
        }
      },
      onError: () => {
        displayErrorMessage(
          "Sorry! We weren't able to disconnect you from Stripe. Please try again later!"
        );
      },
    }
  );

  const sendToStripe = () => {
    window.location.href = STRIPE_URL;
  };

  const additionalDetails = user.hasWallet ? (
    <>
      <div className="stripe-registered">Stripe Registered</div>
      <p>
        Income Earned:{' '}
        <span>{user.income ? formatPrice(user.income) : `$0`}</span>
      </p>
      <div
        className="user-profile-details-cta-neg"
        onClick={() => disconnectStripe()}
      >
        Disconnect Stripe
      </div>
      <p>
        By disconnecting, you won't be able to receive{' '}
        <span>any further payments</span>. This will prevent users from booking
        listings that you have created.
      </p>
      <div className="user-profile-details-title">Host a Listing</div>
      <p>
        Interested in listing a property? Complete our listings form to start
        earning money!
      </p>
      <Link to={'/host'}>
        <div className="user-profile-details-cta">List a Property</div>
      </Link>
    </>
  ) : (
    <>
      <div>
        Interested in becoming a host? Register with your Stripe account!
      </div>
      <div className="user-profile-details-cta" onClick={sendToStripe}>
        Connect with Stripe
      </div>
      <div>
        <a
          href="https://stripe.com/en-US/connect"
          target="_blank"
          rel="noopener noreferrer"
        >
          Stripe
        </a>{' '}
        is used to help transfer your earnings in a secure and trusted manner.
      </div>
    </>
  );

  const additionalDetailsSection = isViewer ? (
    <>
      <div className="user-profile-additional">
        <div className="user-profile-details-title">Payment Information</div>
        {additionalDetails}
      </div>
    </>
  ) : null;

  return (
    <div className="user-profile">
      <img
        onError={() => {
          setAvatarImage(placeholder);
          return false;
        }}
        src={avatarImage}
        className="user-profile-avatar"
      />
      <div className="user-profile-details">
        <div className="user-profile-details-title">Details</div>
        <p>
          Name: <span>{user.name}</span>
        </p>
        <p>
          Location: <span>{user.location}</span>
        </p>
        <p>
          User Since: <span>{user.since}</span>
        </p>
        <p>
          About: <span>{user.about}</span>
        </p>
      </div>
      {additionalDetailsSection}
    </div>
  );
};
