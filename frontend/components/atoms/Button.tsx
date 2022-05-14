import React from "react";
import { lightTheme, styled } from "../../stitches.config";
import type * as Stitches from "@stitches/react";

type Props = {
  backgroundColor: Stitches.VariantProps<
    typeof StyledButton
  >["backgroundColor"];
  color: Stitches.VariantProps<typeof StyledButton>["color"];
  label: string;
  disabled?: boolean;
  onClick: Function;
  type?: "button" | "submit" | "reset";
  isVisible?: boolean;
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
      tertiary: {
        backgroundColor: "$specialPrimary",
      },
    },
    color: {
      primary: {
        color: "$fontPrimary",
        [`.${lightTheme} &`]: {
          color: "$fontSecondary",
        },
      },
    },
    isDisabled: {
      true: {
        cursor: "not-allowed",
        opacity: 0.5,
      },
      false: {},
    },
    isVisible: {
      true: {},
      false: {
        opacity: 0,
      },
    },
  },
});

export const Button: React.FC<Props> = ({
  backgroundColor,
  color,
  label,
  disabled = false,
  onClick,
  type = "button",
  isVisible = true,
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
        type={type}
        isVisible={isVisible}
      >
        {label}
      </StyledButton>
    </>
  );
};
