import React from "react";
import "../page/styles.css";
function InputBox({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default InputBox;
