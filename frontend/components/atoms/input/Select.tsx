import React from "react";
import { styled } from "../../../stitches.config";
import { InputFieldCore } from "./InputFieldCore";

type Props = {
  selectOptions?: {
    value: string | number;
    label: string;
  }[];
  selectValue?: any;
  onChange: Function;
  iconName: string;
  required?: boolean;
  label?: string;
  showLabel?: boolean;
};

const StyledSelectField = styled("select", {
  width: "100%",
  border: "none",
  padding: "0.5rem 0",
  borderBottom: "solid 1px transparent",

  fontWeight: "bold",
  background: "$backgroundTertiary",
  outline: "none",
  color: "$fontPrimary",
  fontSize: "1.2rem",
  lineHeight: "1.5rem",

  ["&:focus"]: {
    borderBottom: "solid 1px $colors$fontPrimary",
  },
});

const StyledOption = styled("option", {});

export const Select: React.FC<Props> = ({
  selectOptions,
  selectValue,
  onChange,
  iconName,
  required = false,
  label = "",
  showLabel = true,
}) => {

  return (
    <>
      <InputFieldCore iconName={iconName} required={required} label={label} showLabel={showLabel}>
        <StyledSelectField
          placeholder={label}
          onChange={(e) => onChange(e.target.value)}
          {...(required && { required: true })}
          value={selectValue}
        >
          {selectOptions.map((option) => (
            <StyledOption key={option.value} value={option.value}>
              {option.label}
            </StyledOption>
          ))}
        </StyledSelectField>
      </InputFieldCore>
    </>
  );
};
