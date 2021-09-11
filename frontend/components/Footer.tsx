import React from "react";
import { styled } from "../stitches.config";
import Image from "next/image";

type Props = {
  links: {
    href: string;
    label: string;
  }[];
};

const FooterLayout = styled("footer", {
    width: "100%",
    padding: "0 10%",
    display: "flex",
    justifyContent: "center",
    fontSize: "1rem",
    paddingBottom: "20px",
    alignItems: "center",
    lineHeight: "1.2rem",
    flexDirection: "column",
    marginTop: "80px",
    backgroundColor: "$fontTertiary"
});

const FooterNavbar = styled('nav', {
    width: "fit-content",
    transition: "all 200ms",
});

const FooterList = styled('ul', {
    display: "flex",
    flexDirection: "row",
    width: 'fit-content',
    padding: "5vh 0",
    listStyle: "none"
});

const FooterListElement = styled('li', {
    display: "list-item",
    textAlign: "match-parent"
});

const FooterLink = styled('a', {
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

export const Footer: React.FC<Props> = ({ links }) => {
  return (
    <>
      <FooterLayout>
        <FooterNavbar>
          <FooterList>
              {links.map((link) => (
                  <FooterListElement>
                      <FooterLink href={link.href}>{link.label}</FooterLink>
                  </FooterListElement>
              ))}
          </FooterList>
        </FooterNavbar>
        <div>
          Icons made by Freepik, Icongeek26 from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </FooterLayout>
    </>
  );
};
