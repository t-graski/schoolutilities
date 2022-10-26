import React, { useEffect, useState } from "react";
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
  backgroundColor: "$neutral-400",
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
  color: "$neutral-500",
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

const StyledLink = styled(Link, {
  color: "$neutral-500",
  textDecoration: "none",
  cursor: "pointer",
  fontSize: "1.7rem",
  paddingBottom: "5px",
  transition: "all 200ms ease-in-out",
  "&:hover": {
    color: "$warning",
  },

  variants: {
    marked: {
      true: {
        borderBottom: "2px solid $neutral-500",
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
  color: "$neutral-500",
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
  color: "$neutral-500",
  fontSize: "2.5rem",
});

export const NavbarPopOver: React.FC<Props> = ({ setVisibility }) => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(loggedIn());
  }, []);

  return (
    <>
      <PopOverLayout>
        <StyledCloseButton onClick={() => setVisibility(false)}>
          <SvgClose />
        </StyledCloseButton>
        <Link href="/" passHref>
          <LogoLayout>
            <SvgOpenLogo />
          </LogoLayout>
        </Link>
        <NavLinksLayout>
          <StyledLink marked={router.pathname === "/"} href="/" passHref>
            HOME
          </StyledLink>
          <StyledLink
            marked={router.pathname === "/school/select"}
            href="/school/select"
            passHref
          >
            MY SCHOOLS
          </StyledLink>
          <StyledLink
            marked={router.pathname === "/change-logs"}
            href="/change-logs"
            passHref
          >
            CHANGE-LOG
          </StyledLink>
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

export default NavbarPopOver;
