import React, { useEffect, useState } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import cookie from "js-cookie";
import type * as Stitches from "@stitches/react";

type Props = {
  backgroundColor: Stitches.VariantProps<
    typeof StyledButton
  >["backgroundColor"];
  color: Stitches.VariantProps<typeof StyledButton>["color"];
  label: string;
  disabled?: boolean;
  onClick: Function;
};

const StyledButton = styled("button", {
  borderRadius: "8px",
  width: "fit-content",
  fontSize: "1rem",
  border: "none",
  cursor: "pointer",
  padding: "10px 20px",
  fontWeight: "bold",
  ":hover": {
    backgroundColor: "$backgroundColor",
    color: "$color",
  },
  ":active": {
    backgroundColor: "$backgroundColor",
    color: "$color",
  },
  variants: {
    backgroundColor: {
      primary: {
        backgroundColor: "$specialSecondary",
      },
      secondary: {
        backgroundColor: "$backgroundTertiary",
      },
    },
    color: {
      primary: {
        color: "$fontPrimary",
      },
    },
    isDisabled: {
      true: {
        cursor: "not-allowed",
        opacity: 0.5,
      },
      false: {},
    },
  },
});

export const Button: React.FC<Props> = ({
  backgroundColor,
  color,
  label,
  disabled = false,
  onClick,
}) => {
  return (
    <>
      <StyledButton
        onClick={() => {
          onClick();
        }}
        backgroundColor={backgroundColor}
        color={color}
        {...(disabled && { disabled: true })}
        isDisabled={disabled}
      >
        {label}
      </StyledButton>
    </>
  );
};
