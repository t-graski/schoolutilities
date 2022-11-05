import React from "react";
const Navbar = dynamic(() => import("../../../components/organisms/Navbar"));
import { styled } from "../../../stitches.config";
import Head from "next/head";
import { DepartmentsSettingsField } from "../../../components/organisms/schoolAdmin/DepartmentsSettingsField";
import { useRouter } from "next/router";
import { ClassesSettingsField } from "../../../components/organisms/schoolAdmin/ClassesSettingsField";
import { PersonsSettingsField } from "../../../components/organisms/schoolAdmin/PersonsSettingsField";
import { JoinCodesSettingsField } from "../../../components/organisms/schoolAdmin/JoinCodesSettingsField";
import SvgDepartment from "../../../components/atoms/svg/SvgDepartment";
import SvgClass from "../../../components/atoms/svg/SvgClass";
import SvgStudent from "../../../components/atoms/svg/SvgStudent";
import { useQueryClient } from "react-query";
import dynamic from "next/dynamic";
import { SideDashboardBar } from "../../../components/organisms/SideDashboardBar";
import { OffDaysSettingsField } from "../../../components/organisms/schoolAdmin/OffDaysSettingsField";
import SvgInvitation from "../../../components/atoms/svg/SvgInvitation";
import SvgCalendar from "../../../components/atoms/svg/SvgCalendar";
import SvgSuitcase from "../../../components/atoms/svg/SvgSuitcase";
import { SubjectsSettingsField } from "../../../components/organisms/schoolAdmin/SubjectsSettingsField";
import { RoomsSettingsField } from "../../../components/organisms/schoolAdmin/RoomsSettingsField";
import SvgEducation from "../../../components/atoms/svg/SvgEducation";
import SvgBuilding from "../../../components/atoms/svg/SvgBuilding";

const SettingsLayout = styled("div", {
  display: "flex",
  width: "100vw",
  height: "89vh",
});

export default function CreateSchool() {
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  const queryClient = useQueryClient();

  let urlParam;
  if (router.query && router.query.tab) {
    urlParam = router.query.tab;
  } else {
    urlParam = "Departments";
  }

  function getSecondPart() {
    switch (urlParam) {
      case "classes":
        return <ClassesSettingsField queryClient={queryClient} />;
      case "users":
        return <PersonsSettingsField queryClient={queryClient} />;
      case "off-days":
        return <OffDaysSettingsField queryClient={queryClient} />;
      case "join-codes":
        return <JoinCodesSettingsField queryClient={queryClient} />;
      case "subjects":
        return (
          <SubjectsSettingsField
            queryClient={queryClient}
          ></SubjectsSettingsField>
        );
      case "rooms":
        return <RoomsSettingsField queryClient={queryClient} />;
      default:
        return (
          <DepartmentsSettingsField
            queryClient={queryClient}
          ></DepartmentsSettingsField>
        );
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
              name: "Departments",
              value: "departments",
              href: `/school/${schoolUUID}/edit?tab=departments`,
              icon: SvgDepartment,
            },
            {
              name: "Classes",
              value: "classes",
              href: `/school/${schoolUUID}/edit?tab=classes`,
              icon: SvgClass,
            },
            {
              name: "Users",
              value: "users",
              href: `/school/${schoolUUID}/edit?tab=users`,
              icon: SvgStudent,
            },
            {
              name: "Invite Codes",
              value: "join-codes",
              href: `/school/${schoolUUID}/edit?tab=join-codes`,
              icon: SvgInvitation,
            },
            {
              name: "Subjects",
              value: "subjects",
              href: `/school/${schoolUUID}/edit?tab=subjects`,
              icon: SvgEducation,
            },
            {
              name: "Rooms",
              value: "rooms",
              href: `/school/${schoolUUID}/edit?tab=rooms`,
              icon: SvgBuilding,
            },
            {
              name: "Off Days",
              value: "off-days",
              href: `/school/${schoolUUID}/edit?tab=off-days`,
              icon: SvgCalendar,
            },
            // {
            //   name: "School Years",
            //   value: "school-years",
            //   href: `/school/${schoolUUID}/edit?tab=school-years`,
            //   icon: SvgSuitcase,
            // },
          ]}
          active={urlParam}
        ></SideDashboardBar>
        {getSecondPart()}
      </SettingsLayout>
    </>
  );
}
