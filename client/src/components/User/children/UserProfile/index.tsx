import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Card, Divider, Tag, Typography } from 'antd';

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

const { Paragraph, Text, Title } = Typography;

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
      <Paragraph>
        <Tag color="green">Stripe Registered</Tag>
      </Paragraph>
      <Paragraph>
        Income Earned:{' '}
        <Text strong>{user.income ? formatPrice(user.income) : `$0`}</Text>
      </Paragraph>
      <Button
        type="primary"
        className="user-profile__details-cta"
        onClick={() => disconnectStripe()}
      >
        Disconnect Stripe
      </Button>
      <Paragraph type="secondary">
        By disconnecting, you won't be able to receive{' '}
        <Text strong>any further payments</Text>. This will prevent users from
        booking listings that you have created.
      </Paragraph>
      <Divider />
      <Paragraph>
        Interested in listing a property? Complete our listings form to start
        earning money!
      </Paragraph>
      <Link to={'/host'}>
        <Button type="primary" className="user-profile__details-cta">
          List a Property
        </Button>
      </Link>
    </>
  ) : (
    <>
      <Paragraph>
        Interested in becoming a host? Register with your Stripe account!
      </Paragraph>
      <Button
        type="primary"
        className="user-profile__details-cta"
        onClick={sendToStripe}
      >
        Connect with Stripe
      </Button>
      <Paragraph type="secondary">
        <a
          href="https://stripe.com/en-US/connect"
          target="_blank"
          rel="noopener noreferrer"
        >
          Stripe
        </a>{' '}
        is used to help transfer your earnings in a secure and trusted manner.
      </Paragraph>
    </>
  );

  const additionalDetailsSection = isViewer ? (
    <>
      <Divider />
      <div className="user-profile__details">
        <Title level={4}>Additional Details</Title>
        {additionalDetails}
      </div>
    </>
  ) : null;

  return (
    <div className="user-profile">
      <Card className="user-profile__card">
        <div className="user-profile__avatar">
          <Avatar
            size={100}
            onError={() => {
              setAvatarImage(placeholder);
              return false;
            }}
            src={avatarImage}
          />
        </div>
        <Divider />
        <div className="user-profile__details">
          <Title level={4}>Details</Title>
          <Paragraph>
            Name: <Text strong>{user.name}</Text>
          </Paragraph>
          <Paragraph>
            Location: <Text strong>{user.location}</Text>
          </Paragraph>
          <Paragraph>
            User Since: <Text strong>{user.since}</Text>
          </Paragraph>
          <Paragraph>
            About: <Text strong>{user.about}</Text>
          </Paragraph>
        </div>
        {additionalDetailsSection}
      </Card>
    </div>
  );
};
