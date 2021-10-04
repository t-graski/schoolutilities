import React, { useEffect, useState } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import { Spacer } from "./Spacer";
import { useRouter } from "next/router";
import { Navbar } from "./Navbar";
import { Headline } from "./Headline";
import { Separator } from "./Separator";
import { Footer } from "./Footer";

const RegisterAuthLayout = styled("div", {
  width: "100%",
  padding: "0 15vw",
  minHeight: "80vh",
});

export const RegisterAuth = () => {
  const [authStateInfo, setAuthStateInfo] = useState(
    "Ihr Account wird gerade aktiviert..."
  );
  const router = useRouter();
  const { token } = router.query;
  let requestBody = JSON.stringify({
    token: token,
  });
  console.log(token);
  useEffect(() => {
    fetch("localhost:8888/api/auth/activateAccount", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: requestBody,
    })
      .then((response) => response)
      .then((statusCode) => {
        console.log(statusCode);
        if (statusCode == 200) {
          setAuthStateInfo("Ihr Account wurde erfolgreich aktiviert!");
        } else {
          setAuthStateInfo("Ihr Account konnte nicht aktiviert werden!");
        }
      });
  }, []);
  return (
    <>
      <Navbar
        links={[
          {
            href: "/",
            label: "Home",
          },
          {
            href: "/features",
            label: "Features",
          },
          {
            href: "/dashboard",
            label: "Dashboard",
          },
        ]}
      ></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="Registrierungs-Bestätigung"></Headline>
      <Separator width="small" alignment="center" />
      <RegisterAuthLayout>
        <h2>{authStateInfo}</h2>
      </RegisterAuthLayout>
      <Footer
        links={[
          {
            href: "/data-policy",
            label: "Data Policy",
          },
          {
            href: "/imprint",
            label: "Imprint",
          },
          {
            href: "/logout",
            label: "Logout",
          },
        ]}
      ></Footer>
    </>
  );
};