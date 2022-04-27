import Link from "next/link";
import React from "react";
import { styled } from "../../stitches.config";
import Image from "next/image";
import { SvgIcon } from "../atoms/SvgIcon";

type Props = {};

const FooterLayout = styled("footer", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100vw",
  position: "absolute",
  top: "100%",
  left: "0",
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

  "@mobileOnly": {
    flexDirection: "column",
    gap: "50px",
  },
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

  "@mobileOnly": {
    gap: "8px",
  },
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

const FooterSpace = styled("div", {
  opacity: "0",
  padding: "10vh 5vw",
  gap: "40px",
});

const SvgLayout = styled("div", {
  display: "flex",
  width: 30,
  height: 30,
});

const Footer: React.FC<Props> = ({}) => {
  return (
    <>
      {/* <FooterSpace>
        <FooterContentLayout>
          <Link href="/" passHref>
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
            <Link href="/contact-us" passHref>
              <StyledLink>Contact Us</StyledLink>
            </Link>
            <Link href="/about-us" passHref>
              <StyledLink>About Us</StyledLink>
            </Link>
            <Link href="https://schoolutilities.statuspage.io/">
              <StyledLink>Status Info</StyledLink>
            </Link>
          </LinkLayout>
          <LinkLayout>
            <LinkHeadline>Help</LinkHeadline>
            <Link href="/help/help-center" passHref>
              <StyledLink>Help Center</StyledLink>
            </Link>
            <Link href="/help/faq" passHref>
              <StyledLink>FAQ</StyledLink>
            </Link>
          </LinkLayout>
          <LinkLayout>
            <LinkHeadline>Language</LinkHeadline>
            <Link href="/" passHref>
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
            <Link href="/" passHref>
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
            © 2022, SchoolUtilities - All Rights Reserved
          </StyledRightText>
          <ImprintLayout>
            <Link href="/data-policy" passHref>
              <StyledLink>Data-Policy</StyledLink>
            </Link>
            <Link href="/contact-us" passHref>
              <StyledLink>Imprint</StyledLink>
            </Link>
          </ImprintLayout>
        </FooterContentLayout>
      </FooterSpace> */}
      <FooterLayout>
        <FooterContentLayout>
          <Link href="/" passHref>
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
            <Link href="/contact-us" passHref>
              <StyledLink>Contact</StyledLink>
            </Link>
            <Link href="/about-us" passHref>
              <StyledLink>About</StyledLink>
            </Link>
            <Link href="/branding" passHref>
              <StyledLink>Branding</StyledLink>
            </Link>
          </LinkLayout>
          <LinkLayout>
            <LinkHeadline>Support</LinkHeadline>
            <Link href="/help" passHref>
              <StyledLink>Help Center</StyledLink>
            </Link>
            <Link href="/change-logs" passHref>
              <StyledLink>Changelog</StyledLink>
            </Link>
            <Link href="/help/faq" passHref>
              <StyledLink>FAQ</StyledLink>
            </Link>
            <Link href="https://schoolutilities.statuspage.io/" passHref>
              <StyledLink>Status</StyledLink>
            </Link>
          </LinkLayout>
          <LinkLayout>
            <LinkHeadline>Support Us</LinkHeadline>

            <StyledLink
              href="https://www.instagram.com/schoolutilities/"
              target="_blank"
            >
              <Image
                src="/images/icons/instagram.png"
                alt="Instagram"
                width="30"
                height="30"
              />
              Instagram
            </StyledLink>
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
            © 2022, SchoolUtilities - All Rights Reserved
          </StyledRightText>
          <ImprintLayout>
            <Link href="/data-policy" passHref>
              <StyledLink>Data-Policy</StyledLink>
            </Link>
            <Link href="/contact-us" passHref>
              <StyledLink>Imprint</StyledLink>
            </Link>
          </ImprintLayout>
        </FooterContentLayout>
      </FooterLayout>
    </>
  );
};

Footer.defaultProps = {};

export default Footer;
