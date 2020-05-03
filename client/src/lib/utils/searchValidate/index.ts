export const searchValid = (value: string) => {
  const trimmedValue = value.trim();
  const onlyChars = /^[a-zA-Z]+$/;
  //  !onlyChars.test(trimmedValue);
  return trimmedValue === '';
};
