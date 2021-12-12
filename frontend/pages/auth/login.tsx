import { styled } from "../../stitches.config";
import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Spacer } from "../../components/Spacer";
import { InfoBox } from "../../components/InfoBox";
import { LoginField } from "../../components/LoginField";
import Head from "next/head";

const LoginAuthLayout = styled("div", {
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
        <title>Login - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <LoginAuthLayout>
        <InfoBox
          headline="Login"
          info="Join the world's most advanced community and manage all of your school-activities in the easiest possible way - let’s get a comfortable routine into our daily lives!"
          imageSrc="/images/auth/Sign-Up-Mockup.png"
          imageAlt="Login Mockup"
        ></InfoBox>
        <LoginField></LoginField>
      </LoginAuthLayout>
      <Footer></Footer>
    </>
  );
}
