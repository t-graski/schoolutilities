import React from "react";
import { styled } from "@stitches/react";
import SvgDownload from "../../atoms/svg/SvgDownload";

type Props = {
  logoName: string;
  icon?: any;
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

const DownloadSizer = styled("div", {
  width: "20px",
  height: "20px",
});

const DownloadButtonsLayout = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
  width: "100%",
  gap: "30px",
});

const DownloadButton = styled("a", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  color: "$neutral-500",
  textDecoration: "none",
});

export const SingleLogo: React.FC<Props> = ({
  logoName,
  icon,
  imageBg,
  orientation = "horizontal",
}) => {
  const Icon = icon;

  return (
    <div>
      <SingleLogoLayout imageBg={imageBg}>
        <LogoSizer orientation={orientation}>{icon && <Icon />}</LogoSizer>
      </SingleLogoLayout>
      <DownloadButtonsLayout>
        <DownloadButton
          href={`/images/downloads/${logoName}.svg`}
          download={`${logoName}.svg`}
        >
          <DownloadSizer>
            <SvgDownload />
          </DownloadSizer>
          SVG
        </DownloadButton>
        <DownloadButton
          href={`/images/downloads/${logoName}.png`}
          download={`${logoName}.png`}
        >
          <DownloadSizer>
            <SvgDownload />
          </DownloadSizer>
          PNG
        </DownloadButton>
      </DownloadButtonsLayout>
    </div>
  );
};
