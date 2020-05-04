import { displayErrorMessage } from '../errorSuccessFunctions';

export const validateImage = (file: File) => {
  const isValidImage = file.type === 'image/jpeg' || file.type === 'image/png';
  const isValidSize = file.size / 1024 / 1024 < 1;

  if (!isValidImage) {
    displayErrorMessage("You're only able to upload valid JPG or PNG files!");
    return false;
  }

  if (!isValidSize) {
    displayErrorMessage(
      "You're only able to upload valid image files of under 1MB in size!"
    );
    return false;
  }

  return isValidImage && isValidSize;
};

export const getBase64Value = (
  img: File | Blob,
  callback: (imageBase64Value: string) => void
) => {
  const reader = new FileReader();
  reader.readAsDataURL(img);
  reader.onload = () => {
    callback(reader.result as string);
  };
};
