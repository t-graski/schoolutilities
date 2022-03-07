import React, { useEffect, useState } from "react";
import Head from "next/head";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { Navbar } from "../../../components/Navbar";
import { SiteLayout } from "../../../components/SiteLayout";
import { Spacer } from "../../../components/Spacer";
import { Headline } from "../../../components/Headline";
import { Separator } from "../../../components/Separator";
import { CourseSelectionList } from "../../../components/CourseSelectionList";
import { Footer } from "../../../components/Footer";

export default function ShowCourses() {
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  useEffect(() => {
    console.log(schoolUUID);
    if (!schoolUUID) {
      // router.push("/school/select?redirect=/course");
    }
  }, [schoolUUID]);

  return (
    <SiteLayout>
      <Head>
        <title>Course Setup - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="Course selection"></Headline>
      <Separator width="small" alignment="center" />
      <CourseSelectionList
        schoolUUID={schoolUUID}
      ></CourseSelectionList>
      <Footer></Footer>
    </SiteLayout>
  );
}
