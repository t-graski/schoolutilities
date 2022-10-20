import React, { useEffect } from "react";
import { styled } from "../../../stitches.config";

type Props = {};

const BannerAdLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  margin: "6px 0",
});

export const BannerAd: React.FC<Props> = ({}) => {
  useEffect(() => {
    // @ts-ignore
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <>
      <BannerAdLayout>
        <ins
          style={{ display: "block" }}
          className="adsbygoogle"
          data-ad-client="ca-pub-7476966411807562"
          data-ad-slot="7738492515"
          data-full-width-responsive="true"
        ></ins>
      </BannerAdLayout>
    </>
  );
};
