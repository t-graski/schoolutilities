import React from "react";
import { RegisterAuth } from "../../components/molecules/auth/RegisterAuth";
import Head from "next/head";
import { Navbar } from "../../components/organisms/Navbar";
import Footer from "../../components/organisms/Footer";
import { PasswordResetField } from "../../components/molecules/auth/PasswordResetField";

export default function RegisterApproved() {
  return (
    <>
      <Head>
        <title>Confirm Email - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <PasswordResetField></PasswordResetField>
      <Footer></Footer>
    </>
  );
}
