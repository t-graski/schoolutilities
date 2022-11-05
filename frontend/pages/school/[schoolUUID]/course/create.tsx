import { useEffect, useState } from "react";
import Footer from "../../../../components/organisms/Footer";
const Navbar = dynamic(() => import("../../../../components/organisms/Navbar"));
import { Spacer } from "../../../../components/atoms/Spacer";
import { styled } from "../../../../stitches.config";
import Head from "next/head";
import { SiteLayout } from "../../../../components/atoms/SiteLayout";
import { CourseCreateProgressSite } from "../../../../components/organisms/course/CourseCreateProgressSite";
import { CourseCreateDetailField } from "../../../../components/organisms/course/CourseCreateDetailField";
import { CourseCreateMembersField } from "../../../../components/organisms/course/CourseCreateMembersField";
import { useRouter } from "next/router";
import { getAccessToken } from "../../../../utils/authHelper";
import dynamic from "next/dynamic";

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
      router.push("/school/select?redirect=/course/create");
    }
  }, [router]);

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
        <Head>
          <title>Course Setup - SchoolUtilities</title>
        </Head>
        <Navbar></Navbar>
        <CreateCourseLayout>
          <CourseCreateProgressSite
            steps={progressSteps}
          ></CourseCreateProgressSite>
        </CreateCourseLayout>
      <Footer></Footer>
    </>
  );
}
