import React, { useEffect, useState } from "react";
import { DepartmentsDetailField } from "../../../../components/organisms/schoolAdmin/DepartmentsDetailField";
import { Footer } from "../../../../components/organisms/Footer";
import { LoginField } from "../../../../components/molecules/auth/LoginField";
import { Navbar } from "../../../../components/organisms/Navbar";
import { Progressbar } from "../../../../components/molecules/Progressbar";
import { SchoolDetailField } from "../../../../components/molecules/school/SchoolDetailField";
import { SetupProgressSite } from "../../../../components/organisms/SetupProgressSite";
import { Spacer } from "../../../../components/atoms/Spacer";
import { styled } from "../../../../stitches.config";
import Head from "next/head";
import { SiteLayout } from "../../../../components/atoms/SiteLayout";
import { CourseCreateProgressSite } from "../../../../components/organisms/course/CourseCreateProgressSite";
import { CourseCreateDetailField } from "../../../../components/organisms/course/CourseCreateDetailField";
import { CourseCreateMembersField } from "../../../../components/organisms/course/CourseCreateMembersField";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { getAccessToken } from "../../../../misc/authHelper";

const CreateCourseLayout = styled("div", {
  display: "flex",
  width: "100%",
  padding: "50px",
});

export default function CreateCourse() {
  const router = useRouter();

  useEffect(() => {
    if (!getAccessToken()) {
      router.push("/auth?tab=login");
    } else if (!router.query.schoolUUID) {
      router.push("/school/select?redirect=/course/create-course");
    }
  }, []);

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
    <>
      <SiteLayout>
        <Head>
          <title>Course Setup - SchoolUtilities</title>
        </Head>
        <Navbar></Navbar>
        <Spacer size="small"></Spacer>
        <CreateCourseLayout>
          <CourseCreateProgressSite
            steps={progressSteps}
          ></CourseCreateProgressSite>
        </CreateCourseLayout>
      </SiteLayout>
      <Footer></Footer>
    </>
  );
}
