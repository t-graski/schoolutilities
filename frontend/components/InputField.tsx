import React from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";

type Props = {
  label: string;
  inputType: "text" | "password" | "date" | "email";
  value: string;
  onChange: Function;
  iconSrc: string;
  iconAlt: string;
};

const StyledInputField = styled("input", {
  backgroundColor: "$backgroundTertiary",
  borderRadius: "20px",
  color: "$fontPrimary",
  fontSize: "1.2rem",
  height: "4rem",
  border: "none",
  padding: "10px 25px",
  fontFamily: "$fontPrimary",
});

export const InputField: React.FC<Props> = ({
  label,
  inputType,
  value,
  onChange,
}) => {
  return (
    <>
      <label>
        <StyledInputField
          type={inputType}
          name={label}
          value={value}
          placeholder={label}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </>
  );
};
