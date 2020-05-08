import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Empty, Layout, Typography } from 'antd';

const { Content } = Layout;
const { Text } = Typography;

export const ComingSoon = () => {
  return (
    <Content className="not-found">
      <Empty
        description={
          <Fragment>
            <Text className="not-found__description-title">Coming Soon!</Text>
            <Text className="not-found__description-subtitle">
              The team is in the process of putting this feature together.
              Please come back later once we have completed development!
            </Text>
          </Fragment>
        }
      />
      <Link
        to="/"
        className="not-found__cta ant-btn ant-btn-primary ant-btn-lg"
      >
        Go to Home
      </Link>
    </Content>
  );
};
