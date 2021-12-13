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
  regex?: RegExp;
  setValidInput?: Function;
  errorMessage?: string;
  min?: string;
  max?: string;
};

const StyledInputField = styled("input", {
  background: "$backgroundTertiary",
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
  regex,
  setValidInput,
  errorMessage = "",
  min,
  max,
}) => {
  if (inputType === "checkbox") {
    return (
      <>
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
            readOnly={!editable}
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
        <InputFieldLayout>
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
              readOnly={!editable}
              onChange={(e) => {
                let inputValueValid = regex && regex.test(e.target.value);
                if (setValidInput) {
                  setValidInput(inputValueValid);
                }
                if (isInputValid == null && !inputValueValid) {
                  setTimeout(() => {
                    if (regex && !regex.test(e.target.value)) {
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
