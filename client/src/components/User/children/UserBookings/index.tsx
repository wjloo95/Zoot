import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { List, Typography } from 'antd';
import { ListingCard } from '../../../../lib/components';
import { User } from '../../../../lib/graphql/queries/User/__generated__/User';

const { Paragraph, Text } = Typography;

interface IProps {
  id: string;
  limit: number;
}

export const UserBookings = ({ id, limit }: IProps) => {
  const [bookingsPage, setBookingsPage] = useState(1);

  // const userBookingsList = (
  //   <List
  //     grid={{
  //       gutter: 8,
  //       xs: 1,
  //       sm: 2,
  //       lg: 4,
  //     }}
  //     dataSource={result}
  //     locale={{ emptyText: 'This user has not made any bookings!' }}
  //     pagination={{
  //       position: 'top',
  //       current: bookingsPage,
  //       total: total ? total : undefined,
  //       defaultPageSize: limit,
  //       hideOnSinglePage: true,
  //       showLessItems: true,
  //       onChange: (page: number) => setBookingsPage(page),
  //     }}
  //     renderItem={(userBooking) => {
  //       const bookingHistory = (
  //         <div className="user-bookings__booking-history">
  //           <div>
  //             Check in: <Text strong>{userBooking.checkIn}</Text>
  //           </div>
  //           <div>
  //             Check out: <Text strong>{userBooking.checkOut}</Text>
  //           </div>
  //         </div>
  //       );

  //       return (
  //         <List.Item>
  //           {bookingHistory}
  //           <ListingCard listing={userBooking.listing} />
  //         </List.Item>
  //       );
  //     }}
  //   />
  // );

  const userBookingsElement = (
    <div className="user-bookings">
      <Paragraph className="user-bookings__description">
        This section highlights the bookings you've made, and the
        check-in/check-out dates associated with said bookings.
      </Paragraph>
      {/* {userBookingsList} */}
    </div>
  );

  return userBookingsElement;
};
