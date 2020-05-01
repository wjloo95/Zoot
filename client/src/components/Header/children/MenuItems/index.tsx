import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, Avatar } from 'antd';
import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Viewer } from '../../../../lib/types';

const { Item, SubMenu } = Menu;

interface IProps {
  viewer: Viewer;
}

export const MenuItems = ({ viewer }: IProps) => {
  const subMenuLogin =
    viewer.id && viewer.avatar ? (
      <SubMenu title={<Avatar src={viewer.avatar} />}>
        <Item key="/user">
          <UserOutlined />
          Profile
        </Item>
        <Item key="/logout">
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
