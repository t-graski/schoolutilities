import React from "react";
import { styled } from "../../stitches.config";
import Image from "next/image";

export type Props = {};

const ComponentLayout = styled("a", {
  color: "$fontPrimary",
  borderBottom: "$fontPrimary solid 1px",
  cursor: "pointer",
});

export const StyledLink: React.FC<Props> = ({ children }) => {
  return (
    <>
      <ComponentLayout>{children}</ComponentLayout>
    </>
  );
};
