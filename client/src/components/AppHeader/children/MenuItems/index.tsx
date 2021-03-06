import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Menu, Avatar } from 'antd';
import {
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
  TeamOutlined,
  RocketOutlined,
} from '@ant-design/icons';

import { Viewer } from '../../../../lib/types';
import { useMutation } from '@apollo/react-hooks';
import { LogOut as LogOutData } from '../../../../lib/graphql/mutations/LogOut/__generated__/LogOut';
import { LOG_OUT } from '../../../../lib/graphql/mutations';
import {
  displaySuccessNotification,
  displayErrorMessage,
} from '../../../../lib/utils';
import placeholder from '../../../../lib/assets/UserPlaceholder.png';

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

  const history = useHistory();
  const { location } = history;
  const splitPath = location.pathname.split('/');
  const isLanding = splitPath.length <= 2;

  const subMenuLogin = viewer.id ? (
    <SubMenu title={<Avatar size="large" src={viewer.avatar || placeholder} />}>
      <Item key={`/user/${viewer.id}`}>
        <Link to={`/user/${viewer.id}`}>
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

  const subMenuResponsive = viewer.id ? (
    <SubMenu title={<Avatar size="large" src={viewer.avatar || placeholder} />}>
      <Item key={`/user/${viewer.id}`}>
        <Link to={`/user/${viewer.id}`}>
          <UserOutlined />
          Profile
        </Link>
      </Item>
      <Item key="/flights">
        <Link to="/flights">
          <RocketOutlined />
          Flights
        </Link>
      </Item>
      <Item key="/listings">
        <Link to="/listings">
          <HomeOutlined />
          Stays
        </Link>
      </Item>
      <Item key="/experiences">
        <Link to="/experiences">
          <TeamOutlined />
          Experiences
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
    <>
      <Menu mode="horizontal" selectable={false} className="menu">
        {isLanding ? null : (
          <Item key="/flights">
            <Link to="/flights">
              <RocketOutlined />
              Flights
            </Link>
          </Item>
        )}
        {isLanding ? null : (
          <Item key="/listings">
            <Link to="/listings">
              <HomeOutlined />
              Stays
            </Link>
          </Item>
        )}
        {isLanding ? null : (
          <Item key="/experiences">
            <Link to="/experiences">
              <TeamOutlined />
              Experiences
            </Link>
          </Item>
        )}
        {subMenuLogin}
      </Menu>
      <Menu mode="horizontal" selectable={false} className="menu-responsive">
        {subMenuResponsive}
      </Menu>
    </>
  );
};
