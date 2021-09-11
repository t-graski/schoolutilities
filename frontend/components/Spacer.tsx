import React from "react";
import { styled } from "../stitches.config";
import type * as Stitches from "@stitches/react";

type Props = {
  size: Stitches.VariantProps<typeof SpacerBox>["size"];
};

const SpacerBox = styled("div", {
  display: "inline-block",
  variants: {
    size: {
      small: {
        height: "50px",
      },
      medium: {
        height: "150px",
      },
      big: {
        height: "300px"
      },
    },
  },
});

export const Spacer: React.FC<Props> = ({ size }) => {
  return (
    <>
      <SpacerBox size={size}></SpacerBox>
    </>
  );
};
