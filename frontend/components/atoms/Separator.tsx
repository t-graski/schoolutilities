import React from "react";
import { styled } from "../../stitches.config";
import type * as Stitches from "@stitches/react";

type Props = {
  width: Stitches.VariantProps<typeof StyledHr>["width"];
  alignment: Stitches.VariantProps<typeof HrLayout>["alignment"];
};

const StyledHr = styled("div", {
  border: "2px solid $fontPrimary",
  margin: "0",
  variants: {
    width: {
      big: {
        width: "100%",
      },
      small: {
        width: "110px",
      },
      ultraSmall: {
        width: "80px",
      },
    },
  },
});

const HrLayout = styled("div", {
  display: "flex",
  width: "100%",
  variants: {
    alignment: {
      center: {
        justifyContent: "center",
      },
      left: {
        justifyContent: "flex-start",
      },
      right: {
        justifyContent: "flex-end",
      },
    },
  },
});

export const Separator: React.FC<Props> = ({ width, alignment }) => {
  return (
    <>
      <HrLayout alignment={alignment}>
        <StyledHr width={width} />
      </HrLayout>
    </>
  );
};
