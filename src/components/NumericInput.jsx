import React, { useState } from "react";
import { Input } from "antd";

const NumericInput = (props) => {
  const { onChange, placeholder, defaultValue } = props;
  const [value, setValue] = useState(defaultValue);
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      setValue(inputValue);
      onChange(inputValue);
    }
  };

  return (
    <Input
      {...props}
      value={value}
      onChange={handleChange}
      //   onBlur={handleBlur}
      placeholder={placeholder}
      maxLength={7}
    />
  );
};

export default NumericInput;
