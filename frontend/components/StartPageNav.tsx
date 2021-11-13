import React from "react";
import { styled } from "../stitches.config";
import Image from "next/image";

type Props = {
  links: {
    href: string;
    label: string;
    imageSrc: string;
    imageAlt: string;
  }[];
};

const MainContentLayout = styled("div", {
    padding: "0 8vw",
    width: "100%",	
    marginTop: "140px",
    minHeighht: "85vh",
    minHeight: "100vh",
});

const MainHeader = styled("h1", {
  textAlign: "left",
  fontSize: "4.5rem",
});

const MainHeaderDescription = styled("p", {
  fontSize: "1.5rem"
});

const StyledHr = styled("hr", {
  margin: "20px 0",
  borderTop: "3px solid $fontPrimary",
  width: "110px",
});

const MenuBubbles = styled("div", {
  display: "grid",
  width: "100%",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "1fr 1fr",
  padding: "3vh 0",
  gridGap: "35px"
});
const StyledLink = styled("a", {
    borderRadius: "30px",
    width: "100%",
    height: "100%",
    backgroundColor: "$specialSecondary",
    color: "$fontPrimary",
    display: "flex",
    textDecoration: "none",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "3vh",
    transition: "all 200ms",
    "&:hover": {
      boxShadow: "$menuBubbleShadowHover"
    }  
});

const MenuBubbleIcon = styled("span", {
  width: "50px"
});

const MenuBubbleText = styled("span", {
  fontSize: "1.8rem",
  marginLeft: "30px",
  fontWeight: "700"
});

const MenuBubbleImage = styled("div", {
  width: "50px",
  filter: "invert()",
  ["&:before"]: {
    display: "block",
    content: "",
    width: "50px",
    paddingTop: "50px"
  },
});

export const StartPageNav: React.FC<Props> = ({ links }) => {
  return (
    <>
        <MainContentLayout>
          <MainHeader>SchoolUtilities</MainHeader>
          <MainHeaderDescription>
            The simplest way to manage your school discord server
          </MainHeaderDescription>
          <StyledHr />
          <MenuBubbles>
              {links.map((link) => (
                  <StyledLink href={link.href}>
                  <MenuBubbleIcon>
                    <MenuBubbleImage>
                      <Image layout="fill" src={link.imageSrc} alt={link.imageAlt} />                      
                    </MenuBubbleImage>
                  </MenuBubbleIcon>
                  <MenuBubbleText>{link.label}</MenuBubbleText>
                </StyledLink>
                ))}
          </MenuBubbles>
        </MainContentLayout>
    </>
  );
};
