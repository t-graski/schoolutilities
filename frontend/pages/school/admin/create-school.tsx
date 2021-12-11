import React, { useState } from "react";
import { DepartmentsDetailField } from "../../../components/DepartmentsDetailField";
import { Footer } from "../../../components/OldFooter";
import { LoginField } from "../../../components/LoginField";
import { Navbar } from "../../../components/OldNavbar";
import { Progressbar } from "../../../components/Progressbar";
import { SchoolDetailField } from "../../../components/SchoolDetailField";
import { SetupProgressSite } from "../../../components/SetupProgressSite";
import { Spacer } from "../../../components/Spacer";
import { styled } from "../../../stitches.config";
import Head from "next/head";
import { SiteLayout } from "../../../components/SiteLayout";

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
    <SiteLayout>
      <Head>
        <title>School Setup - SchoolUtilities</title>
      </Head>
      <Navbar
        links={[
          {
            href: "/",
            label: "Home",
          },
          {
            href: "/features",
            label: "Features",
          },
        ]}
      ></Navbar>
      <Spacer size="medium"></Spacer>
      <CreateSchoolLayout>
        <SetupProgressSite steps={progressSteps}></SetupProgressSite>
      </CreateSchoolLayout>
      <Footer
        links={[
          {
            href: "/data-policy",
            label: "Data Policy",
          },
          {
            href: "/imprint",
            label: "Imprint",
          },
          {
            href: "/logout",
            label: "Logout",
          },
        ]}
      ></Footer>
    </SiteLayout>
  );
}
