import React, { useState } from 'react';
import { Moment } from 'moment';
import { Button, Card, Divider, Typography, DatePicker } from 'antd';
import { formatPrice } from '../../../../lib/utils';
const { Paragraph, Title } = Typography;

interface IProps {
  price: number;
}

export const ListingCreateBooking = ({ price }: IProps) => {
  const [checkInDate, setCheckInDate] = useState<Moment | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Moment | null>(null);
  return (
    <div className="listing-create-booking listing-booking">
      <Card className="listing-booking__card">
        <div>
          <Paragraph>
            <Title level={2} className="listing-booking__card-title">
              {`${formatPrice(price)}`}
              <span>/day</span>
            </Title>
          </Paragraph>
          <Divider />
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check In</Paragraph>
            <DatePicker
              value={checkInDate ? checkInDate : undefined}
              onChange={(dateValue) => setCheckInDate(dateValue)}
              format={'YYYY/MM/DD'}
            />
          </div>
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check Out</Paragraph>
            <DatePicker
              value={checkOutDate ? checkOutDate : undefined}
              onChange={(dateValue) => setCheckOutDate(dateValue)}
              format={'YYYY/MM/DD'}
            />
          </div>
        </div>
        <Divider />
        <Button
          size="large"
          type="primary"
          className="listing-booking__card-cta"
        >
          Request to book!
        </Button>
      </Card>
    </div>
  );
};
