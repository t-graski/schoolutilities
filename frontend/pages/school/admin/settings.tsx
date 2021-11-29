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
import { SideDashboard } from "../../../components/SideDashboard";

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
      <SideDashboard
        links={[
          {
            imageSrc: "/images/icons/department_icon.svg",
            imageDarkSrc: "/images/icons/department_dark_icon.svg",
            imageAlt: "Department Icon",
            label: "Departments",
            href: "/school/admin/departments",
            highlighted: true,
          },
          {
            imageSrc: "/images/icons/department_icon.svg",
            imageDarkSrc: "/images/icons/department_dark_icon.svg",
            imageAlt: "Class Icon",
            label: "Classes",
            href: "/school/admin/classes",
          },
          {
            imageSrc: "/images/icons/department_icon.svg",
            imageDarkSrc: "/images/icons/department_dark_icon.svg",
            imageAlt: "Student Icon",
            label: "Students",
            href: "/school/admin/students",
          },
          {
            imageSrc: "/images/icons/department_icon.svg",
            imageDarkSrc: "/images/icons/department_dark_icon.svg",
            imageAlt: "Teacher Icon",
            label: "Teachers",
            href: "/school/admin/teachers",
          },
        ]}
        specialButton={{
          imageSrc: "/images/icons/round_user_icon.svg",
          imageAlt: "User Icon",
          label: "John Doe",
          href: "/school/admin/profile",
          onClickImageSrc: "/images/icons/logout_icon.svg",
          onClickImageAlt: "Logout Icon",
          onClickImageFunction: () => {
            console.log("Logout");
          },
        }}
      ></SideDashboard>
    </>
  );
}
