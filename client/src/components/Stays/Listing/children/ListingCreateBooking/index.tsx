import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import { DatePicker } from 'antd';
import { formatPrice, displayErrorMessage } from '../../../../../lib/utils';
import { Viewer } from '../../../../../lib/types';
import { Listing as ListingData } from '../../../../../lib/graphql/queries/Listing/__generated__/Listing';
import { BookingsIndex } from './types';
import {
  WrappedCreateBookingModal as CreateBookingModal,
  FavoriteToggle,
} from './children';

interface IProps {
  id: string;
  price: number;
  minimum: number;
  viewer: Viewer;
  host: ListingData['listing']['host'];
  bookingsIndex: ListingData['listing']['bookingsIndex'];
  handleListingRefetch: () => Promise<void>;
}

export const ListingCreateBooking = ({
  id,
  price,
  minimum,
  viewer,
  host,
  bookingsIndex,
  handleListingRefetch,
}: IProps) => {
  const [checkInDate, setCheckInDate] = useState<Moment | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Moment | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const resetBookingData = () => {
    setModalVisible(false);
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  const bookingsIndexJSON: BookingsIndex = JSON.parse(bookingsIndex);

  const dateIsBooked = (currentDate: Moment) => {
    const year = moment(currentDate).year();
    const month = moment(currentDate).month();
    const day = moment(currentDate).date();

    if (bookingsIndexJSON[year] && bookingsIndexJSON[year][month]) {
      return Boolean(bookingsIndexJSON[year][month][day]);
    } else {
      return false;
    }
  };

  const disabledDate = (currentDate?: Moment) => {
    if (currentDate) {
      const dateIsBeforeEndOfDay = currentDate.isBefore(moment().endOf('day'));

      return dateIsBeforeEndOfDay || dateIsBooked(currentDate);
    } else {
      return false;
    }
  };

  const disabledCheckoutDate = (currentDate?: Moment) => {
    const checkInCopy = checkInDate ? moment(checkInDate) : null;
    if (currentDate) {
      const dateIsBeforeEndOfDay = checkInDate
        ? currentDate.isBefore(checkInDate)
        : false;

      const dateIsBeforeMinimum =
        checkInDate && checkInCopy
          ? currentDate.isBefore(checkInCopy.add(minimum, 'd'))
          : false;

      return dateIsBeforeEndOfDay || dateIsBeforeMinimum;
    } else {
      return false;
    }
  };

  const verifyAndSetCheckOutDate = (selectedCheckOutDate: Moment | null) => {
    if (checkInDate && selectedCheckOutDate) {
      if (moment(selectedCheckOutDate).isBefore(checkInDate, 'days')) {
        return displayErrorMessage(
          `You can't book date of check out to be prior to check in!`
        );
      }

      let dateCursor = checkInDate;

      while (moment(dateCursor).isBefore(selectedCheckOutDate, 'days')) {
        dateCursor = moment(dateCursor).add(1, 'days');

        const year = moment(dateCursor).year();
        const month = moment(dateCursor).month();
        const day = moment(dateCursor).date();

        if (
          bookingsIndexJSON[year] &&
          bookingsIndexJSON[year][month] &&
          bookingsIndexJSON[year][month][day]
        ) {
          return displayErrorMessage(
            "You can't book a period of time that overlaps existing bookings. Please try again!"
          );
        }
      }
    }

    setCheckOutDate(selectedCheckOutDate);
  };

  const checkOutInputDisabled = !checkInDate;
  const buttonDisabled = !checkInDate || !checkOutDate;
  const isHost = viewer.id === host.id;
  let warningMessage = null;
  if (!viewer.id) {
    warningMessage = 'You have to be signed in to book a listing!';
  } else if (isHost) {
    warningMessage = "You can't book your own listing!";
  } else if (!host.hasWallet) {
    warningMessage =
      "The host has disconnected from Stripe and thus won't be able to receive payments.";
  }
  const listingCreateBookingModalElement =
    price && checkInDate && checkOutDate ? (
      <CreateBookingModal
        id={id}
        price={price}
        modalVisible={modalVisible}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        setModalVisible={setModalVisible}
        warningMessage={warningMessage}
        resetBookingData={resetBookingData}
        handleListingRefetch={handleListingRefetch}
      />
    ) : null;

  let checkPriceMessage = "You won't be charged yet";

  return (
    <div className="listing-section listing-booking">
      <div className="listing-booking__card">
        <FavoriteToggle viewer={viewer} />
        <div>
          <h2 className="listing-booking__card-title">
            {`${formatPrice(price)}`}
            <span>/day</span>
          </h2>
          <div className="listing-booking__card-date-picker">
            <strong>Check In</strong>
            <DatePicker
              value={checkInDate ? checkInDate : undefined}
              format={'YYYY/MM/DD'}
              showToday={false}
              disabledDate={disabledDate}
              onChange={(dateValue) => setCheckInDate(dateValue)}
              onOpenChange={() => setCheckOutDate(null)}
            />
          </div>
          <div
            className="listing-booking__card-date-picker"
            style={{
              borderBottom: '1px solid var(--dark-font-secondary-color)',
              marginBottom: '20px',
            }}
          >
            <strong>Check Out</strong>
            <DatePicker
              value={checkOutDate ? checkOutDate : undefined}
              format={'YYYY/MM/DD'}
              showToday={false}
              disabled={checkOutInputDisabled}
              disabledDate={disabledCheckoutDate}
              onChange={(dateValue) => verifyAndSetCheckOutDate(dateValue)}
              renderExtraFooter={() => {
                return (
                  <div>
                    <span className="ant-calendar-footer-text">
                      Your stay must be a minimum of {minimum} nights.
                    </span>
                  </div>
                );
              }}
            />
          </div>
        </div>
        <button
          className="listing-cta primary-button"
          disabled={buttonDisabled}
          onClick={() => setModalVisible(true)}
        >
          Check Price!
        </button>
        <mark className="listing-mark">{checkPriceMessage}</mark>
      </div>
      {listingCreateBookingModalElement}
    </div>
  );
};
