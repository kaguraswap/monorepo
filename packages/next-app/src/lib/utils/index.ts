export const arrayify = (v?: string | string[]) => {
  if (!v) {
    return [];
  } else if (typeof v === "string") {
    return [v];
  } else {
    return v;
  }
};

export const isEmpty = (obj: object) => {
  return Object.keys(obj).length === 0;
};

export const isInIframe = () => {
  return window.location !== window.parent.location;
};
