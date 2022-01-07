import React from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";
import { SvgIcon } from "./SvgIcon";

type Props = {
  inputType: "text" | "password" | "date" | "email" | "checkbox" | "select";
  selectOptions?: {
    value: string;
    label: string;
  }[];
  selectValue?: string;
  value?: string;
  onChange: Function;
  iconName: string;
  editable?: boolean;
  required?: boolean;
  label?: string;
  validatorFunction?: Function;
  validatorParams?: [any?];
  setValidInput?: Function;
  errorMessage?: string;
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
  },
});

const InputFieldLayout = styled("div", {
  display: "flex",
  alignItems: "center",
  background: "$backgroundTertiary",
  width: "100%",
  borderRadius: "20px",
  border: "none",
  padding: "15px 20px",
  gap: "20px",

  variants: {
    editable: {
      true: {},
      false: {
        background: "transparent",
        border: "none",
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

const StyledImage = styled(Image, {
  filter: "invert(100%)",
});

const StyledSelectField = styled("select", {
  background: "$backgroundTertiary",
  width: "100%",
  color: "$fontPrimary",
  fontSize: "1.2rem",
  lineHeight: "1.5rem",
  border: "none",
  outline: "none",
  padding: "0.5rem 0",
  borderBottom: "solid 1px transparent",
  fontWeight: "bold",
  ["&:focus"]: {
    borderBottom: "solid 1px $colors$fontPrimary",
  },
});

const ImageLayout = styled("div", {
  display: "flex",
  width: "30px",
  height: "30px",
  color: "$fontPrimary",
});

const StyledOption = styled("option", {});

const FieldLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

export const InputField: React.FC<Props> = ({
  inputType,
  selectOptions,
  selectValue,
  value,
  onChange,
  children,
  iconName,
  editable = true,
  required = false,
  label = "",
  validatorFunction,
  validatorParams,
  setValidInput,
  errorMessage = "",
  min,
  max,
}) => {
  if (inputType === "checkbox") {
    return (
      <>
        <FieldLayout>
          <StyledInputField
            type={inputType}
            name={label}
            placeholder={label}
            onChange={(e) => onChange(e.target.checked)}
            inputType={inputType}
            {...(required && { required: true })}
            readOnly={!editable}
          />
          <span>{children}</span>
        </FieldLayout>
      </>
    );
  } else if (inputType === "select") {
    return (
      <>
        <InputFieldLayout>
          {iconName && (
            <ImageLayout>
              <SvgIcon iconName={iconName} />
            </ImageLayout>
          )}
          <StyledSelectField
            name={label}
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
        </InputFieldLayout>
      </>
    );
  } else {
    const [isInputValid, setIsInputValid] = React.useState(null);
    return (
      <>
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
              onChange={(e) => {
                let inputValueValid =
                  validatorFunction &&
                  validatorFunction(e.target.value, ...validatorParams);
                if (setValidInput) {
                  setValidInput(inputValueValid);
                }
                if (isInputValid == null && !inputValueValid) {
                  setTimeout(() => {
                    if (
                      validatorFunction &&
                      validatorFunction(e.target.value, ...validatorParams)
                    ) {
                      setIsInputValid(false);
                    }
                  }, 2000);
                } else {
                  setIsInputValid(inputValueValid);
                }
                onChange(e.target.value);
              }}
              inputType={inputType}
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
  }
};
