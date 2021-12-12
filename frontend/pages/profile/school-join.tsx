import React from "react";
import { RegisterAuth } from "../../components/RegisterAuth";
import Head from "next/head";
import { Navbar } from "../../components/Navbar";
import { Spacer } from "../../components/Spacer";
import { Headline } from "../../components/Headline";
import { Separator } from "../../components/Separator";
import { SchoolSelectionList } from "../../components/SchoolSelectionList";
import { SchoolJoin } from "../../components/SchoolJoin";
import { Footer } from "../../components/Footer";

export default function RegisterApproved() {
  return (
    <>
      <Head>
        <title>School Join - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="Join a school"></Headline>
      <Separator width="small" alignment="center" />
      <Spacer size="small"></Spacer>
      <SchoolJoin></SchoolJoin>
      <Footer></Footer>
    </>
  );
}
