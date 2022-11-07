import React from "react";
import { styled } from "../../stitches.config";

export type Props = {};

const ComponentLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  minHeight: "60vh",
  alignItems: "center",
  backgroundColor: "$neutral-100",
  width: "100%",
});

export const GeneralLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <ComponentLayout>{children}</ComponentLayout>
    </>
  );
};
