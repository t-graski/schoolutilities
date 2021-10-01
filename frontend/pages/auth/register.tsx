import { styled } from "../../stitches.config";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Headline } from "../../components/Headline";
import React, { useEffect, useState } from "react";
import { Spacer } from "../../components/Spacer";
import { Separator } from "../../components/Separator";
import { useRouter } from "next/router";

const RegisterAuthLayout = styled("div", {
  width: "100%",
  padding: "0 15vw",
  minHeight: "80vh",
});

export default function Register() {
  const [authStateInfo, setAuthStateInfo] = useState(
    "Ihr Account wird gerade aktiviert..."
  );
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    fetch("http://localhost:8888/api/activateAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
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
}
