import React from "react";
import { RegisterAuth } from "../../components/RegisterAuth";
import Head from "next/head";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { EmailChangeAuth } from "../../components/EmailChangeAuth";

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
