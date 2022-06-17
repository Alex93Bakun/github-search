import { useEffect, useState } from "react";

import { DEBOUNCE_DELAY } from "../Constants/Constants";

export const useDebounce = (value: string, wait = DEBOUNCE_DELAY) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, wait);
    return () => clearTimeout(timer); // cleanup when unmounted
  }, [value, wait]);

  return debounceValue;
};
