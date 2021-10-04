import React from "react";
import { styled } from "../stitches.config";
import Image from "next/image";

type Props = {
  label: string
};

const Header = styled('h1', {
    fontSize: "4.5rem",
    fontWeight: "700",
    color: "$fontPrimary",
    width: "100%",
    textAlign: "center"
})

export const Headline: React.FC<Props> = ({ label }) => {
  return (
    <>
        <Header>{label}</Header>
    </>
  );
};
