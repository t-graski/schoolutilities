import React, { useEffect, useState } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import cookie from "js-cookie";
import { SvgIcon } from "./SvgIcon";

type Props = {
  links: {
    href: string;
    label: string;
  }[];
  isOnMain?: boolean;
};

const NavbarLayout = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px",
  backgroundColor: "$backgroundSecondary",
  color: "$fontPrimary",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  zIndex: 1,
  flexDirection: "row",
  variants: {
    isOnMain: {
      true: {
        flexDirection: "column",
        position: "column",
        height: "100vh",
        padding: "3vh",
        width: "25vw",
      },
    },
  },
});

const NavbarHeaderLink = styled("a", {
  display: "flex",
  color: "$fontPrimary",
  textDecoration: "none",
  alignItems: "center",
  fontSize: "1.6rem",
  variants: {
    isOnMain: {
      true: {
        flexDirection: "column",
      },
    },
  },
});

const NavbarLogoText = styled("span", {
  display: "inline-block",
  marginLeft: "1vw",
  transition: "all 200ms",
  "&:hover": {
    color: "$specialPrimary",
  },
  variants: {
    isOnMain: {
      true: {
        fontWeight: "700",
      },
    },
  },
});

const NavbarContentLayout = styled("div", {
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
});

const StyledLinkList = styled("ul", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  listStyle: "none",
  variants: {
    isOnMain: {
      true: {
        display: "none",
      },
    },
  },
});

const StyledLink = styled("a", {
  color: "$fontPrimary",
  textDecoration: "none",
  fontSize: "1.2rem",
  padding: "10px",
  textTransform: "uppercase",
  transition: "all 200ms",
  "&:hover": {
    color: "$specialPrimary",
  },
});

const AccountButton = styled("button", {
  display: "flex",
  width: "fix-content",
  padding: "10px",
  alignItems: "center",
  backgroundColor: "$specialPrimary",
  color: "$fontSecondary",
  border: "none",
  borderRadius: "7px",
  cursor: "pointer",
  margin: "0 30px",
  boxShadow: "$accountButton",
  transition: "all 200ms",
  "&:hover": {
    boxShadow: "$accountButtonHover",
  },
});

const AccountButtonText = styled("p", {
  color: "$fontPrimary",
  fontWeight: "700",
  fontSize: "0.9rem",
});

const NavbarLogoLayout = styled("div", {
  position: "relative",
  marginLeft: "10px",

  ["&:before"]: {
    display: "block",
    content: "",
    width: "70px",
    paddingTop: "70px",
  },
  variants: {
    isOnMain: {
      true: {
        marginTop: "2vh",
        ["&:before"]: {
          display: "block",
          content: "",
          width: "12vw",
          maxWidth: "inherit",
          paddingTop: "12vw",
        },
      },
    },
  },
});

const AccountButtonIconLayout = styled("div", {
  position: "relative",
  marginRight: "10px",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  color: "$fontPrimary",
});

const StyledAccountLink = styled("a", {
  textDecoration: "none",
});

export const Navbar: React.FC<Props> = ({ links, isOnMain }) => {
  const [userData, setUserData] = useState(null);
  if (cookie.get("accessToken")) {
    let token = cookie.get("accessToken");
    useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((jsonResponse) => {
          setUserData(jsonResponse);
          console.log(userData);
        });
    }, []);
  }

  return (
    <>
      <NavbarLayout isOnMain={isOnMain}>
        <NavbarHeaderLink href="/" isOnMain={isOnMain}>
          <NavbarLogoLayout isOnMain={isOnMain}>
            <Image
              layout="fill"
              src="/images/avatar.png"
              alt="SchoolUtilities Logo"
            />
          </NavbarLogoLayout>
          <NavbarLogoText isOnMain={isOnMain}>SchoolUtilities</NavbarLogoText>
        </NavbarHeaderLink>

        <NavbarContentLayout>
          <StyledLinkList isOnMain={isOnMain}>
            {links.map((link, index) => (
              <li key={index}>
                <StyledLink href={link.href}>{link.label}</StyledLink>
              </li>
            ))}
          </StyledLinkList>
          <StyledAccountLink href={userData ? "/auth/login" : "/auth/login"}>
            <AccountButton>
              <AccountButtonIconLayout>
                <SvgIcon iconName="SvgUser"></SvgIcon>
              </AccountButtonIconLayout>
              <AccountButtonText>
                {userData ? userData.firstname : "Login"}
              </AccountButtonText>
            </AccountButton>
          </StyledAccountLink>
        </NavbarContentLayout>
      </NavbarLayout>
    </>
  );
};
