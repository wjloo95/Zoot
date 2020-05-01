import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Col, Layout, Row } from 'antd';

import { USER } from '../../lib/graphql/queries';
import {
  User as UserData,
  UserVariables,
} from '../../lib/graphql/queries/User/__generated__/User';
import { useParams } from 'react-router-dom';
import { UserProfile } from './children';

const { Content } = Layout;

export const User = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id,
    },
  });

  const user = data ? data.user : null;
  const userProfileElement = user ? <UserProfile user={user} /> : null;

  return (
    <Content className="user">
      <Row gutter={12} justify="start">
        <Col xs={24}>{userProfileElement}</Col>
      </Row>
    </Content>
  );
};
