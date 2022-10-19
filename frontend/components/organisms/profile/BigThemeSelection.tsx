import { useTheme } from "next-themes";
import React from "react";
import { styled } from "../../../stitches.config";
import SvgDarkThemeBig from "../../atoms/svg/SvgDarkThemeBig";
import SvgLightThemeBig from "../../atoms/svg/SvgLightThemeBig";
import SvgMoon from "../../atoms/svg/SvgMoon";
import SvgSun from "../../atoms/svg/SvgSun";
import { BigTheme } from "../../molecules/profile/BigTheme";

type Props = {};

const ThemesLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "$5x",
  width: "100%",
  maxWidth: "700px",
});

export const BigThemeSelection: React.FC<Props> = ({}) => {
  const { theme, setTheme } = useTheme();

  return (
    <ThemesLayout>
      <BigTheme
        highlight={theme == "light"}
        Icon={SvgSun}
        text={"Light mode"}
        ImageSvg={SvgLightThemeBig}
        onClick={() => {
          setTheme("light");
        }}
      ></BigTheme>
      <BigTheme
        highlight={theme == "dark"}
        Icon={SvgMoon}
        text={"Dark mode"}
        ImageSvg={SvgDarkThemeBig}
        onClick={() => {
          setTheme("dark");
        }}
      ></BigTheme>
    </ThemesLayout>
  );
};
