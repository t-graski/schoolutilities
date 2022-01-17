import React, { useEffect, useState } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import { Spacer } from "./Spacer";
import { useRouter } from "next/router";
import { Navbar } from "./OldNavbar";
import { Headline } from "./Headline";
import { Separator } from "./Separator";
import { Footer } from "./OldFooter";
import fetch from "node-fetch";

if (!globalThis.fetch) {
  //@ts-ignore
  globalThis.fetch = fetch;
}

const RegisterAuthLayout = styled("div", {
  width: "100%",
  padding: "0 15vw",
  minHeight: "80vh",
});
let isSent = false;

export const RegisterAuth = () => {
  const [authStateInfo, setAuthStateInfo] = useState(
    "Ihr Account wird gerade aktiviert..."
  );
  const router = useRouter();
  const { token } = router.query;
  if (token && !isSent) {
    isSent = true;
    let requestBody = JSON.stringify({
      token: token,
    });
    console.log(requestBody);
    fetch(`https://backend.schoolutilities.net/api/user/activateAccount`, {
      method: "POST",
      body: requestBody,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.status)
      .then((statusCode) => {
        console.log(statusCode);
        if (statusCode == 200) {
          setAuthStateInfo("Ihr Account wurde erfolgreich aktiviert!");
        } else {
          setAuthStateInfo("Ihr Account konnte nicht aktiviert werden!");
        }
      });
  }
  return (
    <>
      <Spacer size="medium"></Spacer>
      <Headline label="Registrierungs-Bestätigung"></Headline>
      <Separator width="small" alignment="center" />
      <RegisterAuthLayout>
        <h2>{authStateInfo}</h2>
      </RegisterAuthLayout>
    </>
  );
};
