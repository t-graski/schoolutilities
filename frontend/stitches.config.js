import { createStitches } from "@stitches/react";
import { dark } from "./theme/themes/dark";
import { light } from "./theme/themes/light";

export const styles = {
  theme: {
    colors: dark,
    shadows: {
      accountButton: "0px 0px 5px 0px #eda33f",
      accountButtonHover: "0px 0px 13px 0px #eda33f",
      menuBubbleShadowHover: "0px 0px 13px 0px #738adb",
    },
    space: {
      "2-small": "4px",
      "1-small": "8px",
      small: "16px",
      normal: "24px",
      medium: "32px",
      large: "48px",
      "1-large": "64px",
      none: 0,
      "1x": "8px",
      "2x": "16px",
      "3x": "24px",
      "4x": "32px",
      "5x": "40px",
      "6x": "48px",
      "7x": "56px",
      "8x": "64px",
      "9x": "72px",
    },
    fontWeights: {
      light: "300",
      regular: "400",
      medium: "500",
      bold: "700",
      bolder: "900",
    },
    sizes: {
      1: "5px",
      2: "10px",
      3: "15px",
      4: "20px",
      5: "25px",
      6: "35px",
    },
    fontSizes: {
      1: "12px",
      2: "13px",
      3: "15px",
      4: "17px",
      5: "19px",
      6: "21px",
    },
    fonts: {
      system: "Poppins",
    },
    radii: {
      small: "10px",
      normal: "25px",
      "1x": "8px",
      "2x": "16px",
      "3x": "24px",
    },
  },
  media: {
    laptopAndDown: "(max-width: 1199px)",
    tabletAndDown: "(max-width: 899px)",
    mobileOnly: "(max-width: 599px)",
  },
  utils: {
    marginX: (value) => ({
      marginLeft: value,
      marginRight: value,
    }),
    marginY: (value) => ({
      marginTop: value,
      marginBottom: value,
    }),
    paddingX: (value) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingY: (value) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
};

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  styled,
  theme,
} = createStitches(styles);

export const lightTheme = createTheme({ colors: light });
