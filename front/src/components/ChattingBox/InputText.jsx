import React from "react";
import styled from "styled-components";
import BoxComponent from "./BoxComponent";

const InputComponent = styled(BoxComponent)`
  padding: 10px 16px;
  width: 100%;
  height: 52px;
  font-size: 1em;
  line-height: 1;
  background: #fff;
  border: 1px solid #333;
  border-radius: 40px;
  box-sizing: border-box;
`;

const InputText = ({ placeholder, onChange, value, ...props }) => {
  return (
    <InputComponent
      as="input"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default InputText;
