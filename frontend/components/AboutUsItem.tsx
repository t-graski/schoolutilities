import React from "react";
import { styled } from "../stitches.config";
import Image from "next/image";

export type AboutUsItem = {
  imageSrc: string;
  imageAlt: string;
  name: string;
  position: string;
  description: string;
  roles: string[];
};

const AboutUsLayout = styled("div", {
  padding: "5vh 15vw",
  display: "grid",
  gridTemplateRows: "1vw 1vw",
});

const ImageDimension = styled("div", {
    position: "relative",
    width: "20vw",
    height: "20vw",
});

const VerticalLine = styled("div", {
    display: "inline-block",
    height: "fit-content",
    padding: "10% 0",
    width: "5px",
    borderRadius: "5px",
    backgroundColor: "$fontSecondary"
});

const AboutUsTextLayout = styled("div", {
    width: "100%",
    display: "grid",
    gridTemplateRows: "1fr",
    gridGap: "30px",
    height: "20vw",
});

const AboutUsTextHeader = styled("h1", {

});

const AboutUsTextDescription = styled("p", {

});

const AboutUsTextRoles = styled("ul", {
    
});

const ImageLayout = styled("div", {
    display: "flex",
    flexDirection: "row",
    height: "fit-content",
    alignItems: "center",
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
            src="/images/avatar.png"
            alt="SchoolUtilities Logo"
          ></Image>
        </ImageDimension>
            <VerticalLine></VerticalLine>
          </ImageLayout>
        <AboutUsTextLayout>
            <AboutUsTextHeader>{name} ({position})</AboutUsTextHeader>
            <AboutUsTextDescription>{description}</AboutUsTextDescription>
            <h3>Roles:</h3>
            <AboutUsTextRoles>
                {roles.map((role, index) => (
                    <li>{role}</li>
                ))}
            </AboutUsTextRoles>
        </AboutUsTextLayout>
      </AboutUsLayout>
    </>
  );
};
