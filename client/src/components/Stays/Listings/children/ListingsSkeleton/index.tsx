import React from 'react';
import { Card, List, Skeleton } from 'antd';

import listingLoadingCardCover from '../../../StaysHome/assets/listing-loading-card-cover.jpg';

export const ListingsSkeleton = () => {
  const emptyData = [{}, {}, {}];

  return (
    <div className="listings">
      <div className="listings-section">
        <Skeleton paragraph={{ rows: 1 }} />
        <List
          grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            lg: 4,
          }}
          dataSource={emptyData}
          renderItem={() => (
            <List.Item>
              <Card
                cover={
                  <div
                    style={{
                      backgroundImage: `url(${listingLoadingCardCover})`,
                    }}
                    className="listings-skeleton__card-cover-img"
                  ></div>
                }
                loading
                className="listings-skeleton__card"
              />
            </List.Item>
          )}
        />
        <List
          grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            lg: 4,
          }}
          dataSource={emptyData}
          renderItem={() => (
            <List.Item>
              <Card
                cover={
                  <div
                    style={{
                      backgroundImage: `url(${listingLoadingCardCover})`,
                    }}
                    className="listings-skeleton__card-cover-img"
                  ></div>
                }
                loading
                className="listings-skeleton__card"
              />
            </List.Item>
          )}
        />
      </div>
      <div
        style={{
          backgroundImage: `url(${listingLoadingCardCover})`,
          width: '70%',
          marginLeft: '20px',
        }}
        className="listings-skeleton__card-cover-img"
      ></div>
    </div>
  );
};
