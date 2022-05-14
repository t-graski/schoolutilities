import React from "react";
import { styled } from "@stitches/react";
import { SingleLogo } from "./SingleLogo";

type Props = {
  description: string;
  logos: {
    name: string;
    icon?: any;
    imageBg: "1" | "2" | "3";
    orientation?: "horizontal" | "vertical";
  }[];
};

const LogoPresentationLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "56px",
  alignItems: "center",
});

const Description = styled("p", {
  fontSize: "1.5rem",
  fontWeight: "$medium",
  margin: "0",
  marginBottom: "20px",
});

export const LogoPresentationBox: React.FC<Props> = ({
  description,
  logos,
}) => {
  return (
    <>
      <Description>{description}</Description>
      <LogoPresentationLayout>
        {logos.map((logo, index) => (
          <SingleLogo
            logoName={logo.name}
            icon={logo.icon}
            imageBg={logo.imageBg}
            orientation={logo.orientation}
            key={index}
          />
        ))}
      </LogoPresentationLayout>
    </>
  );
};
