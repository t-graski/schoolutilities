import { useState } from "react";
import { DepartmentsDetailField } from "../../components/organisms/schoolAdmin/DepartmentsDetailField";
import Footer from "../../components/organisms/Footer";
const Navbar = dynamic(() => import("../../components/organisms/Navbar"));
import { SchoolDetailField } from "../../components/molecules/school/SchoolDetailField";
import { SetupProgressSite } from "../../components/organisms/SetupProgressSite";
import { Spacer } from "../../components/atoms/Spacer";
import { styled } from "../../stitches.config";
import Head from "next/head";
import { SiteLayout } from "../../components/atoms/SiteLayout";
import dynamic from "next/dynamic";

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
      <Head>
        <title>School Setup - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <CreateSchoolLayout>
        <SetupProgressSite steps={progressSteps}></SetupProgressSite>
      </CreateSchoolLayout>
      <Footer></Footer>
    </>
  );
}
