import React from "react";
import { RegisterAuth } from "../../components/RegisterAuth";
import Head from "next/head";
import { Navbar } from "../../components/Navbar";
import { Spacer } from "../../components/Spacer";
import { Headline } from "../../components/Headline";
import { Separator } from "../../components/Separator";
import { SchoolSelectionList } from "../../components/SchoolSelectionList";
import { Footer } from "../../components/Footer";
import { Changelog } from "../../components/Changelog";

export default function RegisterApproved() {
  return (
    <>
      <Head>
        <title>Change-Logs - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="Change-Logs"></Headline>
      <Spacer size="verySmall"></Spacer>
      <Separator width="small" alignment="center" />
      <Spacer size="small"></Spacer>
      <Changelog></Changelog>
      <Footer></Footer>
    </>
  );
}
