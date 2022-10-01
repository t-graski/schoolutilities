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
  icon?: any;
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
  background: "$neutral-300",
  outline: "none",
  color: "$neutral-500",
  fontSize: "1.2rem",
  lineHeight: "1.5rem",

  ["&:focus"]: {
    borderBottom: "solid 1px $colors$neutral-500",
  },
});

const StyledOption = styled("option", {});

export const Select: React.FC<Props> = ({
  selectOptions,
  selectValue,
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
