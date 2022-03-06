import React, { useEffect, useState } from "react";
import { Footer } from "../../../../components/Footer";
import { Navbar } from "../../../../components/Navbar";
import { Spacer } from "../../../../components/Spacer";
import Head from "next/head";
import { CourseSelectionList } from "../../../../components/CourseSelectionList";
import { Headline } from "../../../../components/Headline";
import { Separator } from "../../../../components/Separator";

export default function CreateCourse() {
  return (
    <>
      <Head>
        <title>Course Setup - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="My Courses"></Headline>
      <Separator width="small" alignment="center" />
      <CourseSelectionList></CourseSelectionList>
      <Spacer size="medium" />
      <Footer></Footer>
    </>
  );
}
