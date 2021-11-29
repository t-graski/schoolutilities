import React, { useEffect } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";
import { InputField } from "./InputField";
import { Button } from "./Button";
import Link from "next/link";
import { regex } from "../misc/regex";
import { useRouter } from "next/router";
import { Headline } from "./Headline";
import { Separator } from "./Separator";

type Props = {
  links: {
    imageSrc: string;
    imageDarkSrc: string;
    imageAlt: string;
    label: string;
    href: string;
    highlighted?: boolean;
  }[];
  specialButton?: {
    imageSrc: string;
    imageAlt: string;
    label: string;
    href: string;
    onClickImageSrc: string;
    onClickImageAlt: string;
    onClickImageFunction: Function;
  };
};

const DashboardNavbarLayout = styled("div", {
  padding: "20px",
  backgroundColor: "$backgroundQuaternary",
  width: "30vw",
  height: "100vh",
  position: "fixed",
  alignItems: "center",
  top: "0",
  left: "0",
  variants: {
    size: {
      small: {
        width: "10vw",
      },
      normal: {},
    },
  },
});

const DashboardTopLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  height: "85%",
});

const LogoLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  gap: "20px",
  alignItems: "center",
  width: "100%",
  justifySelf: "flex-start",
});

const LogoHeadline = styled("h1", {
  fontWeight: "normal",
  color: "$specialPrimary",
});

const BoldFont = styled("span", {
  fontWeight: "bold",
  color: "$specialPrimary",
});

const HamburgerMenuButton = styled("button", {
  width: "fit-content",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
});

const LinksLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "33px",
  width: "100%",
});

const LinkLayout = styled("a", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "20px",
  width: "100%",
  padding: "24px",
  borderRadius: "$normal",
  backgroundColor: "$backgroundTertiary",
  cursor: "pointer",
  variants: {
    color: {
      primary: {},
      secondary: {
        backgroundColor: "$fontPrimary",
      },
      special: {
        backgroundColor: "$specialPrimary",
      },
    },
    size: {
      small: {
        padding: "15px",
        justifyContent: "center",
        width: "fit-content",
      },
      normal: {},
    },
  },
});

const LinkLabel = styled("p", {
  fontWeight: "bold",
  variants: {
    color: {
      primary: {},
      secondary: {
        color: "$backgroundTertiary",
      },
      special: {
        fontWeight: "normal",
      },
    },
  },
});

const SpecialLinkLayout = styled("div", {
  position: "fixed",
  bottom: "0",
  left: "0",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  variants: {
    size: {
      small: {
        width: "10vw",
      },
      normal: {
        width: "30vw",
      },
    },
  },
});

const ImageButton = styled("button", {
  backgroundColor: "transparent",
  border: "none",
  justifySelf: "flex-end",
  position: "absolute",
  right: "0",
  top: "0",
  cursor: "pointer",
  padding: "0 24px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  height: "100%",
  zIndex: "1",
});

const SecondButtonLayout = styled("div", {
  position: "relative",
  width: "100%",
});

export const SideDashboard: React.FC<Props> = ({ links, specialButton }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      <DashboardNavbarLayout size={isOpen ? "normal" : "small"}>
        <DashboardTopLayout>
          <LogoLayout>
            <Image
              src="/images/avatar 1.png"
              alt="logo"
              width={70}
              height={70}
            />
            {isOpen && (
              <LogoHeadline>
                School
                <br />
                <BoldFont>Utilities</BoldFont>
              </LogoHeadline>
            )}
          </LogoLayout>
          <HamburgerMenuButton
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <Image
              src="/images/icons/hamburger_icon.svg"
              alt="Hamburger Menu"
              width={30}
              height={30}
            />
          </HamburgerMenuButton>
          <LinksLayout>
            {links.map((link, index) => {
              if (!link.highlighted) {
                link.highlighted = false;
              }
              return (
                <Link href={link.href} key={index}>
                  <LinkLayout
                    color={link.highlighted ? "secondary" : "primary"}
                    size={isOpen ? "normal" : "small"}
                  >
                    <Image
                      src={link.highlighted ? link.imageDarkSrc : link.imageSrc}
                      alt={link.imageAlt}
                      width={30}
                      height={30}
                    />
                    {isOpen && (
                      <LinkLabel
                        color={link.highlighted ? "secondary" : "primary"}
                      >
                        {link.label}
                      </LinkLabel>
                    )}
                  </LinkLayout>
                </Link>
              );
            })}
          </LinksLayout>
        </DashboardTopLayout>
        {specialButton && (
          <SpecialLinkLayout size={isOpen ? "normal" : "small"}>
            <SecondButtonLayout>
              <Link href={specialButton.href}>
                <LinkLayout color="special" size={isOpen ? "normal" : "small"}>
                  <Image
                    src={specialButton.imageSrc}
                    alt={specialButton.imageAlt}
                    width={30}
                    height={30}
                  />

                  {isOpen && (
                    <LinkLabel color="special">{specialButton.label}</LinkLabel>
                  )}
                </LinkLayout>
              </Link>
              {isOpen && (
                <ImageButton
                  onClick={() => {
                    specialButton.onClickImageFunction();
                  }}
                >
                  <Image
                    src={specialButton.onClickImageSrc}
                    alt={specialButton.onClickImageAlt}
                    width={20}
                    height={20}
                  />
                </ImageButton>
              )}
            </SecondButtonLayout>
          </SpecialLinkLayout>
        )}
      </DashboardNavbarLayout>
    </>
  );
};
