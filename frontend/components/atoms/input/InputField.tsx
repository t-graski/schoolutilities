import React from "react";
import { styled } from "../../../stitches.config";
import type * as Stitches from "@stitches/react";
import { InputFieldCore } from "./InputFieldCore";

type Props = {
  inputType: "text" | "date" | "email" | "number" | "datetime-local" | "time";
  value?: string;
  onChange: Function;
  icon?: any;
  editable?: boolean;
  required?: boolean;
  label?: string;
  showLabel?: boolean;
  size?: Stitches.VariantProps<typeof StyledInputField>["size"];
  regex?: RegExp;
  setValidInput?: Function;
  errorMessage?: string;
  min?: string;
  max?: string;
  theme?: "surface" | "surfaceVariant";
};

const StyledInputField = styled("input", {
  display: "inline-block",
  width: "100%",
  border: "none",
  padding: "0.5rem 0",
  borderBottom: "solid 1px transparent",

  fontFamily: "$neutral-500",
  fontWeight: "bold",
  outline: "none",
  fontSize: "1.2rem",
  lineHeight: "1.5rem",
  color: "$onSurfaceVariant",
  backgroundColor: "transparent",

  variants: {
    editable: {
      true: {},
      false: {
        background: "transparent",
        border: "none",
        ["&:focus"]: {
          borderBottom: "none",
        },
      },
    },
    size: {
      big: {
        fontSize: "1.5rem",
      },
      normal: {
        fontSize: "1.2rem",
      },
      small: {
        fontSize: "1rem",
        padding: "0",
        lineHeight: "1.2rem",
      },
    },
  },
});

const StyledLabel = styled("label", {
  height: "fit-content",
  width: "100%",
});

const ErrorMessage = styled("span", {
  paddingLeft: "10px",

  color: "red",
});

export const InputField: React.FC<Props> = ({
  inputType,
  value,
  onChange,
  icon,
  editable = true,
  required = false,
  label = "",
  showLabel = true,
  size = "normal",
  regex,
  setValidInput,
  errorMessage = "",
  min,
  max,
  theme,
}) => {
  const [isInputValid, setIsInputValid] = React.useState(null);

  function updateValidation(event) {
    if (regex) {
      let inputValueValid = regex.test(event.target.value);
      if (setValidInput) {
        setValidInput(inputValueValid);
      }
      if (isInputValid == null && !inputValueValid) {
        if (regex.test(event.target.value)) {
          setIsInputValid(false);
        }
      } else {
        setIsInputValid(inputValueValid);
      }
    }
    onChange(event.target.value);
  }

  return (
    <>
      <InputFieldCore
        icon={icon}
        required={required}
        label={label}
        showLabel={showLabel}
        theme={theme}
      >
        <StyledLabel>
          <StyledInputField
            type={inputType}
            value={value}
            name={label}
            placeholder={label}
            editable={editable}
            readOnly={!editable}
            size={size}
            onChange={updateValidation}
            {...(required && { required: true })}
            {...(min && { min })}
            {...(max && { max })}
          />
        </StyledLabel>
      </InputFieldCore>
      {errorMessage && isInputValid === false && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </>
  );
};
