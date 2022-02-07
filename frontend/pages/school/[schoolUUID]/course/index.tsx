import React, { useEffect, useState } from "react";
import { DepartmentsDetailField } from "../../../components/DepartmentsDetailField";
import { Footer } from "../../../components/Footer";
import { LoginField } from "../../../components/LoginField";
import { Navbar } from "../../../components/Navbar";
import { Progressbar } from "../../../components/Progressbar";
import { SchoolDetailField } from "../../../components/SchoolDetailField";
import { SetupProgressSite } from "../../../components/SetupProgressSite";
import { Spacer } from "../../../components/Spacer";
import { styled } from "../../../stitches.config";
import Head from "next/head";
import { SiteLayout } from "../../../components/SiteLayout";
import { CourseCreateProgressSite } from "../../../components/CourseCreateProgressSite";
import { CourseCreateDetailField } from "../../../components/CourseCreateDetailField";
import { CourseCreateMembersField } from "../../../components/CourseCreateMembersField";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { getAccessToken } from "../../../misc/authHelper";
import { CourseSelectionList } from "../../../components/CourseSelectionList";
import { Headline } from "../../../components/Headline";
import { Separator } from "../../../components/Separator";

export default function CreateCourse() {

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
