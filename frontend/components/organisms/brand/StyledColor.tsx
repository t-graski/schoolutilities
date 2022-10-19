import React from "react";
import { styled } from "@stitches/react";
import Image from "next/image";

type Props = {
  name: string;
  hexCode: string;
};

const SingleColorLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  borderRadius: "40px",
  width: "100%",
  justifyContent: "center",
  alignItems: "flex-start",
  backgroundColor: "$neutral-100",
  padding: "25px",
});

const ColorName = styled("div", {
  fontSize: "1.2rem",
  fontWeight: "bold",
  margin: "15px 0 5px 0",
});

const ColorDescription = styled("div", {
  fontSize: "1rem",
  margin: "0",
  cursor: "pointer",
});

export const StyledColor: React.FC<Props> = ({ name, hexCode }) => {
  const ColorSpacer = styled("div", {
    width: "100%",
    height: "100px",
    backgroundColor: hexCode,
    display: "flex",
    borderRadius: "20px",
  });

  return (
    <>
      <SingleColorLayout>
        <ColorSpacer></ColorSpacer>
        <ColorName>{name}</ColorName>
        <ColorDescription
          onClick={() => {
            navigator.clipboard.writeText(hexCode);
          }}
        >
          {hexCode}
        </ColorDescription>
      </SingleColorLayout>
    </>
  );
};
