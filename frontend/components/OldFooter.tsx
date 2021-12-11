import React from "react";
import { styled } from "../stitches.config";

type Props = {
  links: {
    href: string;
    label: string;
  }[];
  isOnMain?: boolean;
};

const FooterLayout = styled("footer", {
  width: "100%",
  padding: "0 10%",
  display: "flex",
  justifyContent: "center",
  fontSize: "1rem",
  alignItems: "center",
  lineHeight: "1.2rem",
  flexDirection: "column",
  position: "relative",
  bottom: "0",
  left: "0",
  backgroundColor: "$fontTertiary",
  color: "$fontPrimary",
});

const FooterNavbar = styled("nav", {
  width: "fit-content",
  transition: "all 200ms",
});

const FooterList = styled("ul", {
  display: "flex",
  flexDirection: "row",
  width: "fit-content",
  padding: "5vh 0",
  listStyle: "none",
});

const FooterListElement = styled("li", {
  display: "list-item",
  textAlign: "match-parent",
});

const FooterLink = styled("a", {
  color: "$fontPrimary",
  textDecoration: "none",
  margin: "0 4vw",
  fontSize: "1.5rem",
  textTransform: "uppercase",
  transition: "all 200ms",
  "&:hover": {
    color: "$specialPrimary",
  },
});

const FooterSpacer = styled("div", {
  height: "200px",
});

export const Footer: React.FC<Props> = ({ links, isOnMain }) => {
  return (
    <>
      <FooterSpacer></FooterSpacer>
      <FooterLayout>
        <FooterNavbar>
          <FooterList>
            {links.map((link, index) => (
              <FooterListElement key={index}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </FooterListElement>
            ))}
          </FooterList>
        </FooterNavbar>
      </FooterLayout>
    </>
  );
};
