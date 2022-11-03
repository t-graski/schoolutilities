import Link from "next/link";
import React from "react";
import { styled } from "../../stitches.config";
import SvgLogoPencilCombinedCompact from "../atoms/svg/SvgLogoPencilCombinedCompact";
import SvgPatreon from "../atoms/svg/SvgPatreon";
import SvgInstagram from "../atoms/svg/SvgInstagram";

type Props = {};

const FooterLayout = styled("footer", {
  position: "absolute",
  top: "100%",
  left: "0",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100vw",
  gap: "40px",
  padding: "4vh 5vw",

  backgroundColor: "$surfaceVariant",
  color: "$neutral-500",
});

const FooterContentLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",

  "@mobileOnly": {
    flexDirection: "column",
    gap: "50px",
  },
});

const LogoLayout = styled("div", {
  display: "flex",
  width: "150px",
  height: "98px",

  color: "$onBackground",
});

const LinkLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1.5vh",

  "@mobileOnly": {
    gap: "8px",
  },
});

const LinkHeadline = styled("div", {
  marginBottom: "0.5vh",
  padding: "$1x $2x",

  fontSize: "1.3rem",
  fontWeight: "bold",
  textTransform: "uppercase",
});

const StyledLink = styled(Link, {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  padding: "$1x $2x",
  borderRadius: "$1x",

  fontSize: "1.1rem",
  textDecoration: "none",
  color: "$onBackground",
  cursor: "pointer",
  width: "fit-content",
  backgroundColor: "$surfaceVariant",
  transition: "color 0.2s ease-in-out",

  "&:hover": {
    backgroundColor: "$surface2",
  },
});

const FooterSpacer = styled("div", {
  display: "flex",
  height: "2px",
  width: "100%",
  maxWidth: "1200px",

  backgroundColor: "$neutral-500",
});

const StyledRightText = styled("div", {
  marginBottom: "0.5vh",

  fontSize: "1.1rem",
  textAlign: "left",
});

const ImprintLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "30px",
});

const IconLayout = styled("div", {
  display: "flex",
  width: "30px",
  height: "30px",
  padding: "5px",
});

const Footer: React.FC<Props> = ({}) => {
  return (
    <>
      <FooterLayout>
        <FooterContentLayout>
          <Link href="/" passHref aria-label="Startpage">
            <LogoLayout>
              <SvgLogoPencilCombinedCompact></SvgLogoPencilCombinedCompact>
            </LogoLayout>
          </Link>
          <LinkLayout>
            <LinkHeadline>Company</LinkHeadline>
            <StyledLink href="/contact-us" passHref>
              Contact
            </StyledLink>
            <StyledLink href="/about-us" passHref>
              About
            </StyledLink>
            <StyledLink href="/branding" passHref>
              Branding
            </StyledLink>
          </LinkLayout>
          <LinkLayout>
            <LinkHeadline>Support</LinkHeadline>
            <StyledLink href="/help" passHref>
              Help Center
            </StyledLink>
            <StyledLink href="/change-logs" passHref>
              Changelog
            </StyledLink>
            <StyledLink href="/help/faq" passHref>
              FAQ
            </StyledLink>
            <StyledLink
              target={"_blank"}
              href="https://schoolutilities.statuspage.io/"
              passHref
            >
              Status
            </StyledLink>
          </LinkLayout>
          <LinkLayout>
            <LinkHeadline>Support Us</LinkHeadline>

            <StyledLink
              href="https://www.instagram.com/schoolutilities/"
              target="_blank"
            >
              <IconLayout>
                <SvgInstagram></SvgInstagram>
              </IconLayout>
              Instagram
            </StyledLink>
            <StyledLink
              href="https://www.patreon.com/schoolutilities"
              target="_blank"
            >
              <IconLayout>
                <SvgPatreon></SvgPatreon>
              </IconLayout>
              Patreon
            </StyledLink>
          </LinkLayout>
        </FooterContentLayout>
        <FooterSpacer />
        <FooterContentLayout>
          <StyledRightText>
            © 2022, SchoolUtilities - All Rights Reserved
          </StyledRightText>
          <ImprintLayout>
            <StyledLink href="/data-policy" passHref>
              Data-Policy
            </StyledLink>
            <StyledLink href="/contact-us" passHref>
              Imprint
            </StyledLink>
          </ImprintLayout>
        </FooterContentLayout>
      </FooterLayout>
    </>
  );
};

Footer.defaultProps = {};

export default Footer;
