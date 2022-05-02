import React from "react";
import { styled } from "../../../stitches.config";
import type * as Stitches from "@stitches/react";
import { SvgIcon } from "../SvgIcon";
import { InputFieldCore } from "./InputFieldCore";
import { PasswordStrengthPopOver } from "./PasswordStrengthPopOver";

type Props = {
  value?: string;
  onChange: Function;
  iconName: string;
  editable?: boolean;
  required?: boolean;
  label?: string;
  showLabel?: boolean;
  size?: Stitches.VariantProps<typeof StyledInputField>["size"];
  setValidInput?: Function;
  errorMessage?: string;
  validationOptions?: {
    regex: RegExp;
    errorMessage: string;
    validIconName: string;
    invalidIconName: string;
  }[];
  min?: string;
  max?: string;
};

const StyledInputField = styled("input", {
  background: "$backgroundTertiary",
  display: "inline-block",
  width: "100%",
  color: "$fontPrimary",
  fontSize: "1.2rem",
  lineHeight: "1.5rem",
  border: "none",
  outline: "none",
  padding: "0.5rem 0",
  borderBottom: "solid 1px transparent",
  fontFamily: "$fontPrimary",
  fontWeight: "bold",
  ["&:focus"]: {
    borderBottom: "solid 1px $colors$fontPrimary",
  },
  variants: {
    inputType: {
      text: {},
      password: {},
      date: {},
      email: {},
      checkbox: {
        width: "fit-content",
        margin: "0 20px 0 0",
      },
      select: {},
      "search-select": {},
      textfield: {},
      number: {},
      "datetime-local": {},
    },
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
  color: "red",
  paddingLeft: "10px",
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

export const InputField: React.FC<Props> = ({
  value,
  onChange,
  iconName,
  editable = true,
  required = false,
  label = "",
  showLabel = true,
  size = "normal",
  setValidInput,
  errorMessage = "",
  validationOptions,
  min,
  max,
}) => {
  const [isInputValid, setIsInputValid] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [currentValidationResults, setCurrentValidationResults] =
    React.useState([]);

  if (validationOptions && currentValidationResults.length === 0) {
    setCurrentValidationResults(
      validationOptions.map((option) => {
        return { ...option, valid: false };
      })
    );
  }

  return (
    <>
      <InputFieldCore
        iconName={iconName}
        required={required}
        label={label}
        showLabel={showLabel}
      >
        <StyledLabel>
          <StyledInputField
            type={"password"}
            value={value}
            name={label}
            placeholder={label}
            editable={editable}
            readOnly={!editable}
            size={size}
            onChange={onChange}
            inputType={"password"}
            {...(required && { required: true })}
            {...(min && { min })}
            {...(max && { max })}
          />
        </StyledLabel>

        {!showPassword && (
          <ImageLayout
            cursor="pointer"
            onClick={() => {
              setShowPassword(true);
            }}
          >
            <SvgIcon iconName="SvgEyeRestricted" />
          </ImageLayout>
        )}
        {showPassword && (
          <ImageLayout
            cursor="pointer"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            <SvgIcon iconName="SvgEye" />
          </ImageLayout>
        )}
        {validationOptions && (
          <PasswordStrengthPopOver password={value} setValidInput={setValidInput} validationOptions={validationOptions}></PasswordStrengthPopOver>
        )}
      </InputFieldCore>
      {errorMessage && isInputValid === false && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </>
  );
};
