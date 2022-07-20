export const shortenAddress = (str?: string) => {
  if (!str) {
    return "";
  }
  return `${str.substring(0, 6)}...${str.substring(str.length - 4)}`;
};
