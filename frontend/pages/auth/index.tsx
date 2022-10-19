import { styled } from "../../stitches.config";
import React, { useEffect, useState } from "react";
const Navbar = dynamic(() => import("../../components/organisms/Navbar"));
import Footer from "../../components/organisms/Footer";
import { Spacer } from "../../components/atoms/Spacer";
import { InfoBox } from "../../components/molecules/InfoBox";
import { LoginField } from "../../components/molecules/auth/LoginField";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import Head from "next/head";
import { RegistrationField } from "../../components/molecules/auth/RegistrationField";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const LoginAuthLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  width: "100%",
  gap: "10vw",
  padding: "7vh 15vw",
  minHeight: "80vh",

  "@mobileOnly": {
    gridTemplateColumns: "1fr",
    gap: "10vw",
    padding: "7vh 5vw",
  },
});

const StyledTabs = styled(TabsPrimitive.Root, {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  boxShadow: `0 2px 10px $neutral-500`,
});

const StyledList = styled(TabsPrimitive.List, {
  flexShrink: 0,
  display: "flex",
  borderRadius: "$1x",
  overflow: "hidden",
});

const StyledTrigger = styled(TabsPrimitive.Trigger, {
  all: "unset",
  fontFamily: "inherit",
  backgroundColor: "$surface1",
  padding: "0 20px",
  height: 45,
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 15,
  lineHeight: 1,
  color: "$onSurface",
  cursor: "pointer",
  userSelect: "none",
  borderBottom: "$neutral-500 solid 3px",
  transition: "all 0.2s",
  "&:hover": { backgroundColor: "$surface4" },
  '&[data-state="active"]': {
    borderBottom: "$warning solid 3px",
    backgroundColor: "$surface4",
  },
  "&:focus": {
    position: "relative",
    backgroundColor: "$surface4",
    borderBottom: "$warning solid 3px",
  },
});

const StyledContent = styled(TabsPrimitive.Content, {
  flexGrow: 1,
  paddingTop: 20,
  backgroundColor: "$neutral-100",
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
  outline: "none",
  "&:focus": { boxShadow: `0 0 0 2px $neutral-500` },
});

// Exports
export const Tabs = StyledTabs;
export const TabsList = StyledList;
export const TabsTrigger = StyledTrigger;
export const TabsContent = StyledContent;

// Your app...
const Box = styled("div", {});

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  const router = useRouter();

  if (router.query.tab && router.query.tab === "register" && showLogin) {
    setShowLogin(false);
  } else if (router.query.tab && router.query.tab === "login" && !showLogin) {
    setShowLogin(true);
  }

  return (
    <>
      <Head>
        <title>{showLogin ? "Login" : "Register"} - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <LoginAuthLayout>
        <InfoBox
          headline={showLogin ? "Login" : "Register"}
          info={
            showLogin
              ? "Join the world's most advanced community and manage all of your school-activities in the easiest possible way - let’s get a comfortable routine into our daily lives!"
              : "Join the world's most advanced community and manage all of your school-activities in the easiest possible way - let’s get a comfortable routine into our daily lives!"
          }
          imageSrc="/images/Registration-Login-Artwork.svg"
          imageAlt={showLogin ? "Login Mockup" : "Registration Mockup"}
        ></InfoBox>
        <Box>
          <Tabs
            defaultValue={"login"}
            value={showLogin ? "login" : "register"}
            onValueChange={(value) => {
              if (value === "login") {
                router.push("?tab=login");
              } else {
                router.push("?tab=register");
              }
            }}
          >
            <TabsList aria-label="Manage your account">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginField></LoginField>
            </TabsContent>
            <TabsContent value="register">
              <RegistrationField></RegistrationField>
            </TabsContent>
          </Tabs>
        </Box>
      </LoginAuthLayout>
      <Footer></Footer>
    </>
  );
}
