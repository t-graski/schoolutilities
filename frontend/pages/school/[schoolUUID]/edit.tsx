import React from "react";
const Navbar = dynamic(() => import("../../../components/organisms/Navbar"));
import { styled } from "../../../stitches.config";
import Head from "next/head";
import { SideDashboard } from "../../../components/molecules/schoolAdmin/SideDashboard";
import { DepartmentsSettingsField } from "../../../components/organisms/schoolAdmin/DepartmentsSettingsField";
import { useRouter } from "next/router";
import { ClassesSettingsField } from "../../../components/organisms/schoolAdmin/ClassesSettingsField";
import { PersonsSettingsField } from "../../../components/organisms/schoolAdmin/PersonsSettingsField";
import { JoinCodesSettingsField } from "../../../components/organisms/schoolAdmin/JoinCodesSettingsField";
import SvgDepartment from "../../../components/atoms/svg/SvgDepartment";
import SvgClass from "../../../components/atoms/svg/SvgClass";
import SvgStudent from "../../../components/atoms/svg/SvgStudent";
import SvgTeacher from "../../../components/atoms/svg/SvgTeacher";
import { useQueryClient } from "react-query";
import dynamic from "next/dynamic";
import { logout } from "../../../utils/authHelper";
import { SideDashboardBar } from "../../../components/organisms/SideDashboardBar";
import { OffDaysSettingsField } from "../../../components/organisms/schoolAdmin/OffDaysSettingsField";

const SettingsLayout = styled("div", {
  display: "flex",
  width: "100vw",
  height: "89vh",
});

export default function CreateSchool() {
  const [isOpen, setIsOpen] = React.useState(true);
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
      case "persons":
        return <PersonsSettingsField queryClient={queryClient} />;
        case "off-days":
          return <OffDaysSettingsField queryClient={queryClient} />;
      case "join-codes":
        return <JoinCodesSettingsField />;
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
              name: "Departments",
              href: `/school/${schoolUUID}/edit?tab=departments`,
              icon: SvgDepartment,
            },
            {
              name: "Classes",
              href: `/school/${schoolUUID}/edit?tab=classes`,
              icon: SvgClass,
            },
            {
              name: "Persons",
              href: `/school/${schoolUUID}/edit?tab=persons`,
              icon: SvgStudent,
            },
            {
              name: "Invite Codes",
              href: `/school/${schoolUUID}/edit?tab=join-codes`,
              icon: SvgTeacher,
            },
            {
              name: "Off Days",
              href: `/school/${schoolUUID}/edit?tab=off-days`,
              icon: SvgTeacher,
            },
            {
              name: "School Years",
              href: `/school/${schoolUUID}/edit?tab=school-years`,
              icon: SvgTeacher,
            }
          ]}
          active={urlParam}
        ></SideDashboardBar>
        {getSecondPart()}
      </SettingsLayout>
    </>
  );
}
