import React, { useEffect, useState } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import cookie from "js-cookie";
import { SvgIcon } from "./SvgIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import { getUserData } from "../misc/authHelper";

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
});

const StyledLink = styled("a", {
  color: "$fontPrimary",
  textDecoration: "none",
  cursor: "pointer",
  fontSize: "1.7rem",
  paddingBottom: "5px",
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
  width: "100%",
  color: "$fontPrimary",
});

const LinkLayout = styled("a", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "20px",
  width: "100%",
  padding: "15px 20px",
  borderRadius: "20px",
  backgroundColor: "$backgroundTertiary",
  cursor: "pointer",
  "&[data-size='small']": {
    justifyContent: "center",
    width: "fit-content",
  },
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
  },
});

const IconLayout = styled("div", {
  width: "30px",
  height: "30px",
});

const LinkContentLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "70%",
});

const LinkLabel = styled("p", {
  fontWeight: "bold",
  variants: {
    color: {
      primary: {
        color: "$fontPrimary",
      },
      secondary: {
        color: "$backgroundTertiary",
      },
      special: {
        fontWeight: "normal",
      },
    },
  },
});


export const Navbar: React.FC<Props> = ({}) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
  });
  const router = useRouter();
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const fetchedData = await getUserData();
    setUserData(fetchedData);
  }
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
          <Link href="/about-us">
            <StyledLink marked={router.pathname === "/about-us"}>
              ABOUT
            </StyledLink>
          </Link>
          {userData && userData.firstName && (
            <SpecialLinkLayout>
              <Link href="/profile/settings">
                <LinkLayout color="primary">
                  <IconLayout>
                    <SvgIcon iconName="SvgUser" />
                  </IconLayout>
                  <LinkContentLayout>
                    <LinkLabel color="special">
                      {userData.firstName} {userData.lastName}
                    </LinkLabel>
                  </LinkContentLayout>
                </LinkLayout>
              </Link>
            </SpecialLinkLayout>
          )}
        </NavLinksLayout>
      </NavbarLayout>
    </>
  );
};
