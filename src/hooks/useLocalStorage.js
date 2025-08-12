import { useState, useEffect, useCallback } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Remove item from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes to localStorage from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
};

// Hook for managing multiple localStorage values
export const useMultiLocalStorage = (keys) => {
  const [values, setValues] = useState({});
  const [setters, setSetters] = useState({});

  useEffect(() => {
    const initialValues = {};
    const initialSetters = {};

    keys.forEach(key => {
      const [value, setValue, removeValue] = useLocalStorage(key, null);
      initialValues[key] = value;
      initialSetters[key] = { setValue, removeValue };
    });

    setValues(initialValues);
    setSetters(initialSetters);
  }, [keys]);

  const setValue = useCallback((key, value) => {
    if (setters[key]) {
      setters[key].setValue(value);
      setValues(prev => ({ ...prev, [key]: value }));
    }
  }, [setters]);

  const removeValue = useCallback((key) => {
    if (setters[key]) {
      setters[key].removeValue();
      setValues(prev => ({ ...prev, [key]: null }));
    }
  }, [setters]);

  const clearAll = useCallback(() => {
    keys.forEach(key => {
      if (setters[key]) {
        setters[key].removeValue();
      }
    });
    setValues({});
  }, [keys, setters]);

  return {
    values,
    setValue,
    removeValue,
    clearAll,
  };
};
