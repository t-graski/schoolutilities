import React, { useEffect, useState } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import cookie from "js-cookie";
import type * as Stitches from "@stitches/react";

type Props = {
  backgroundColor: Stitches.VariantProps<typeof StyledButton>["backgroundColor"];
  color: Stitches.VariantProps<typeof StyledButton>["color"];
  label: string;
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
    },
    color: {
      primary: {
        color: "$fontPrimary",
      },
    },
  },
});

export const Button: React.FC<Props> = ({
  backgroundColor,
  color,
  label,
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
      >
        {label}
      </StyledButton>
    </>
  );
};
