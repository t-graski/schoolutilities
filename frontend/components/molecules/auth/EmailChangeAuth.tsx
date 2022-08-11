import React, { useEffect, useState } from "react";
import { styled } from "../../../stitches.config";
import { Spacer } from "../../atoms/Spacer";
import { useRouter } from "next/router";
import { Headline } from "../../atoms/Headline";
import Separator from "../../atoms/Separator";

const RegisterAuthLayout = styled("div", {
  width: "100%",
  padding: "0 15vw",
  minHeight: "80vh",
});
let isSent = false;

export const EmailChangeAuth = () => {
  const [authStateInfo, setAuthStateInfo] = useState(
    "Ihre Email wird gerade geändert..."
  );
  const router = useRouter();
  const { token } = router.query;
  useEffect(() => {
    if (token && !isSent) {
      isSent = true;
      let requestBody = JSON.stringify({
        token: token,
      });
      console.log(requestBody);
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/activateNewEmail`,
        {
          method: "POST",
          body: requestBody,
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.status)
        .then((statusCode) => {
          console.log(statusCode);
          if (statusCode == 200) {
            setAuthStateInfo("Ihre Email wurde erfolgreich geändert");
          } else {
            setAuthStateInfo("Ihre Email konnte nicht geändert werden");
          }
        });
    }
  }, [token]);
  return (
    <>
      <Spacer size="medium"></Spacer>
      <Headline label="Email-Änderungs-Bestätigung"></Headline>
      <Separator width="small" alignment="center" />
      <RegisterAuthLayout>
        <h2>{authStateInfo}</h2>
      </RegisterAuthLayout>
    </>
  );
};
