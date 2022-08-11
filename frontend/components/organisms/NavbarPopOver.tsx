import React, { memo } from "react";
import { useRouter } from "next/router";
import { styled } from "@stitches/react";
import Link from "next/link";
import UserMenu from "../molecules/UserMenu";
import SvgClose from "../atoms/svg/SvgClose";
import SvgOpenLogo from "../atoms/svg/SvgOpenLogo";
import { loggedIn } from "../../utils/authHelper";
import { Button } from "../atoms/Button";

type Props = {
  setVisibility: Function;
};

const PopOverLayout = styled("div", {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  backgroundColor: "$backgroundSecondary",
  alignItems: "center",
  flexDirection: "column",
  padding: "60px 10px",
  gap: "10px",
  zIndex: "20",
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

export const NavbarPopOverPureComponent: React.FC<Props> = ({ setVisibility }) => {
  const router = useRouter();

  const isLoggedIn = loggedIn();
  return (
    <>
      <PopOverLayout>
        <StyledCloseButton onClick={() => setVisibility(false)}>
          <SvgClose />
        </StyledCloseButton>
        <Link href="/" passHref>
          <a>
            <LogoLayout>
              <SvgOpenLogo />
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
            {isLoggedIn ? (
              <UserMenu></UserMenu>
            ) : (
              <Button
                backgroundColor={"primary"}
                color={"primary"}
                onClick={() => {
                  router.push("/auth?tab=register");
                }}
              >
                LOG IN
              </Button>
            )}
          </SpecialLinkLayout>
        </NavLinksLayout>
      </PopOverLayout>
    </>
  );
};

export default memo(NavbarPopOverPureComponent);
