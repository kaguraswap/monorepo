import React from "react";

export const useInput = <T,>(initialValue: T) => {
  const [value, setValue] = React.useState<T>(initialValue);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInput = (e: any) => {
    if (typeof e !== "object") {
      setValue(e);
    } else {
      setValue(e.target.value);
    }
  };

  return { value, handleInput };
};
