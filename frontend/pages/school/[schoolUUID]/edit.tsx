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

const SettingsLayout = styled("div", {
  display: "flex",
  width: "100vw",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
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
    urlParam = "";
  }

  function getSecondPart() {
    switch (urlParam) {
      case "classes":
        return <ClassesSettingsField queryClient={queryClient} />;
      case "persons":
        return <PersonsSettingsField queryClient={queryClient} />;
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
        <SideDashboard
          links={[
            {
              icon: SvgDepartment,
              label: "Departments",
              href: `/school/${schoolUUID}/edit?tab=departments`,
              highlighted:
                urlParam != "persons" &&
                urlParam != "classes" &&
                urlParam != "join-codes"
                  ? true
                  : false,
            },
            {
              icon: SvgClass,
              label: "Classes",
              href: `/school/${schoolUUID}/edit?tab=classes`,
              highlighted: urlParam == "classes" ? true : false,
            },
            {
              icon: SvgStudent,
              label: "Persons",
              href: `/school/${schoolUUID}/edit?tab=persons`,
              highlighted: urlParam == "persons" ? true : false,
            },
            {
              icon: SvgTeacher,
              label: "Invite Codes",
              href: `/school/${schoolUUID}/edit?tab=join-codes`,
              highlighted: urlParam == "join-codes" ? true : false,
            },
          ]}
          specialButton={{
            imageSrc: "/images/icons/round_user_icon.svg",
            imageAlt: "User Icon",
            label: "User",
            href: "/profile/settings",
            onClickImageSrc: "/images/icons/logout_icon.svg",
            onClickImageAlt: "Logout Icon",
            onClickImageFunction: () => {
              logout();
              router.push("/");
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
