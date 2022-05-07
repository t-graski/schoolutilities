import React, { useState } from "react";
import { styled } from "../../stitches.config";
import Link from "next/link";
import NavbarPopOver from "./NavbarPopOver";
import { NavigationMenuPart } from "./NavigationMenuPart";
import UserMenu from "../molecules/UserMenu";
import SvgHamburger from "../atoms/svg/SvgHamburger";
import SvgOpenLogo from "../atoms/svg/SvgOpenLogo";

type Props = {};

const NavbarLayout = styled("div", {
  display: "flex",
  position: "absolute",
  top: 0,
  left: 0,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100vw",
  padding: "0 45px",
  color: "$fontPrimary",
  height: "12vh",
  zIndex: "1",
});

const LogoLayout = styled("div", {
  display: "flex",
  width: "130px",
  height: "fit-content",
  color: "$fontPrimary",
});

const NavLinksLayout = styled("div", {
  "@mobileOnly": {
    display: "none",
  },
});

const SpecialLinkLayout = styled("div", {
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
  width: "45px",
  height: "45px",
  backgroundColor: "transparent",
  border: "none",
  outline: "none",
  display: "none",

  "@mobileOnly": {
    display: "flex",
  },
});

export const Navbar: React.FC<Props> = ({ }) => {
  const [mobileVisible, setMobileVisible] = useState(false);

  return (
    <>
      <NavbarPopOver
        visible={mobileVisible}
        setVisibility={setMobileVisible}
      ></NavbarPopOver>
      <NavbarLayout>
        <Link href="/" passHref>
          <a>
            <LogoLayout>
              <SvgOpenLogo />
            </LogoLayout>
          </a>
        </Link>
        <NavLinksLayout>
          <NavigationMenuPart></NavigationMenuPart>
        </NavLinksLayout>
        <SpecialLinkLayout>
          <Link href="/profile/settings" passHref>
            <UserMenu></UserMenu>
          </Link>
        </SpecialLinkLayout>
        <StyledOpenButton onClick={() => setMobileVisible(true)}>
          <SvgHamburger />
        </StyledOpenButton>
      </NavbarLayout>
    </>
  );
};
