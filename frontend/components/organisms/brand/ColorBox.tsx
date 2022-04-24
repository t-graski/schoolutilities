import React from "react";
import { styled } from "@stitches/react";
import { SingleLogo } from "./SingleLogo";
import { StyledColor } from "./StyledColor";

type Props = {
  title: string;
  colors: {
    name: string;
    hexCode: string;
  }[];
};

const ColorBoxLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
  gap: "133px",
  alignItems: "center",
});

const StyledH2 = styled("h2", {
  fontSize: "2.8rem",
  fontWeight: "bold",
  marginBottom: "3vh",
  lineHeight: "2.8rem",
});

const StyledColorBoxBackground = styled("div", {
  width: "100%",
  height: "100%",
  backgroundColor: "$backgroundTertiary",
  padding: "10vh 10vw",
});

export const ColorBox: React.FC<Props> = ({ title, colors }) => {
  return (
    <>
      <StyledColorBoxBackground>
        <StyledH2>{title}</StyledH2>
        <ColorBoxLayout>
          {colors.map((logo, index) => (
            <StyledColor name={logo.name} hexCode={logo.hexCode} />
          ))}
        </ColorBoxLayout>
      </StyledColorBoxBackground>
    </>
  );
};
