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
  color: "$fontPrimary",
  background: "transparent",
  fontSize: "1.2rem",
  lineHeight: "1.5rem",
  border: "none",
  outline: "none",
  padding: "0.5rem 0",
  minHeight: "50px",
  maxHeight: "50vh",
  borderBottom: "solid 1px transparent",
  fontWeight: "bold",
  resize: "vertical",
  ["&:focus"]: {
    borderBottom: "solid 1px $colors$fontPrimary",
  },
});

export const Select: React.FC<Props> = ({
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
