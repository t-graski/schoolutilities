import React, { useEffect } from "react";
import { styled } from "../../../stitches.config";

type Props = {};

const BannerAdLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
  padding: "$6x 0",
});

const StyledIns = styled("ins", {
  display: "block",
  height: "100px",
  width: "1200px",

  "@mobileOnly": {
    width: "300px",
  },
  "@tabletAndDown": {
    width: "500px",
  },
  "@laptopAndDown": {
    width: "800px",
  },
});

export const BannerAd: React.FC<Props> = ({}) => {
  useEffect(() => {
    // @ts-ignore
    if (window.adsbygoogle) {
      // @ts-ignore
      window.adsbygoogle = [];
    }
    // @ts-ignore
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <>
      <BannerAdLayout>
        <StyledIns
          className="adsbygoogle"
          data-ad-client="ca-pub-7476966411807562"
          data-ad-slot="7738492515"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></StyledIns>
      </BannerAdLayout>
    </>
  );
};
