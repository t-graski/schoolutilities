import React from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import { Spacer } from "./Spacer";

export type AboutUsItem = {
  imageSrc: string;
  imageAlt: string;
  name: string;
  position: string;
  description: string;
  roles: string[];
};

const AboutUsLayout = styled("div", {
  padding: "1.5vh 15vw",
  display: "flex",
});

const ImageDimension = styled("div", {
  position: "relative",
  width: "15vw",
  height: "15vw",
});

const VerticalLine = styled("div", {
  display: "inline-block",
  height: "fit-content",
  padding: "70px 0",
  width: "5px",
  borderRadius: "5px",
  marginLeft: "20px",
  backgroundColor: "#4b4c4e",
});

const AboutUsTextLayout = styled("div", {
  width: "40vw",
  display: "flex",
  flexDirection: "column",
  gridGap: "15px",
  height: "20vw",
});

const AboutUsTextHeader = styled("h1", {});

const AboutUsTextDescription = styled("p", {});

const AboutUsTextRoles = styled("ul", {});

const ImageLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  height: "fit-content",
  alignItems: "center",
  width: "30vw",
  justifyContent: "center",
});

const AboutUsRolesTitle = styled("h3", {
  paddingBottom: "0.9vh",
  paddingTop: "1vh",
});
export const AboutUsItem: React.FC<AboutUsItem> = ({
  imageSrc,
  imageAlt,
  name,
  position,
  description,
  roles,
}) => {
  return (
    <>
      <AboutUsLayout>
        <ImageLayout>
          <ImageDimension>
            <Image
              layout="fill"
              src={imageSrc}
              alt={imageAlt}
            ></Image>
          </ImageDimension>
          <VerticalLine></VerticalLine>
        </ImageLayout>
        <AboutUsTextLayout>
          <Spacer size="verySmall"></Spacer>
          <AboutUsTextHeader>
            {name} ({position})
          </AboutUsTextHeader>
          <AboutUsTextDescription>{description}</AboutUsTextDescription>
          <AboutUsTextRoles>
            <AboutUsRolesTitle>Roles:</AboutUsRolesTitle>
            {roles.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
          </AboutUsTextRoles>
        </AboutUsTextLayout>
      </AboutUsLayout>
    </>
  );
};
