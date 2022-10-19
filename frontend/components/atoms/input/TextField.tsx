import React from "react";
import { styled } from "../../../stitches.config";
import { InputFieldCore } from "./InputFieldCore";

type Props = {
  value?: string;
  onChange: Function;
  icon?: any;
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
  maxHeight: "30vh",
  borderBottom: "solid 1px transparent",

  color: "$neutral-500",
  resize: "vertical",
  fontWeight: "bold",
  outline: "none",
  fontSize: "1.2rem",
  lineHeight: "1.5rem",

  ["&:focus"]: {
    borderBottom: "solid 1px $colors$neutral-500",
  },
});

export const TextField: React.FC<Props> = ({
  value,
  onChange,
  icon,
  required = false,
  label = "",
  showLabel = true,
}) => {
  return (
    <>
      <InputFieldCore
        icon={icon}
        required={required}
        label={label}
        showLabel={showLabel}
      >
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
