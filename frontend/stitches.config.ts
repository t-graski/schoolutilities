import { createStitches } from "@stitches/react";

export const styles = {
  theme: {
    colors: {
      backgroundPrimary: "#2f3136",
      backgroundSecondary: "#202225",
      backgroundTertiary: "#4b4c4e",
      backgroundQuaternary: "#1A1C1E",
      fontPrimary: "#ffffff",
      fontSecondary: "#242424",
      fontTertiary: "#3c3f46",
      specialPrimary: "#eda33f",
      specialSecondary: "#4f71ca",
      specialTertiary: "#D23737",
      specialQuaternary: "#E0E2EB",
      specialQuinary: "#B1B6CD",
      skeletonPrimary: "#f4f4f4",
      skeletonSecondary: "#38393a",
    },
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
    },
    fontWeights: {
      light: '300',
      regular: '400',
      medium: '500',
      bold: '700',
      bolder: '900',
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
      normal: "25px",
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

export const lightTheme = createTheme({
  colors: {
    backgroundPrimary: "#F0F1F5",
    backgroundSecondary: "#D9D9D9",
    backgroundTertiary: "#eaecf0",
    backgroundQuaternary: "#E0E2EB",
    fontPrimary: "#242424",
    fontSecondary: "#ffffff",
    fontTertiary: "#3c3f46",
    specialPrimary: "#eda33f",
    specialSecondary: "#738adb",
    specialTertiary: "#D23737",
    skeletonPrimary: "#f4f4f4",
    skeletonSecondary: "#f4f4f4",
  },
});
