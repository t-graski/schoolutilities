import React from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";

type Props = {
  label: string;
  alignment?: Stitches.VariantProps<typeof Header>["alignment"];
  fontWeight?: Stitches.VariantProps<typeof Header>["fontWeight"];
  fontSize?: Stitches.VariantProps<typeof Header>["size"];
};

const Header = styled("h1", {
  fontSize: "4.5rem",
  fontWeight: "700",
  color: "$fontPrimary",
  width: "100%",
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
        fontWeight: "700",
      },
      extraBold: {
        fontWeight: "900",
      },
    },
    size: {
      small: {
        fontSize: "2.5rem",
      },
      medium: {
        fontSize: "3rem",
      },
      large: {
        fontSize: "4.5rem",
      },
    },
  },
});

export const Headline: React.FC<Props> = ({
  label,
  alignment = "center",
  fontWeight = "bold",
  fontSize = "large",
}) => {
  return (
    <>
      <Header alignment={alignment} fontWeight={fontWeight} size={fontSize}>
        {label}
      </Header>
    </>
  );
};
