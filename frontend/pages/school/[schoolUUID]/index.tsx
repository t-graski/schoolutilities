import React from "react";
import Head from "next/head";
import { Navbar } from "../../../components/organisms/Navbar";
import { SiteLayout } from "../../../components/atoms/SiteLayout";
import { Spacer } from "../../../components/atoms/Spacer";
import { Headline } from "../../../components/atoms/Headline";
import { Separator } from "../../../components/atoms/Separator";
import { CourseSelectionList } from "../../../components/organisms/course/CourseSelectionList";
import { Footer } from "../../../components/organisms/Footer";

export default function ShowCourses() {
  return (
    <SiteLayout>
      <Head>
        <title>Course Setup - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="Course selection"></Headline>
      <Separator width="small" alignment="center" />
      <CourseSelectionList></CourseSelectionList>
      <Footer></Footer>
    </SiteLayout>
  );
}
