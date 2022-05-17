import React from "react";
import Head from "next/head";
const Navbar = dynamic(() => import("../../components/organisms/Navbar"));
import Footer from "../../components/organisms/Footer";
import { PasswordResetNew } from "../../components/molecules/auth/PasswordResetNew";
import dynamic from "next/dynamic";

export default function RegisterApproved() {
  return (
    <>
      <Head>
        <title>Confirm Email - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <PasswordResetNew></PasswordResetNew>
      <Footer></Footer>
    </>
  );
}
