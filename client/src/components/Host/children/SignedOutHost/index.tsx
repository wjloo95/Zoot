import React from 'react';
import { Layout, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { Title, Text } = Typography;

export const SignedOutHost = () => {
  return (
    <Content className="host-content">
      <div className="host__form-header">
        <Title level={4} className="host__form-title">
          You'll have to be signed in and connected with Stripe to host a
          listing!
        </Title>
        <Text type="secondary">
          We only allow users who've signed in to our application and have
          connected with Stripe to host new listings. You can sign in at the{' '}
          <Link to="/login">/login</Link> page and connect with Stripe shortly
          after.
        </Text>
      </div>
    </Content>
  );
};
