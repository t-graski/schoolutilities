import React, { useEffect, useState } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import cookie from "js-cookie";

type Props = {
  backgroundColor: string;
  color: string;
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
