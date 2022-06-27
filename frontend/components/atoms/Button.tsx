import { lightTheme, styled } from "../../stitches.config";

export const Button = styled("button", {
  borderRadius: "8px",
  width: "fit-content",
  border: "none",
  padding: "10px 20px",

  fontSize: "1rem",
  cursor: "pointer",
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
    fontWeight: {
      bold: {
        fontWeight: "bold",
      },
      medium: {
        fontWeight: "500",
      },
      normal: {
        fontWeight: "normal",
      }
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