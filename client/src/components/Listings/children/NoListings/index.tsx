import React from 'react';
import { Link } from 'react-router-dom';

import { PageSkeleton } from '../../../../lib/components';

import { Typography } from 'antd';
const { Paragraph, Text } = Typography;

interface IProps {
  listingsRegion: string | null;
}

export const NoListings = ({ listingsRegion }: IProps) => {
  return listingsRegion ? (
    <div>
      <Paragraph>
        It appears that no listings have yet been created for{' '}
        <Text mark>"{listingsRegion}"</Text>
      </Paragraph>
      <Paragraph>
        Be the first person to create a{' '}
        <Link to="/host">listing in this area</Link>!
      </Paragraph>
    </div>
  ) : (
    <PageSkeleton />
  );
};
