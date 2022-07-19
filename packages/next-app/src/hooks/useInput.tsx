import React from "react";

export const useInput = <T,>(initialValue: T) => {
  const [value, setValue] = React.useState<T>(initialValue);

  const handleInput = (e: any) => {
    if (typeof e !== "object") {
      setValue(e as any);
    } else {
      setValue(e.target.value);
    }
  };

  return { value, handleInput };
};
