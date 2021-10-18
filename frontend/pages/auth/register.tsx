import { styled } from "../../stitches.config";
import React, { useEffect, useState } from "react";
import { RegistrationField } from "../../components/RegistrationField";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Spacer } from "../../components/Spacer";

const RegisterAuthLayout = styled("div", {
  width: "100%",
  padding: "0 15vw",
  minHeight: "80vh",
});

export default function Register() {
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
      <RegisterAuthLayout>
        <RegistrationField></RegistrationField>
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
