import { useState } from 'react';

const useFileUpload = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (e) => {
    const file = e.target.files[0];
    try {
      setValue(file);
    } catch (err) {
      console.log(err);
    }
  };

  return [value, handleChange];
};

export default useFileUpload;
