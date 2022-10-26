import React from "react";
import { styled } from "../../../stitches.config";
import Image from "next/image";
import Link from "next/link";

export type SideDashboardProps = {
  links: {
    icon?: any;
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
  isOpen: boolean;
  setIsOpen: Function;
};

const DashboardNavbarLayout = styled("div", {
  padding: "20px",
  paddingBottom: "120px",
  width: "100%",
  maxWidth: "350px",
  marginTop: "12vh",
  height: "88vh",
  alignItems: "center",
  "&[data-size='small']": {
    width: "fit-content",
  },
});

const DashboardTopLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  height: "100%",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
});

const HamburgerMenuButton = styled("button", {
  width: "fit-content",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  padding: "0 24px",
});

const LinksLayout = styled("div", {
  display: "grid",
  gap: "33px",
  width: "100%",
});

const LinkLabel = styled("p", {
  fontWeight: "bold",
  variants: {
    color: {
      primary: {
        color: "$neutral-500",
      },
      secondary: {
        color: "$neutral-300",
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
  width: "33.33vw",
  color: "$neutral-500",
  maxWidth: "350px",
  "&[data-size='small']": {
    justifyContent: "center",
    width: "fit-content",
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

const SvgIconLayout = styled("div", {
  display: "inline-block",
  width: "30px",
  height: "30px",
  color: "black",
  variants: {
    color: {
      highlighted: {
        color: "$neutral-300",
      },
      normal: {
        color: "$neutral-500",
      },
    },
  },
});

export const SideDashboard: React.FC<SideDashboardProps> = ({
  links,
  specialButton,
  isOpen,
  setIsOpen,
}) => {
  const LinkLayout = styled(Link, {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "20px",
    width: "calc(33.33vw-40px)",
    padding: "24px",
    borderRadius: "$normal",
    backgroundColor: "$neutral-300",
    cursor: "pointer",
    color: "$neutral-500",
    textDecoration: "none",
    "&[data-size='small']": {
      justifyContent: "center",
      width: "fit-content",
    },
    variants: {
      color: {
        primary: {},
        secondary: {
          backgroundColor: "$neutral-500",
        },
        special: {
          backgroundColor: "$warning",
        },
      },
    },
  });

  return (
    <>
      <DashboardNavbarLayout data-size={isOpen ? "normal" : "small"}>
        <DashboardTopLayout>
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

              const Icon = link.icon;

              return (
                <LinkLayout
                  color={link.highlighted ? "secondary" : "primary"}
                  data-size={isOpen ? "normal" : "small"}
                  href={link.href}
                  key={index}
                  passHref
                >
                  <SvgIconLayout
                    color={link.highlighted ? "highlighted" : "normal"}
                  >
                    <Icon />
                  </SvgIconLayout>
                  {isOpen && (
                    <LinkLabel
                      color={link.highlighted ? "secondary" : "primary"}
                    >
                      {link.label}
                    </LinkLabel>
                  )}
                </LinkLayout>
              );
            })}
          </LinksLayout>
        </DashboardTopLayout>
        {specialButton && (
          <SpecialLinkLayout data-size={isOpen ? "normal" : "small"}>
            <SecondButtonLayout>
              <LinkLayout
                color="special"
                data-size={isOpen ? "normal" : "small"}
                href={specialButton.href}
                passHref
              >
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
