import React from "react";
import { styled } from "@stitches/react";
import { SingleLogo } from "./SingleLogo";
import type * as Stitches from "@stitches/react";

type Props = {
  fontStyles: Stitches.VariantProps<typeof TagLayout>["fontStyle"][];
};

const TagsLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "56px",
  alignItems: "center",
});

const TagLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
  borderRadius: "5000px",
  backgroundColor: "$backgroundTertiary",

  variants: {
    fontStyle: {
      Lighter: {
        fontWeight: "100",
      },
      Light: {
        fontWeight: "300",
      },
      Regular: {
        fontWeight: "500",
      },
      Bold: {
        fontWeight: "700",
      },
      Bolder: {
        fontWeight: "900",
      },
    },
  },
});

export const FontTags: React.FC<Props> = ({ fontStyles }) => {
  return (
    <>
      <TagsLayout>
        {fontStyles.map((fontStyle) => (
          <TagLayout fontStyle={fontStyle}>{fontStyle}</TagLayout>
        ))}
      </TagsLayout>
    </>
  );
};
