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
  label?: string;
};

const StyledInputField = styled("input", {
  background: "$backgroundTertiary",
  width: "90%",
  color: "$fontPrimary",
  fontSize: "1.2rem",
  lineHeight: "1.5rem",
  border: "none",
  fontFamily: "$fontPrimary",
  fontWeight: "bold",
  marginLeft: "20px",
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
  background: "$backgroundTertiary",
  width: "100%",
  borderRadius: "20px",
  border: "none",
  padding: "15px 20px",
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
        <InputFieldLayout>
          <Image src={iconSrc} alt={iconAlt} width="30" height="30" />
          <label>
            <StyledInputField
              type={inputType}
              value={value}
              name={label}
              placeholder={label}
              onChange={(e) => onChange(e.target.value)}
              inputType={inputType}
            />
          </label>
        </InputFieldLayout>
      </>
    );
  }
};
