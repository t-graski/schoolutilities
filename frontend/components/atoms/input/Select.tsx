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
  theme?: "surface" | "surfaceVariant";
};

const StyledSelectField = styled("select", {
  width: "100%",
  border: "none",
  padding: "0.5rem 0",
  borderBottom: "solid 1px transparent",

  fontWeight: "bold",
  outline: "none",
  color: "$neutral-500",
  fontSize: "1.2rem",
  lineHeight: "1.5rem",

  ["&:focus"]: {
    borderBottom: "solid 1px $colors$neutral-500",
  },

  variants: {
    theme: {
      surface: {
        background: "$surface",
      },
      surfaceVariant: {
        background: "$surfaceVariant",
      },
    }
  }
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
  theme = "surfaceVariant",
}) => {
  return (
    <>
      <InputFieldCore
        icon={icon}
        required={required}
        label={label}
        showLabel={showLabel}
        theme={theme}
      >
        <StyledSelectField
          placeholder={label}
          onChange={(e) => onChange(e.target.value)}
          {...(required && { required: true })}
          value={selectValue}
          theme={theme}
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
