import React from "react";
import Head from "next/head";
import { Navbar } from "../../components/organisms/Navbar";
import { Footer } from "../../components/organisms/Footer";
import { EmailChangeAuth } from "../../components/molecules/auth/EmailChangeAuth";

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
