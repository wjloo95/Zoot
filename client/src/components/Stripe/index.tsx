import React, { useEffect, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Layout, Spin } from 'antd';
import { CONNECT_STRIPE } from '../../lib/graphql/mutations';
import {
  ConnectStripe as ConnectStripeData,
  ConnectStripeVariables,
} from '../../lib/graphql/mutations/ConnectStripe/__generated__/ConnectStripe';
import { Redirect, useHistory } from 'react-router-dom';
import { Viewer } from '../../lib/types';
import { displaySuccessNotification } from '../../lib/utils';

const { Content } = Layout;

interface IProps {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const Stripe = ({ viewer, setViewer }: IProps) => {
  const [connectStripe, { data, loading, error }] = useMutation<
    ConnectStripeData,
    ConnectStripeVariables
  >(CONNECT_STRIPE, {
    onCompleted: (data) => {
      if (data && data.connectStripe) {
        setViewer({ ...viewer, hasWallet: data.connectStripe.hasWallet });
        displaySuccessNotification(
          "You've successfully connected your Stripe Account!",
          'You can now begin to create listings in the Host page.'
        );
      }
    },
  });

  const history = useHistory();
  const connectStripeRef = useRef(connectStripe);

  useEffect(() => {
    const code = history.location.search.split('code=')[1];

    if (code) {
      connectStripeRef.current({
        variables: {
          input: { code },
        },
      });
    } else {
      history.replace('/login');
    }
  }, [history]);

  if (error) {
    return <Redirect to={`/user/${viewer.id}?stripe_error=true`} />;
  }

  if (data && data.connectStripe) {
    return <Redirect to={`/user/${viewer.id}`} />;
  }

  return loading ? (
    <Content className="stripe">
      <Spin size="large" tip="Connecting your Stripe account..." />
    </Content>
  ) : null;
};
