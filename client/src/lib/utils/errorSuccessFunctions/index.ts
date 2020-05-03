import { message, notification } from 'antd';

export const displaySuccessNotification = (
  message: string,
  description?: string
) => {
  return notification['success']({
    message,
    description,
    placement: 'topLeft',
    style: {
      marginTop: 50,
    },
  });
};

export const displayErrorMessage = (error: string) => {
  return message.error(error, 1);
};

export const displayWarningMessage = (warning: string) => {
  return message.warning(warning, 1);
};
