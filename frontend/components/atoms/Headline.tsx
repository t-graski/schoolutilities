import React from "react";
import { styled } from "../../stitches.config";
import type * as Stitches from "@stitches/react";
import Skeleton from "react-loading-skeleton";

type Props = {
  label: string;
  width?: Stitches.VariantProps<typeof Header>["width"];
  alignment?: Stitches.VariantProps<typeof Header>["alignment"];
  fontWeight?: Stitches.VariantProps<typeof Header>["fontWeight"];
  fontSize?: Stitches.VariantProps<typeof Header>["size"];
};

const Header = styled("h1", {
  width: "100%",

  fontSize: "4.5rem",
  fontWeight: "$bold",
  color: "$fontPrimary",
  textAlign: "center",

  variants: {
    alignment: {
      left: {
        textAlign: "left",
      },
      center: {},
      right: {
        textAlign: "right",
      },
    },
    fontWeight: {
      normal: {},
      bold: {
        fontWeight: "$bold",
      },
      extraBold: {
        fontWeight: "$bolder",
      },
    },
    size: {
      superSmall: {
        fontSize: "0.5rem",
      },
      verySmall: {
        fontSize: "1.5rem",
      },
      small: {
        fontSize: "2.5rem",
      },
      medium: {
        fontSize: "3rem",
      },
      large: {
        fontSize: "4.5rem",
        "@mobileOnly": {
          fontSize: "2.5rem",
        },
      },
    },
    width: {
      full: {
        width: "100%",
      },
      half: {
        width: "50%",
      },
      content: {
        width: "fit-content",
      },
    },
  },
});

export const Headline: React.FC<Props> = ({
  label,
  width = "full",
  alignment = "center",
  fontWeight = "bold",
  fontSize = "large",
}) => {
  return (
    <>
      <Header
        width={width}
        alignment={alignment}
        fontWeight={fontWeight}
        size={fontSize}
      >
        {label ? label : <Skeleton width={250}></Skeleton>}
      </Header>
    </>
  );
};
