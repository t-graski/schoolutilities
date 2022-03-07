import React, { useEffect, useState } from "react";
import { Footer } from "../../../../components/Footer";
import { Navbar } from "../../../../components/Navbar";
import { Spacer } from "../../../../components/Spacer";
import Head from "next/head";
import { CourseSelectionList } from "../../../../components/CourseSelectionList";
import { Headline } from "../../../../components/Headline";
import { Separator } from "../../../../components/Separator";
import { useRouter } from "next/router";

export default function CreateCourse() {
  const router = useRouter();
  if (!router.query || !router.query.schoolUUID) {
    router.push("/school/select?redirect=/course");
  }

  return (
    <>
      <Head>
        <title>Course Setup - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="My Courses"></Headline>
      <Separator width="small" alignment="center" />
      <CourseSelectionList
        schoolUUID={router.query.schoolUUID as string}
      ></CourseSelectionList>
      <Spacer size="medium" />
      <Footer></Footer>
    </>
  );
}
