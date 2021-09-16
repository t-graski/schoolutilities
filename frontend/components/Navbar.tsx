import React, { useEffect, useState } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import cookie from "js-cookie";

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

  ["&:before"]: {
    display: "block",
    content: "",
    width: "30px",
    paddingTop: "30px",
  },
});

const StyledAccountImage = styled(Image, {
  borderRadius: "50%",
});

const StyledAccountLink = styled("a", {
  textDecoration: "none",
});

export const Navbar: React.FC<Props> = ({ links, isOnMain }) => {
  const [userData, setUserData] = useState(null);
  if (cookie.get("access_token")) {
    let token = cookie.get("access_token");
    useEffect(() => {
      fetch("https://discord.com/api/users/@me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((jsonResponse) => {
          setUserData(jsonResponse);
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
            {links.map((link) => (
              <li>
                <StyledLink href={link.href}>{link.label}</StyledLink>
              </li>
            ))}
          </StyledLinkList>
          <StyledAccountLink
            href={userData ? "/dashboard" : process.env.DISCORD_LOGIN_URL}
          >
            <AccountButton>
              <AccountButtonIconLayout>
                <StyledAccountImage
                  layout="fill"
                  src={
                    userData
                      ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}`
                      : "/images/user.svg"
                  }
                  alt="SchoolUtilities Logo"
                />
              </AccountButtonIconLayout>
              <AccountButtonText>
                {userData ? userData.username : "Login"}
              </AccountButtonText>
            </AccountButton>
          </StyledAccountLink>
        </NavbarContentLayout>
      </NavbarLayout>
    </>
  );
};