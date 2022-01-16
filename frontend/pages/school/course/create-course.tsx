import React, { useState } from "react";
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

const CreateCourseLayout = styled("div", {
  display: "flex",
  width: "100%",
  padding: "50px",
});

export default function CreateCourse() {
  const [progressSteps, setProgressSteps] = useState([
    {
      label: "Create course",
      isDone: false,
      isActive: true,
      component: CourseCreateDetailField,
    },
    {
      label: "Add members",
      isDone: false,
      isActive: false,
      component: CourseCreateMembersField,
    },
  ]);

  return (
    <SiteLayout>
      <Head>
        <title>Course Setup - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="small"></Spacer>
      <CreateCourseLayout>
        <CourseCreateProgressSite steps={progressSteps}></CourseCreateProgressSite>
      </CreateCourseLayout>
      <Footer></Footer>
    </SiteLayout>
  );
}
