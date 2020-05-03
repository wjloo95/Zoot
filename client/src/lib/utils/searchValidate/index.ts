export const searchValid = (value: string) => {
  const trimmedValue = value.trim();
  const onlyChars = /^[a-zA-Z]+$/;
  return trimmedValue === '' || !onlyChars.test(trimmedValue);
};
