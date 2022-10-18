import { styled } from "@stitches/react";

export const ContentLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "50px 10vw",
});

export const fontStyles = {
  headline1: {
    fontSize: "$x7l",
  },
  headline2: {
    fontSize: "$x5l",
  },
  headline3: {
    fontSize: "$x4l",
  },
  headline4: {
    fontSize: "$xxl",
  },
  headline5: {
    fontSize: "$xl",
  },
  headline6: {
    fontSize: "$m",
  },
  body1: {
    fontSize: "$s",
  },
  body2: {
    fontSize: "$xs",
  },
  subtitle1: {
    fontSize: "$s",
  },
  subtitle2: {
    fontSize: "$xs",
  },
  button: {
    fontSize: "$xs",
  },
  overline: {
    fontSize: "$xxs",
  },
  caption: {
    fontSize: "$xxs",
  },
};

export const Typography = styled("span", {
  variants: {
    variant: {
      headline1: fontStyles.headline1,
      headline2: fontStyles.headline2,
      headline3: fontStyles.headline3,
      headline4: fontStyles.headline4,
      headline5: fontStyles.headline5,
      headline6: fontStyles.headline6,
      body1: fontStyles.body1,
      body2: fontStyles.body2,
      subtitle1: fontStyles.subtitle1,
      subtitle2: fontStyles.subtitle2,
      button: fontStyles.button,
      overline: fontStyles.overline,
      caption: fontStyles.caption,
    },
  },
});
