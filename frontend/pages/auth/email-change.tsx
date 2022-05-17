import React from "react";
import Head from "next/head";
const Navbar = dynamic(() => import("../../components/organisms/Navbar"));
import Footer from "../../components/organisms/Footer";
import { EmailChangeAuth } from "../../components/molecules/auth/EmailChangeAuth";
import dynamic from "next/dynamic";

export default function RegisterApproved() {
  return (
    <>
      <Head>
        <title>Confirm Email - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <EmailChangeAuth></EmailChangeAuth>
      <Footer></Footer>
    </>
  );
}
