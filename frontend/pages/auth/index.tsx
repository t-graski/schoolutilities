import { styled } from "../../stitches.config";
import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Spacer } from "../../components/Spacer";
import { InfoBox } from "../../components/InfoBox";
import { LoginField } from "../../components/LoginField";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import Head from "next/head";
import { RegistrationField } from "../../components/RegistrationField";
import { useRouter } from "next/router";

const LoginAuthLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  width: "100%",
  gap: "10vw",
  padding: "7vh 15vw",
  minHeight: "80vh",
});

const StyledTabs = styled(TabsPrimitive.Root, {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  boxShadow: `0 2px 10px $fontPrimary`,
});

const StyledList = styled(TabsPrimitive.List, {
  flexShrink: 0,
  display: "flex",
});

const StyledTrigger = styled(TabsPrimitive.Trigger, {
  all: "unset",
  fontFamily: "inherit",
  backgroundColor: "$backgroundPrimary",
  padding: "0 20px",
  height: 45,
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 15,
  lineHeight: 1,
  color: "$fontPrimary",
  cursor: "pointer",
  userSelect: "none",
  borderBottom: "$fontPrimary solid 3px",
  "&:first-child": { borderTopLeftRadius: 6 },
  "&:last-child": { borderTopRightRadius: 6 },
  "&:hover": { color: "$fontPrimary" },
  '&[data-state="active"]': {
    color: "$specialPrimary",
    borderBottom: "$specialPrimary solid 3px",
  },
  "&:focus": {
    position: "relative",
    color: "$specialPrimary",
    borderBottom: "$specialPrimary solid 3px",
  },
});

const StyledContent = styled(TabsPrimitive.Content, {
  flexGrow: 1,
  padding: 20,
  backgroundColor: "$backgroundPrimary",
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
  outline: "none",
  "&:focus": { boxShadow: `0 0 0 2px $fontPrimary` },
});

// Exports
export const Tabs = StyledTabs;
export const TabsList = StyledList;
export const TabsTrigger = StyledTrigger;
export const TabsContent = StyledContent;

// Your app...
const Box = styled("div", {});
const Flex = styled("div", { display: "flex" });

const Text = styled("div", {
  marginBottom: 20,
  color: "$fontPrimary",
  fontSize: 15,
  lineHeight: 1.5,
});

const Button = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,

  variants: {
    variant: {
      violet: {
        backgroundColor: "$backgroundPrimary",
        color: "$fontPrimary",
        boxShadow: `0 2px 10px $fontPrimary`,
        "&:hover": { backgroundColor: "$fontPrimary" },
        "&:focus": { boxShadow: `0 0 0 2px black` },
      },
      green: {
        backgroundColor: "$backgroundPrimary",
        color: "$fontPrimary",
        "&:hover": { backgroundColor: "$fontPrimary" },
        "&:focus": { boxShadow: `0 0 0 2px $fontPrimary` },
      },
    },
  },

  defaultVariants: {
    variant: "violet",
  },
});
const Fieldset = styled("fieldset", {
  all: "unset",
  marginBottom: 15,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
});

const Label = styled("label", {
  fontSize: 13,
  lineHeight: 1,
  marginBottom: 10,
  color: "$fontPrimary",
  display: "block",
});

const Input = styled("input", {
  all: "unset",
  flex: "1 0 auto",
  borderRadius: 4,
  padding: "0 10px",
  fontSize: 15,
  lineHeight: 1,
  color: "$fontPrimary",
  boxShadow: `0 0 0 1px $specialPrimary`,
  height: 35,
  "&:focus": { boxShadow: `0 0 0 2px $fontPrimary` },
});

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  const router = useRouter();

  useEffect(() => {
  if (router.query.tab && router.query.tab === "register" && showLogin) {
    setShowLogin(false);
  }
  }, [router.query.tab, showLogin]);

  return (
    <>
      <Head>
        <title>Login - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <LoginAuthLayout>
        <InfoBox
          headline={showLogin ? "Login" : "Register"}
          info={showLogin ? "Join the world's most advanced community and manage all of your school-activities in the easiest possible way - let’s get a comfortable routine into our daily lives!" : "Join the world's most advanced community and manage all of your school-activities in the easiest possible way - let’s get a comfortable routine into our daily lives!"}
          imageSrc="/images/auth/Sign-Up-Mockup.png"
          imageAlt={showLogin ? "Login Mockup" : "Registration Mockup"}
        ></InfoBox>
        <Box>
          <Tabs
            defaultValue={showLogin ? "login" : "register"}
            onValueChange={(value) => {
              if (value === "login") {
                setShowLogin(true);
                router.push("?tab=login");
              } else {
                setShowLogin(false);
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
