import React from "react";
import { RegisterAuth } from "../../components/RegisterAuth";
import Head from "next/head";

export default function RegisterApproved() {
  return (
    <>
      <Head>
        <title>Confirm Email - SchoolUtilities</title>
      </Head>
      <RegisterAuth></RegisterAuth>
    </>
  );
}
