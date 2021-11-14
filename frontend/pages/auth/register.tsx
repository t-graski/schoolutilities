import { styled } from "../../stitches.config";
import React, { useEffect, useState } from "react";
import { RegistrationField } from "../../components/RegistrationField";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Spacer } from "../../components/Spacer";
import { RegistrationInfoBox } from "../../components/RegistrationInfoBox";

const RegisterAuthLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  width: "100%",
  gap: "10vw",
  padding: "7vh 15vw",
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
        <RegistrationInfoBox></RegistrationInfoBox>
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
