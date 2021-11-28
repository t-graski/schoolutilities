import { createStitches } from "@stitches/react";

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  styled,
  theme,
} = createStitches({
  theme: {
    colors: {
      backgroundPrimary: "#2f3136",
      backgroundSecondary: "#202225",
      backgroundTertiary: "#4b4c4e",
      fontTertiary: "#3c3f46",
      fontPrimary: "#ffffff",
      fontSecondary: "#242424",
      specialPrimary: "#eda33f",
      specialSecondary: "#738adb",
      specialTertiary: "#D23737",
    },
    shadows: {
      accountButton: "0px 0px 5px 0px #eda33f",
      accountButtonHover: "0px 0px 13px 0px #eda33f",
      menuBubbleShadowHover: "0px 0px 13px 0px #738adb",
    },
    space: {
      "2-small": "4px",
      "1-small": "8px",
      "small": "16px",
      "normal": "24px",
      "medium": "32px",
      "large": "48px",
      "1-large": "64px",
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
      system: "Montserrat",
    },
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
  media: {
    bp1: "(min-width: 520px)",
    bp2: "(min-width: 900px)",
  },
});
