import React from "react";
import { styled } from "@stitches/react";
import Image from "next/image";
import { SvgIcon } from "../../atoms/SvgIcon";

type Props = {
  logoName: string;
  imageBg?: "1" | "2" | "3";
  orientation?: "horizontal" | "vertical";
};

const SingleLogoLayout = styled("div", {
  display: "flex",
  borderRadius: "40px",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  backgroundRepeat: "no-repeat",
  padding: "50px 0",

  variants: {
    imageBg: {
      "1": {
        backgroundImage: "url(/images/BrandingBackground1.png)",
      },
      "2": {
        backgroundImage: "url(/images/BrandingBackground2.png)",
      },
      "3": {
        backgroundImage: "url(/images/BrandingBackground3.png)",
      },
    },
  },
});

const LogoSizer = styled("div", {
  variants: {
    orientation: {
      horizontal: {
        width: "60%",
      },
      vertical: {
        width: "25%",
      },
    },
  },
});

export const SingleLogo: React.FC<Props> = ({
  logoName,
  imageBg,
  orientation = "horizontal",
}) => {
  return (
    <>
      <SingleLogoLayout imageBg={imageBg}>
        <LogoSizer orientation={orientation}>
          <SvgIcon iconName={logoName} />
        </LogoSizer>
      </SingleLogoLayout>
    </>
  );
};
