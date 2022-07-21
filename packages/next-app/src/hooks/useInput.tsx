import React from "react";

export const useInput = <T,>(initialValue: T) => {
  const [value, setValue] = React.useState<T>(initialValue);

  const handleInput = (e: T) => {
    if (typeof e !== "object") {
      setValue(e);
    } else {
      const event = e as unknown as React.ChangeEvent<HTMLInputElement>;
      setValue(event.target.value as unknown as T);
    }
  };

  return { value, handleInput };
};
