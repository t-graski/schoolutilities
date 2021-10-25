import React from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";

type Props = {
  inputType: "text" | "password" | "date" | "email" | "checkbox";
  value?: string;
  onChange: Function;
  iconSrc: string;
  iconAlt: string;
  required?: boolean;
  label?: string;
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
  marginLeft: "20px",
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
});

const StyledLabel = styled("label", {
  height: "fit-content",
});

export const InputField: React.FC<Props> = ({
  inputType,
  value,
  onChange,
  children,
  iconSrc,
  iconAlt,
  required = false,
  label = "",
}) => {
  if (inputType === "checkbox") {
    return (
      <>
        <label>
          <StyledInputField
            type={inputType}
            name={label}
            placeholder={label}
            onChange={(e) => onChange(e.target.checked)}
            inputType={inputType}
            {...(required && { required: true })}
          />
          <span>{children}</span>
        </label>
      </>
    );
  } else {
    return (
      <>
        <InputFieldLayout>
          <Image src={iconSrc} alt={iconAlt} width="30" height="30" />
          <StyledLabel>
            <StyledInputField
              type={inputType}
              value={value}
              name={label}
              placeholder={label}
              onChange={(e) => onChange(e.target.value)}
              inputType={inputType}
              {...(required && { required: true })}
            />
          </StyledLabel>
        </InputFieldLayout>
      </>
    );
  }
};
