import React from "react";
const Navbar = dynamic(() => import("../../../components/organisms/Navbar"));
import { styled } from "../../../stitches.config";
import Head from "next/head";
import { DepartmentsSettingsField } from "../../../components/organisms/schoolAdmin/DepartmentsSettingsField";
import { useRouter } from "next/router";
import SvgDepartment from "../../../components/atoms/svg/SvgDepartment";
import SvgClass from "../../../components/atoms/svg/SvgClass";
import dynamic from "next/dynamic";
import { SideDashboardBar } from "../../../components/organisms/SideDashboardBar";
import ClassTimeTable from "../../../components/organisms/time-table/ClassTimeTable";

const SettingsLayout = styled("div", {
  display: "flex",
  width: "100vw",
  height: "89vh",
});

export default function CreateSchool() {
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  let urlParam;
  if (router.query && router.query.tab) {
    urlParam = router.query.tab;
  } else {
    urlParam = "asdfasdf";
  }

  function getSecondPart() {
    switch (urlParam) {
      case "timetable":
        return <ClassTimeTable></ClassTimeTable>;
      default:
        return <DepartmentsSettingsField></DepartmentsSettingsField>;
    }
  }

  return (
    <>
      <Head>
        <title>School Setup - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <SettingsLayout>
        <SideDashboardBar
          items={[
            {
              name: "Timetable",
              value: "timetable",
              href: `/school/${schoolUUID}/planner?tab=timetable`,
              icon: SvgDepartment,
            },
            {
              name: "Exams",
              value: "exams",
              href: `/school/${schoolUUID}/planner?tab=exams`,
              icon: SvgClass,
            }
          ]}
          active={urlParam}
        ></SideDashboardBar>
        {getSecondPart()}
      </SettingsLayout>
    </>
  );
}
