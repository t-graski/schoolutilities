import React from "react";
import { RegisterAuth } from "../../components/RegisterAuth";
import Head from "next/head";
import { Navbar } from "../../components/Navbar";
import { Spacer } from "../../components/Spacer";
import { Headline } from "../../components/Headline";
import { Separator } from "../../components/Separator";
import { SchoolSelectionList } from "../../components/SchoolSelectionList";
import { Footer } from "../../components/Footer";

export default function RegisterApproved() {
  return (
    <>
      <Head>
        <title>School Selection - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="School selection"></Headline>
      <Separator width="small" alignment="center" />
      <Spacer size="small"></Spacer>
      <SchoolSelectionList></SchoolSelectionList>
      <Footer></Footer>
    </>
  );
}
