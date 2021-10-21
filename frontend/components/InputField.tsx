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
};

const StyledInputField = styled("input", {
  backgroundColor: "$backgroundTertiary",
  width: "100%",
  borderRadius: "20px",
  color: "$fontPrimary",
  fontSize: "1.2rem",
  border: "none",
  padding: "15px 25px",
  fontFamily: "$fontPrimary",
  variants: {
    inputType: {
      checkbox: {
        width: "fit-content",
        margin: "0 20px 0 0",
      },
    },
  },
});

export const InputField: React.FC<Props> = ({
  label,
  inputType,
  value,
  onChange,
  children
}) => {
  return (
    <>
      <label>
        <StyledInputField
          type={inputType}
          name={label}
          value={value}
          placeholder={children}
          onChange={(e) => onChange(e.target.value)}
          inputType={inputType}
        />
        {inputType === "checkbox" && <span>{children}</span>}
      </label>
    </>
  );
};
