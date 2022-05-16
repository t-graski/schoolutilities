import React from "react";
import { styled } from "../../stitches.config";

type Props = {};

const BasicSiteLayout = styled("div", {
  position: "relative",
  
  height: "100vh",
});

export const SiteLayout: React.FC<Props> = ({ children }) => {
  return <BasicSiteLayout>{children}</BasicSiteLayout>;
};
