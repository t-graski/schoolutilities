import React from "react";
import { useRouter } from "next/router";

// this usually goes once
// to the entry point of the whole app
// (e.g. src/index.js)
import "react-nestable/dist/styles/index.css";
import { SvgIcon } from "../atoms/SvgIcon";
import { styled } from "@stitches/react";
import Link from "next/link";
import UserMenu from "../molecules/UserMenu";

type Props = {
  visible: boolean;
  setVisibility: Function;
};

const PopOverLayout = styled("div", {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  backgroundColor: "$backgroundSecondary",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  padding: "60px 10px",
  gap: "10px",
  zIndex: "20",
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
});

const LogoLayout = styled("div", {
  display: "flex",
  width: "130px",
  height: "fit-content",
  color: "$fontPrimary",
});

const NavLinksLayout = styled("div", {
  marginTop: "50px",
  display: "flex",
  flexDirection: "column",
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

const StyledCloseButton = styled("button", {
  position: "absolute",
  top: "20px",
  right: "20px",
  width: "45px",
  height: "45px",
  backgroundColor: "transparent",
  border: "none",
  outline: "none",
  color: "$fontPrimary",
  fontSize: "2.5rem",
});

export const NavbarPopOver: React.FC<Props> = ({ visible, setVisibility }) => {
  const router = useRouter();
  return (
    <>
      <PopOverLayout visible={visible}>
        <StyledCloseButton onClick={() => setVisibility(false)}>
          <SvgIcon iconName="SvgClose" />
        </StyledCloseButton>
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
          <Link href="/school/select">
            <StyledLink marked={router.pathname === "/school/select"}>
              MY SCHOOLS
            </StyledLink>
          </Link>
          <Link href="/change-logs">
            <StyledLink marked={router.pathname === "/change-logs"}>
              CHANGE-LOG
            </StyledLink>
          </Link>
          <SpecialLinkLayout>
            <Link href="/profile/settings">
              <UserMenu></UserMenu>
            </Link>
          </SpecialLinkLayout>
        </NavLinksLayout>
      </PopOverLayout>
    </>
  );
};

export default NavbarPopOver;
