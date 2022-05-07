import React from "react";
import { styled } from "../../../stitches.config";
import { InputFieldCore } from "./InputFieldCore";

type Props = {
  value?: string;
  onChange: Function;
  iconName: string;
  required?: boolean;
  label?: string;
  showLabel?: boolean;
};

const StyledTextArea = styled("textarea", {
  width: "100%",
  
  background: "transparent",
  border: "none",
  padding: "0.5rem 0",
  minHeight: "50px",
  maxHeight: "50vh",
  borderBottom: "solid 1px transparent",

  color: "$fontPrimary",
  resize: "vertical",
  fontWeight: "bold",
  outline: "none",
  fontSize: "1.2rem",
  lineHeight: "1.5rem",
  
  ["&:focus"]: {
    borderBottom: "solid 1px $colors$fontPrimary",
  },
});

export const TextField: React.FC<Props> = ({
  value,
  onChange,
  iconName,
  required = false,
  label = "",
  showLabel = true,
}) => {

  return (
    <>
      <InputFieldCore iconName={iconName} required={required} label={label} showLabel={showLabel}>
          <StyledTextArea
            placeholder={label}
            onChange={(e) => onChange(e.target.value)}
            {...(required && { required: true })}
            value={value}
          ></StyledTextArea>
      </InputFieldCore>
    </>
  );
};
