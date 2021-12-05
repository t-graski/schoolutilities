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
import { SettingsField } from "../../../components/DepartmentsSettingsField";
import { useRouter } from "next/router";
import SvgDepartment from "../../../components/svg/SvgDepartment";
import cookie from "js-cookie";

const CreateSchoolLayout = styled("div", {
  display: "flex",
  width: "100%",
  padding: "50px",
});

const SettingsLayout = styled("div", {
  display: "grid",
  width: "100vw",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  gridTemplateColumns: "1fr 2fr",
  gridTemplateRows: "1fr",
  variants: {
    layout: {
      small: {
        gridTemplateColumns: "1fr 15fr",
      },
      normal: {},
    },
  },
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
  const [isOpen, setIsOpen] = React.useState(true);
  const router = useRouter();
  if (!cookie.get("schoolUUID")) {
    // router.push("/");
  }

  let urlParam;
  if (router.query && router.query.tab) {
    urlParam = router.query.tab;
  } else {
    urlParam = "";
  }
  function getSecondPart() {
    switch (urlParam) {
      case "classes":
        return (
          <SettingsField
            headline="Class Settings"
            addNewEntryHeadline="Add New Class"
            addEditEntryHeadline="Edit Class"
            popUpInputFieldPlaceholder="Class Name"
            dbEntryUrl="localhost:8888/api/schooladmin/class"
            dbEntriesUrl="localhost:8888/api/schooladmin/classes"
            getAllEntriesBody={{
              schoolUUID: "292e08acd-9b11-4970-a509-ab643e2bfd9b",
            }}
            editEntryBody={{
              classUUID: "",
              name: "",
            }}
            addEntryBody={{
              name: "",
            }}
            UUIDField=""
          />
        );
      case "students":
        return (
          <SettingsField
            headline="Student Settings"
            addNewEntryHeadline="Add New Student"
            addEditEntryHeadline="Edit Student"
            popUpInputFieldPlaceholder="Student Name"
            dbEntryUrl="localhost:8888/api/schooladmin/student"
            dbEntriesUrl="localhost:8888/api/schooladmin/students"
            getAllEntriesBody={undefined}
            editEntryBody={undefined}
            addEntryBody={undefined}
            UUIDField=""
          />
        );
      case "teachers":
        return (
          <SettingsField
            headline="Teacher Settings"
            addNewEntryHeadline="Add New Class"
            addEditEntryHeadline="Edit Class"
            popUpInputFieldPlaceholder="Class Name"
            dbEntryUrl="localhost:8888/api/schooladmin/teacher"
            dbEntriesUrl="localhost:8888/api/schooladmin/teachers"
            getAllEntriesBody={undefined}
            editEntryBody={undefined}
            addEntryBody={undefined}
            UUIDField=""
          />
        );
      default:
        return (
          <SettingsField
            headline="Department Settings"
            addNewEntryHeadline="Add New Department"
            addEditEntryHeadline="Edit Department"
            popUpInputFieldPlaceholder="Department Name"
            dbEntryUrl="localhost:8888/api/schooladmin/department"
            dbEntriesUrl="localhost:8888/api/schooladmin/departments"
            getAllEntriesBody={undefined}
            editEntryBody={undefined}
            addEntryBody={undefined}
            UUIDField=""
          />
        );
    }
  }

  return (
    <>
      <Head>
        <title>School Setup - SchoolUtilities</title>
      </Head>
      <SettingsLayout layout={isOpen ? "normal" : "small"}>
        <SideDashboard
          links={[
            {
              iconName: "SvgDepartment",
              label: "Departments",
              href: "/school/admin/settings?tab=departments",
              highlighted:
                urlParam != "teachers" &&
                urlParam != "classes" &&
                urlParam != "students"
                  ? true
                  : false,
            },
            {
              iconName: "SvgClass",
              label: "Classes",
              href: "/school/admin/settings?tab=classes",
              highlighted: urlParam == "classes" ? true : false,
            },
            {
              iconName: "SvgStudent",
              label: "Students",
              href: "/school/admin/settings?tab=students",
              highlighted: urlParam == "students" ? true : false,
            },
            {
              iconName: "SvgTeacher",
              label: "Teachers",
              href: "/school/admin/settings?tab=teachers",
              highlighted: urlParam == "teachers" ? true : false,
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
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        ></SideDashboard>
        {getSecondPart()}
      </SettingsLayout>
    </>
  );
}
