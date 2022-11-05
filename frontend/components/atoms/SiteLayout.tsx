import React from "react";
import { styled } from "../../stitches.config";

type Props = {};

const BasicSiteLayout = styled("div", {
  display: "flex",
  width: "100vw",
  justifyContent: "center",
  padding: "0 $5x",
});

const BasicInnerLayout = styled("div", {
  display: "flex",
  width: "100%",
  maxWidth: "1300px",
});

export const SiteLayout: React.FC<Props> = ({ children }) => {
  return (
    <BasicSiteLayout>
      <BasicInnerLayout>{children}</BasicInnerLayout>
    </BasicSiteLayout>
  );
};
