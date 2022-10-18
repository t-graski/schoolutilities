import React from "react";
import { styled } from "../../stitches.config";
import type * as Stitches from "@stitches/react";

type Props = {
  size: Stitches.VariantProps<typeof SpacerBox>["size"];
};

const SpacerBox = styled("div", {
  display: "inline-block",

  variants: {
    size: {
      verySmall: {
        height: "25px",
      },
      small: {
        height: "50px",
      },
      medium: {
        height: "150px",
      },
      big: {
        height: "300px",
      },
      "1x": {
        height: "$space$1x",
      },
      "2x": {
        height: "$space$2x",
      },
      "3x": {
        height: "$space$3x",
      },
      "4x": {
        height: "$space$4x",
      },
      "5x": {
        height: "$space$5x",
      },
      "6x": {
        height: "$space$6x",
      },
      "7x": {
        height: "$space$7x",
      },
      "8x": {
        height: "$space$8x",
      },
      "9x": {
        height: "$space$9x",
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
