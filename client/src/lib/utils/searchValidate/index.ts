export const searchValid = (value: string) => {
  const trimmedValue = value.trim();
  const onlyChars = /^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/;
  return trimmedValue === '' || !onlyChars.test(trimmedValue);
};
