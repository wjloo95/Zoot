import React, { useEffect, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Layout, Spin } from 'antd';
import { CONNECT_STRIPE } from '../../lib/graphql/mutations/ConnectStripe';
import {
  ConnectStripe as ConnectStripeData,
  ConnectStripeVariables,
} from '../../lib/graphql/mutations/ConnectStripe/__generated__/ConnectStripe';
import { Redirect, useParams } from 'react-router-dom';
import { Viewer } from '../../lib/types';

const { Content } = Layout;

interface IProps {
  viewer: Viewer;
}

export const Stripe = ({ viewer }: IProps) => {
  const [connectStripe, { data, loading, error }] = useMutation<
    ConnectStripeData,
    ConnectStripeVariables
  >(CONNECT_STRIPE);

  const connectStripeRef = useRef(connectStripe);

  useEffect(() => {
    // const { code } = useParams();

    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      connectStripeRef.current({
        variables: {
          input: { code },
        },
      });
    }
  }, []);

  if (error) {
    return <Redirect to={`/user/${viewer.id}?stripe_error=true`} />;
  }

  return loading ? (
    <Content className="stripe">
      <Spin size="large" tip="Connecting your Stripe account..." />
    </Content>
  ) : (
    <div>lol</div>
  );
};
