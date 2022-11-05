import { styled } from "../../stitches.config";

export const Button = styled("button", {
  borderRadius: "8px",
  width: "fit-content",
  border: "none",
  padding: "10px 20px",

  fontSize: "1rem",
  cursor: "pointer",
  fontWeight: "bold",
  color: "$onPrimary",

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
        backgroundColor: "$primary",
      },
      secondary: {
        backgroundColor: "$neutral-300",
      },
      tertiary: {
        backgroundColor: "$warning",
      },
    },
    color: {
      primary: {
        color: "$onPrimary",
      },
    },
    fontWeight: {
      bold: {
        fontWeight: "bold",
      },
      medium: {
        fontWeight: "500",
      },
      normal: {
        fontWeight: "normal",
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
    buttonType: {
      filled: {
        backgroundColor: "$primary",
        color: "$onPrimary",
      },
      outlined: {
        backgroundColor: "transparent",
        color: "$onPrimaryContainer",
        border: "1px solid $outline",
      },
      text: {
        backgroundColor: "transparent",
        color: "$onBackground",
      },
    },
  },
});
