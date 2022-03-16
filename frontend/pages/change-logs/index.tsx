import React from "react";
import { RegisterAuth } from "../../components/molecules/auth/RegisterAuth";
import Head from "next/head";
import { Navbar } from "../../components/organisms/Navbar";
import { Spacer } from "../../components/atoms/Spacer";
import { Headline } from "../../components/atoms/Headline";
import { Separator } from "../../components/atoms/Separator";
import { SchoolSelectionList } from "../../components/organisms/school/SchoolSelectionList";
import { Footer } from "../../components/organisms/Footer";
import { Changelog } from "../../components/organisms/Changelog";

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
