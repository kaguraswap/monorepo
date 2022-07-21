export const isServerSide = () => {
  return typeof window !== "undefined";
};
