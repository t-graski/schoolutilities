import React from "react";
import { RegisterAuth } from "../../components/molecules/auth/RegisterAuth";
import Head from "next/head";
const Navbar = dynamic(() => import("../../components/organisms/Navbar"));
import Footer from "../../components/organisms/Footer";
import dynamic from "next/dynamic";

export default function RegisterApproved() {
  return (
    <>
      <Head>
        <title>Confirm Email - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <RegisterAuth></RegisterAuth>
      <Footer></Footer>
    </>
  );
}
