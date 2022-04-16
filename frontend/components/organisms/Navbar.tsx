import React, { useState } from "react";
import { styled } from "../../stitches.config";
import { SvgIcon } from "../atoms/SvgIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import UserMenu from "../molecules/UserMenu";
import NavbarPopOver from "./NavbarPopOver";

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
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "fit-content",
  gap: "30px",

  "@mobileOnly": {
    display: "none",
  },
});

const StyledLink = styled("a", {
  color: "$fontPrimary",
  textDecoration: "none",
  cursor: "pointer",
  fontSize: "1.7rem",
  paddingBottom: "5px",
  transition: "all 200ms ease-in-out",
  "&:hover": {
    color: "$specialPrimary",
  },

  variants: {
    marked: {
      true: {
        borderBottom: "2px solid $fontPrimary",
      },
      false: {
        borderBottom: "none",
      },
    },
  },
});

const SpecialLinkLayout = styled("div", {
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "$fontPrimary",
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

export const Navbar: React.FC<Props> = ({}) => {
  const router = useRouter();

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
              <SvgIcon iconName="SvgOpenLogo" />
            </LogoLayout>
          </a>
        </Link>
        <NavLinksLayout>
          <Link href="/" passHref>
            <StyledLink marked={router.pathname === "/"}>HOME</StyledLink>
          </Link>
          <Link href="/school/select" passHref>
            <StyledLink marked={router.pathname === "/school/select"}>
              MY SCHOOLS
            </StyledLink>
          </Link>
          <Link href="/change-logs" passHref>
            <StyledLink marked={router.pathname === "/change-logs"}>
              CHANGE-LOG
            </StyledLink>
          </Link>
          <SpecialLinkLayout>
            <Link href="/profile/settings" passHref>
              <UserMenu></UserMenu>
            </Link>
          </SpecialLinkLayout>
        </NavLinksLayout>
        <StyledOpenButton onClick={() => setMobileVisible(true)}>
          <SvgIcon iconName="SvgHamburger" />
        </StyledOpenButton>
      </NavbarLayout>
    </>
  );
};
