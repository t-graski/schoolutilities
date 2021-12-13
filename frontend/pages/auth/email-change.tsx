import React from "react";
import { RegisterAuth } from "../../components/RegisterAuth";
import Head from "next/head";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

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
