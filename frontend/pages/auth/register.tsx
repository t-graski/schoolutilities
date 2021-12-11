import { styled } from "../../stitches.config";
import React, { useEffect, useState } from "react";
import { RegistrationField } from "../../components/RegistrationField";
import { Navbar } from "../../components/OldNavbar";
import { Footer } from "../../components/OldFooter";
import { Spacer } from "../../components/Spacer";
import { InfoBox } from "../../components/InfoBox";
import Head from "next/head";

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
      <Head>
        <title>Register - SchoolUtilities</title>
      </Head>
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
        ]}
      ></Navbar>
      <Spacer size="medium"></Spacer>
      <RegisterAuthLayout>
        <InfoBox
          headline="Sign Up"
          info="Join the world's most advanced community and manage all of your school-activities in the easiest possible way - let’s get a comfortable routine into our daily lives!"
          imageSrc="/images/auth/Sign-Up-Mockup.png"
          imageAlt="Sign Up Mockup"
        ></InfoBox>
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
