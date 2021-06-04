import { useState } from 'react';

const useInput = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (e, val) => {
    setValue(val);
  };

  return [value, handleChange];
};

export default useInput;
