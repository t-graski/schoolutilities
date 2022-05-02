import React from "react";
import { styled } from "../../../stitches.config";
import type * as Stitches from "@stitches/react";
import { SvgIcon } from "../SvgIcon";

type Props = {
  inputType: "text" | "date" | "email" | "number" | "datetime-local";
  value?: string;
  onChange: Function;
  iconName: string;
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
};

const StyledInputField = styled("input", {
  display: "inline-block",
  width: "100%",
  border: "none",
  padding: "0.5rem 0",
  borderBottom: "solid 1px transparent",

  fontFamily: "$fontPrimary",
  fontWeight: "bold",
  background: "$backgroundTertiary",
  outline: "none",
  fontSize: "1.2rem",
  lineHeight: "1.5rem",
  color: "$fontPrimary",

  ["&:focus"]: {
    borderBottom: "solid 1px $colors$fontPrimary",
  },

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

const InputFieldLayout = styled("div", {
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: "15px",
  border: "none",
  padding: "10.3px 20px",
  gap: "20px",

  background: "$backgroundTertiary",

  variants: {
    editable: {
      true: {},
      false: {
        border: "none",
        
        background: "transparent",
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

const ImageLayout = styled("div", {
  display: "flex",
  width: "30px",
  height: "30px",

  color: "$fontPrimary",

  variants: {
    cursor: {
      pointer: {
        cursor: "pointer",
      },
    },
  },
});

const InputFieldLabel = styled("div", {});

const Required = styled("div", {
  display: "inline-block",
});

export const InputField: React.FC<Props> = ({
  inputType,
  value,
  onChange,
  iconName,
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
      {label && showLabel && (
        <>
          <InputFieldLabel>
            {label} {required && <Required>*</Required>}
          </InputFieldLabel>
        </>
      )}
      <InputFieldLayout editable={editable}>
        {iconName && (
          <ImageLayout>
            <SvgIcon iconName={iconName} />
          </ImageLayout>
        )}
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
      </InputFieldLayout>
      {errorMessage && isInputValid === false && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </>
  );
};
