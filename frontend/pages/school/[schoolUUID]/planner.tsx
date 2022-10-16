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
import { ExamsOverviewField } from "../../../components/organisms/time-table/ExamsOverviewField";
import { useQueryClient } from "react-query";
import SvgPlanner from "../../../components/atoms/svg/SvgPlanner";
import SvgTest from "../../../components/atoms/svg/SvgTest";

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

  const queryClient = useQueryClient();

  function getSecondPart() {
    switch (urlParam) {
      case "timetable":
        return <ClassTimeTable></ClassTimeTable>;
      default:
        return <ExamsOverviewField queryClient={queryClient}></ExamsOverviewField>;
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
              icon: SvgPlanner,
            },
            {
              name: "Exams",
              value: "exams",
              href: `/school/${schoolUUID}/planner?tab=exams`,
              icon: SvgTest,
            }
          ]}
          active={urlParam}
        ></SideDashboardBar>
        {getSecondPart()}
      </SettingsLayout>
    </>
  );
}
