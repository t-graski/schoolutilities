import Link from "next/link";
import React from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import { SvgIcon } from "./SvgIcon";

type Props = {};

const FooterLayout = styled("footer", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100vw",
  gap: "40px",
  padding: "4vh 5vw",
  backgroundColor: "$backgroundQuaternary",
  color: "$fontPrimary",
});

const FooterContentLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
});

const LogoLayout = styled("div", {
  display: "flex",
  width: "150px",
  height: "fit-content",
});

const LinkLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1.5vh",
});

const LinkHeadline = styled("div", {
  fontSize: "1.3rem",
  fontWeight: "bold",
  textTransform: "uppercase",
  marginBottom: "0.5vh",
});

const StyledLink = styled("a", {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  fontSize: "1.1rem",
  textDecoration: "none",
  color: "$fontPrimary",
  cursor: "pointer",
  transition: "color 0.2s ease-in-out",
  "&:hover": {
    color: "$specialPrimary",
  },
});

const FooterSpacer = styled("div", {
  display: "flex",
  height: "2px",
  backgroundColor: "$fontPrimary",
  width: "100%",
  maxWidth: "1200px",
});

const StyledRightText = styled("div", {
  fontSize: "1.1rem",
  textAlign: "left",
  marginBottom: "0.5vh",
});

const ImprintLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "30px",
});

export const Footer: React.FC<Props> = ({}) => {
  return (
    <>
      <FooterLayout>
        <FooterContentLayout>
          <Link href="/">
            <a>
              <LogoLayout>
                <Image
                  src="/images/Schoolutilities_Logo_Closed.png"
                  alt="SchoolUtilities Logo"
                  width="150"
                  height="98"
                />
              </LogoLayout>
            </a>
          </Link>
          <LinkLayout>
            <LinkHeadline>Company</LinkHeadline>
            <Link href="/imprint">
              <StyledLink>Contact Us</StyledLink>
            </Link>
            <Link href="/about-us">
              <StyledLink>About Us</StyledLink>
            </Link>
          </LinkLayout>
          <LinkLayout>
            <LinkHeadline>Help</LinkHeadline>
            <Link href="/help/help-center">
              <StyledLink>Help Center</StyledLink>
            </Link>
            <Link href="/help/faq">
              <StyledLink>FAQ</StyledLink>
            </Link>
          </LinkLayout>
          <LinkLayout>
            <LinkHeadline>Language</LinkHeadline>
            <Link href="/">
              <StyledLink>
                <Image
                  src="/images/English.png"
                  alt="English"
                  width="30"
                  height="30"
                />
                English
              </StyledLink>
            </Link>
            <Link href="/">
              <StyledLink>
                <Image
                  src="/images/German.png"
                  alt="German"
                  width="30"
                  height="30"
                />
                German
              </StyledLink>
            </Link>
          </LinkLayout>
          <LinkLayout>
            <LinkHeadline>Support Us</LinkHeadline>

            <StyledLink
              href="https://www.patreon.com/schoolutilities"
              target="_blank"
            >
              <Image
                src="/images/Patreon.png"
                alt="Patreon"
                width="30"
                height="30"
              />
              Patreon
            </StyledLink>
          </LinkLayout>
        </FooterContentLayout>
        <FooterSpacer />
        <FooterContentLayout>
          <StyledRightText>
            © 2021, SchoolUtilities - All Rights Reserved
          </StyledRightText>
          <ImprintLayout>
            <Link href="/data-policy">
              <StyledLink>Data-Policy</StyledLink>
            </Link>
            <Link href="/imprint">
              <StyledLink>Imprint</StyledLink>
            </Link>
          </ImprintLayout>
        </FooterContentLayout>
      </FooterLayout>
    </>
  );
};
