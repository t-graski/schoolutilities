import React from "react";
import { styled } from "../../stitches.config";

type Props = {};

const BasicSiteLayout = styled("div", {
  height: "100vh",
  position: "relative",
});

export const SiteLayout: React.FC<Props> = ({ children }) => {
  return <BasicSiteLayout>{children}</BasicSiteLayout>;
};
