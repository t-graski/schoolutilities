import React from "react";
import { styled } from "../../../stitches.config";
import type * as Stitches from "@stitches/react";
import { InputFieldCore } from "./InputFieldCore";
import { PasswordStrengthPopOver } from "./PasswordStrengthPopOver";
import SvgEyeRestricted from "../svg/SvgEyeRestricted";
import SvgEye from "../svg/SvgEye";

type Props = {
  value?: string;
  onChange: Function;
  icon?: any;
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
  showPasswordStrength?: boolean;
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

export const PasswordInput: React.FC<Props> = ({
  value,
  onChange,
  icon,
  editable = true,
  required = false,
  label = "",
  showLabel = true,
  size = "normal",
  setValidInput,
  errorMessage = "",
  validationOptions,
  showPasswordStrength = true,
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
        icon={icon}
        required={required}
        label={label}
        showLabel={showLabel}
      >
        <StyledLabel>
          <StyledInputField
            type={showPassword ? "text" : "password"}
            value={value}
            name={label}
            placeholder={label}
            editable={editable}
            readOnly={!editable}
            size={size}
            onChange={(e) => {
              onChange(e.target.value);
              if (setValidInput) {
                setValidInput(true);
              }
              if (validationOptions) {
                const validationResults = validationOptions.map((option) => {
                  const { regex, validIconName, invalidIconName } = option;
                  const isValid = regex.test(e.target.value);
                  if (setValidInput && !isValid) {
                    setValidInput(false);
                  }
                  return { ...option, valid: isValid };
                });
                setCurrentValidationResults(validationResults);
              }
            }}
            onBlur={(e) => {
              if (validationOptions) {
                const validationResults = validationOptions.map((option) => {
                  const { regex, validIconName, invalidIconName } = option;
                  const isValid = regex.test(e.target.value);
                  return { ...option, valid: isValid };
                });
                setCurrentValidationResults(validationResults);
              }
            }}
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
            <SvgEyeRestricted />
          </ImageLayout>
        )}
        {showPassword && (
          <ImageLayout
            cursor="pointer"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            <SvgEye />
          </ImageLayout>
        )}
        {validationOptions && showPasswordStrength && (
          <PasswordStrengthPopOver password={value} setValidInput={setValidInput} validationOptions={validationOptions}></PasswordStrengthPopOver>
        )}
      </InputFieldCore>
      {errorMessage && isInputValid === false && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </>
  );
};
