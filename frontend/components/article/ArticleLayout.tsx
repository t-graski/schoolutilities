import React from "react";
import { styled } from "../../stitches.config";

export type Props = {};

const ComponentLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  backgroundColor: "$neutral-100",
  color: "$neutral-500",
  fontFamily: "$neutral-500",
  fontSize: "1.2rem",
  lineHeight: "1.5",
  fontWeight: "normal",
  textAlign: "left",
  width: "100%",
  maxWidth: "1000px",
  padding: "5vh",
});

export const ArticleLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <ComponentLayout>{children}</ComponentLayout>
    </>
  );
};
