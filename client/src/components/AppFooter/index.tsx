import React from 'react';
import { Layout } from 'antd';
import { GithubFilled, LinkedinFilled, MailTwoTone } from '@ant-design/icons';

const { Footer } = Layout;

export const AppFooter = () => {
  return (
    <Footer className="app-footer">
      <div className="app-footer-icons">
        <GithubFilled style={{ color: 'black' }} />
        <LinkedinFilled style={{ color: '#2867B2' }} />
        <MailTwoTone twoToneColor="#B23121" />
      </div>
      <div className="app-footer-text">
        Zoot Travel © 2020 Created by Will Loo
      </div>
    </Footer>
  );
};
