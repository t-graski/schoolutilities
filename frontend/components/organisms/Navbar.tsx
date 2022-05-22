import React, { useEffect, useState } from "react";
import { styled } from "../../stitches.config";
import Link from "next/link";
import { loggedIn } from "../../utils/authHelper";
import { Button } from "../atoms/Button";
import dynamic from "next/dynamic";

const UserMenu = dynamic(() => import("../molecules/UserMenu"));
const NavigationMenuPart = dynamic(() => import("./NavigationMenuPart"));
const NavbarPopOver = dynamic(() => import("./NavbarPopOver"));
const SvgHamburger = dynamic(() => import("../atoms/svg/SvgHamburger"));
const SvgOpenLogo = dynamic(() => import("../atoms/svg/SvgOpenLogo"));

type Props = {};

const NavbarLayout = styled("div", {
  zIndex: "2",

  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100vw",
  padding: "0 50px",

  color: "$fontPrimary",
});

const LogoLayout = styled("div", {
  width: "130px",

  color: "$fontPrimary",
});

const NavLinksLayout = styled("div", {
  "@mobileOnly": {
    display: "none",
  },
});

const SpecialLinkLayout = styled("div", {
  zIndex: "2",

  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  color: "$fontPrimary",

  "@mobileOnly": {
    display: "none",
  },
});

const StyledOpenButton = styled("button", {
  zIndex: "2",

  width: "45px",
  height: "45px",
  backgroundColor: "transparent",
  border: "none",
  outline: "none",
  color: "$fontPrimary",
  display: "none",

  "@mobileOnly": {
    display: "flex",
  },
});

const PopOverLayout = styled("div", {
  display: "none",

  variants: {
    visible: {
      true: {
        display: "flex",
      },
      false: {
        display: "none",
      },
    },
  },

  defaultVariants: {
    visible: "false",
  },
});

const Navbar: React.FC<Props> = ({}) => {
  const [mobileVisible, setMobileVisible] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn());

  return (
    <>
      <PopOverLayout visible={mobileVisible}>
        <NavbarPopOver setVisibility={setMobileVisible}></NavbarPopOver>
      </PopOverLayout>
      <NavbarLayout>
        <Link href="/" passHref>
          <a aria-label="Startpage">
            <LogoLayout>
              <SvgOpenLogo />
            </LogoLayout>
          </a>
        </Link>
        <NavLinksLayout>
          <NavigationMenuPart></NavigationMenuPart>
        </NavLinksLayout>
        <SpecialLinkLayout>
          {isLoggedIn ? (
            <UserMenu setIsLoggedIn={setIsLoggedIn}></UserMenu>
          ) : (
            <Link href="/auth?tab=login" passHref>
              <Button backgroundColor={"primary"} color={"primary"}>
                LOG IN
              </Button>
            </Link>
          )}
        </SpecialLinkLayout>
        <StyledOpenButton
          onClick={() => setMobileVisible(true)}
          aria-label="Open hamburger menu"
        >
          <SvgHamburger />
        </StyledOpenButton>
      </NavbarLayout>
    </>
  );
};

Navbar.defaultProps = {};

export default Navbar;
