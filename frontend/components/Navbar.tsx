import React from "react";
import { styled } from "../stitches.config";
import Image from "next/image";

type Props = {
  someProps: string;
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
});

const NavbarHeaderLink = styled("a", {
  display: "flex",
  color: "$fontPrimary",
  textDecoration: "none",
  alignItems: "center",
  fontSize: "1.6rem",
});

const NavbarLogoText = styled("span", {
  display: "inline-block",
  marginLeft: "1vw",
  transition: "all 200ms",
  "&:hover": {
    color: "$specialPrimary",
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
  marginLeft: '10px',

  ["&:before"]: {
    display: "block",
    content: "",
    width: "70px",
    paddingTop: "70px"
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

export const Navbar: React.FC<Props> = ({ someProps }) => {
  return (
    <>
      <NavbarLayout>
        <NavbarHeaderLink href="/">
          <NavbarLogoLayout>
            <Image
              layout="fill"
              src="/images/avatar.png"
              alt="SchoolUtilities Logo"
            />
          </NavbarLogoLayout>
          <NavbarLogoText>SchoolUtilities</NavbarLogoText>
        </NavbarHeaderLink>

        <NavbarContentLayout>
          <StyledLinkList>
            <li>
              <StyledLink href="index.html">Home</StyledLink>
            </li>
            <li>
              <StyledLink href="features.html">Features</StyledLink>
            </li>
            <li>
              <StyledLink href="dashboard.html">Dashboard</StyledLink>
            </li>
          </StyledLinkList>
          <AccountButton>
            <AccountButtonIconLayout>
              <StyledAccountImage
                layout="fill"
                src="/images/user.svg"
                alt="SchoolUtilities Logo"
              />
            </AccountButtonIconLayout>
            <AccountButtonText>Login</AccountButtonText>
          </AccountButton>
        </NavbarContentLayout>
      </NavbarLayout>
    </>
  );
};
