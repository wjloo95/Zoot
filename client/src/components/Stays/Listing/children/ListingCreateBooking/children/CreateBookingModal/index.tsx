import React from 'react';
import { Modal } from 'antd';
import moment, { Moment } from 'moment';
import {
  formatPrice,
  displayErrorMessage,
  displaySuccessNotification,
} from '../../../../../../../lib/utils';
import { KeyOutlined } from '@ant-design/icons';
import {
  CardElement,
  injectStripe,
  ReactStripeElements,
} from 'react-stripe-elements';

import { CREATE_BOOKING } from '../../../../../../../lib/graphql/mutations';
import {
  CreateBooking as CreateBookingData,
  CreateBookingVariables,
} from '../../../../../../../lib/graphql/mutations/CreateBooking/__generated__/CreateBooking';
import { useMutation } from '@apollo/react-hooks';

interface IProps {
  id: string;
  price: number;
  modalVisible: boolean;
  checkInDate: Moment;
  checkOutDate: Moment;
  setModalVisible: (modalVisible: boolean) => void;
  warningMessage: string | null;
  resetBookingData: () => void;
  handleListingRefetch: () => Promise<void>;
}

export const CreateBookingModal = ({
  id,
  price,
  modalVisible,
  checkInDate,
  checkOutDate,
  setModalVisible,
  warningMessage,
  resetBookingData,
  handleListingRefetch,
  stripe,
}: IProps & ReactStripeElements.InjectedStripeProps) => {
  const [createBooking] = useMutation<
    CreateBookingData,
    CreateBookingVariables
  >(CREATE_BOOKING, {
    onCompleted: () => {
      resetBookingData();
      displaySuccessNotification(
        "You've successfully booked the listing!",
        'Booking history can always be found in your User page.'
      );
      handleListingRefetch();
    },
    onError: () => {
      displayErrorMessage(
        "Sorry! We weren't able to successfully book the listing. Please try again later!"
      );
    },
  });

  const nightsBooked = checkOutDate.diff(checkInDate, 'days') + 1;
  const listingPrice = price * nightsBooked;

  const handleCreateBooking = async () => {
    if (!stripe) {
      return displayErrorMessage("Sorry! We weren't able to connect to Stripe");
    }

    let { token: stripeToken, error } = await stripe.createToken();
    if (stripeToken) {
      createBooking({
        variables: {
          input: {
            id,
            source: stripeToken.id,
            checkIn: moment(checkInDate).format('YYYY-MM-DD'),
            checkOut: moment(checkOutDate).format('YYYY-MM-DD'),
          },
        },
      });
    } else {
      displayErrorMessage(
        error && error.message
          ? error.message
          : "Sorry! We weren't able to book the listing. Please try again later."
      );
    }
  };

  return (
    <Modal
      visible={modalVisible}
      centered
      footer={null}
      onCancel={() => setModalVisible(false)}
    >
      <div className="listing-booking-modal">
        <div className="listing-booking-modal__intro">
          <p className="listing-booking-modal__intro-title">
            <KeyOutlined />
            <br />
            Book your trip
          </p>
          <p className="listing-booking-modal__information">
            Enter your payment information to book the listing from the dates
            between{' '}
            <mark className="modal-mark">
              {moment(checkInDate).format('MMMM Do YYYY')}
            </mark>{' '}
            and{' '}
            <mark className="modal-mark">
              {moment(checkOutDate).format('MMMM Do YYYY')}
            </mark>
            , inclusive.
          </p>
        </div>

        <div className="listing-booking-modal__charge-summary">
          <p className="listing-booking-modal__information">
            {formatPrice(price)} * {nightsBooked} nights ={' '}
            {formatPrice(listingPrice)}
          </p>
          <p className="listing-booking-modal__charge-summary-total">
            Total ={' '}
            <mark className="modal-mark">{formatPrice(listingPrice)}</mark>
          </p>
        </div>

        <div className="listing-booking-modal__stripe-card-section">
          <CardElement
            hidePostalCode
            className="listing-booking-modal__stripe-card"
          />
          <button
            className="listing-cta primary-button"
            disabled={!!warningMessage}
            onClick={handleCreateBooking}
          >
            Complete your Booking
          </button>
        </div>
        <mark className="listing-mark">{warningMessage}</mark>
      </div>
    </Modal>
  );
};

export const WrappedCreateBookingModal = injectStripe(CreateBookingModal);
