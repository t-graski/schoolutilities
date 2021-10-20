import React from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";

type Props = {
  label: string;
  alignment?: Stitches.VariantProps<typeof Header>["alignment"];
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
  },
});

export const Headline: React.FC<Props> = ({ label, alignment = "center" }) => {
  return (
    <>
      <Header alignment={alignment}>{label}</Header>
    </>
  );
};
