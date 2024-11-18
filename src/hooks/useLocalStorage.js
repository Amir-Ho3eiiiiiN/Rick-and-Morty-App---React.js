import { useEffect, useState } from "react";

export default function useLocalStorage(key, initalState) {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(key)) || initalState
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
