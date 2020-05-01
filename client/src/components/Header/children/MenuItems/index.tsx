import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, Avatar } from 'antd';
import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';

import { Viewer } from '../../../../lib/types';
import { useMutation } from '@apollo/react-hooks';
import { LogOut as LogOutData } from '../../../../lib/graphql/mutations/LogOut/__generated__/LogOut';
import { LOG_OUT } from '../../../../lib/graphql/mutations/LogOut';
import {
  displaySuccessNotification,
  displayErrorMessage,
} from '../../../../lib/utils';

const { Item, SubMenu } = Menu;

interface IProps {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const MenuItems = ({ viewer, setViewer }: IProps) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: (data) => {
      if (data && data.logOut) {
        setViewer(data.logOut);
        sessionStorage.removeItem('token');
        displaySuccessNotification('You have successfully logged out!');
      }
    },
    onError: () => {
      displayErrorMessage(
        'Sorry! We were not able to log you out. Please try again later!'
      );
    },
  });

  const handleLogOut = () => {
    logOut();
  };

  const subMenuLogin =
    viewer.id && viewer.avatar ? (
      <SubMenu title={`${viewer.name}`} icon={<Avatar src={viewer.avatar} />}>
        <Item key={`/user/${viewer.id}`}>
          <Link to={`/useru/${viewer.id}`}>
            <UserOutlined />
            Profile
          </Link>
        </Item>
        <Item key="/logout" onClick={handleLogOut}>
          <LogoutOutlined />
          Log out
        </Item>
      </SubMenu>
    ) : (
      <Item>
        <Link to="/login">
          <Button type="primary">Sign In</Button>
        </Link>
      </Item>
    );

  return (
    <Menu mode="horizontal" selectable={false} className="menu">
      <Item key="/host">
        <Link to="/host">
          <HomeOutlined />
          Host
        </Link>
      </Item>
      {subMenuLogin}
    </Menu>
  );
};
