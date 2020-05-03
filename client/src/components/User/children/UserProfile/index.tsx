import React from 'react';
import { Avatar, Button, Card, Divider, Typography } from 'antd';
import { User as UserData } from '../../../../lib/graphql/queries/User/__generated__/User';

interface IProps {
  user: UserData['user'];
  isViewer: boolean;
}

const { Paragraph, Text, Title } = Typography;

const STRIPE_URL = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_S_CLIENT_ID}&scope=read_write`;

export const UserProfile = ({ user, isViewer }: IProps) => {
  const sendToStripe = () => {
    window.location.href = STRIPE_URL;
  };
  const additionalDetailsSection = isViewer ? (
    <>
      <Divider />
      <div className="user-profile__details">
        <Title level={4}>Additional Details</Title>
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
      </div>
    </>
  ) : null;

  return (
    <div className="user-profile">
      <Card className="user-profile__card">
        <div className="user-profile__avatar">
          <Avatar size={100} src={user.avatar} />
        </div>
        <Divider />
        <div className="user-profile__details">
          <Title level={4}>Details</Title>
          <Paragraph>
            Name: <Text strong>{user.name}</Text>
          </Paragraph>
          <Paragraph>
            Contact: <Text strong>{user.contact}</Text>
          </Paragraph>
        </div>
        {additionalDetailsSection}
      </Card>
    </div>
  );
};
