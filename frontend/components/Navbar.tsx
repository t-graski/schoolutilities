import React, { useEffect, useState } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import cookie from "js-cookie";
import { SvgIcon } from "./SvgIcon";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {};

const NavbarLayout = styled("div", {
  display: "flex",
  position: "fixed",
  top: 0,
  left: 0,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "$backgroundPrimary",
  width: "100vw",
  padding: "0 79px",
  color: "$fontPrimary",
  height: "18vh",
  zIndex: "1",
});

const LogoLayout = styled("div", {
  display: "flex",
  width: "160px",
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
});

const StyledLink = styled("a", {
  color: "$fontPrimary",
  textDecoration: "none",
  cursor: "pointer",
  fontSize: "1.7rem",
  paddingBottom: "5px",
  ":hover": {
    color: "$fontPrimary",
    borderBottom: "2px solid $fontPrimary",
    cursor: "pointer",
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

export const Navbar: React.FC<Props> = ({}) => {
  const router = useRouter();
  return (
    <>
      <NavbarLayout>
        <Link href="/">
          <a>
            <LogoLayout>
              <SvgIcon iconName="SvgOpenLogo" />
            </LogoLayout>
          </a>
        </Link>
        <NavLinksLayout>
          <Link href="/">
            <StyledLink marked={router.pathname === "/"}>HOME</StyledLink>
          </Link>
          <Link href="/features">
            <StyledLink marked={router.pathname === "/features"}>
              FEATURES
            </StyledLink>
          </Link>
          <Link href="/about">
            <StyledLink marked={router.pathname === "/about-us"}>ABOUT</StyledLink>
          </Link>
        </NavLinksLayout>
      </NavbarLayout>
    </>
  );
};
