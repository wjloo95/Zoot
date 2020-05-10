import React from 'react';
import { GithubFilled, LinkedinFilled, MailTwoTone } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

export const AppFooter = () => {
  const history = useHistory();
  const { location } = history;

  if (location.pathname === '/') {
    return null;
  }
  return (
    <div className="app-footer">
      <div className="app-footer-icons">
        <a
          href="https://github.com/wjloo95"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubFilled style={{ color: 'black' }} />
        </a>
        <a
          href="https://www.linkedin.com/in/william-loo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinFilled style={{ color: '#2867B2' }} />
        </a>
        <a href="mailto:loo.williamj@gmail.com">
          <MailTwoTone twoToneColor="#B23121" />
        </a>
      </div>
      <div className="app-footer-text">
        Zoot Travel © 2020 Created by Will Loo
      </div>
    </div>
  );
};
