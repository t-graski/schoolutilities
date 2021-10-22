import React from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";

type Props = {
  inputType: "text" | "password" | "date" | "email" | "checkbox";
  value: string | boolean;
  onChange: Function;
  iconSrc: string;
  iconAlt: string;
  label?: string;
};

const StyledInputField = styled("input", {
  background: "$backgroundTertiary",
  width: "100%",
  borderRadius: "20px",
  color: "$fontPrimary",
  fontSize: "1.2rem",
  border: "none",
  padding: "15px 25px",
  fontFamily: "$fontPrimary",
  fontWeight: "bold",
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

export const InputField: React.FC<Props> = ({
  inputType,
  value,
  onChange,
  children,
  iconSrc,
  iconAlt,
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
          />
          <span>{children}</span>
        </label>
      </>
    );
  } else {
    return (
      <>
        <label>
          <StyledInputField
            type={inputType}
            name={label}
            placeholder={label}
            onChange={(e) => onChange(e.target.value)}
            inputType={inputType}
          />
        </label>
      </>
    );
  }
};
