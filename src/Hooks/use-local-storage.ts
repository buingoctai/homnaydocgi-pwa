import { useState, useEffect } from 'react';

const tryParse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};
interface Props<T> {
  key: string;
  initialValue?: T;
}
const useLocalStorage = <T>({
  key,
  initialValue,
}: Props<T>): {
  value: T | undefined;
  set: (v: T) => void;
  remove: (v: T) => void;
} => {
  const [value, setValue] = useState<T>(() => {
    try {
      const dataStr = window.localStorage.getItem(key);
      if (dataStr !== null) return tryParse(dataStr);

      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    } catch (error) {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
  });

  const set = (value: any) => {
    setValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  const remove = () => {
    setValue(undefined);
    window.localStorage.removeItem(key);
  };

  return { value, set, remove };
};

const KEYS = {
  WELCOME: 'WELCOME',
  INTRODUCTION: 'INTRODUCTION',
};

export { KEYS };
export default useLocalStorage;
