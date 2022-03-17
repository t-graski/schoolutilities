import { useState } from "react";
import { DepartmentsDetailField } from "../../components/organisms/schoolAdmin/DepartmentsDetailField";
import { Footer } from "../../components/organisms/Footer";
import { Navbar } from "../../components/organisms/Navbar";
import { SchoolDetailField } from "../../components/molecules/school/SchoolDetailField";
import { SetupProgressSite } from "../../components/organisms/SetupProgressSite";
import { Spacer } from "../../components/atoms/Spacer";
import { styled } from "../../stitches.config";
import Head from "next/head";
import { SiteLayout } from "../../components/atoms/SiteLayout";

const CreateSchoolLayout = styled("div", {
  display: "flex",
  width: "100%",
  padding: "50px",
});

export default function CreateSchool() {
  const [progressSteps, setProgressSteps] = useState([
    {
      label: "School Details",
      isDone: false,
      isActive: true,
      component: SchoolDetailField,
    },
    {
      label: "Departments",
      isDone: false,
      isActive: false,
      component: DepartmentsDetailField,
    },
  ]);

  return (
    <>
      <SiteLayout>
        <Head>
          <title>School Setup - SchoolUtilities</title>
        </Head>
        <Navbar></Navbar>
        <Spacer size="small"></Spacer>
        <CreateSchoolLayout>
          <SetupProgressSite steps={progressSteps}></SetupProgressSite>
        </CreateSchoolLayout>
      </SiteLayout>
      <Footer></Footer>
    </>
  );
}
