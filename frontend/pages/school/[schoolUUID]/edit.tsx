import React, { useEffect, useState } from "react";
import { DepartmentsDetailField } from "../../../components/organisms/schoolAdmin/DepartmentsDetailField";
import { Footer } from "../../../components/organisms/OldFooter";
import { LoginField } from "../../../components/molecules/auth/LoginField";
import { Navbar } from "../../../components/organisms/Navbar";
import { Progressbar } from "../../../components/molecules/Progressbar";
import { SchoolDetailField } from "../../../components/molecules/school/SchoolDetailField";
import { SetupProgressSite } from "../../../components/organisms/SetupProgressSite";
import { Spacer } from "../../../components/atoms/Spacer";
import { styled } from "../../../stitches.config";
import Head from "next/head";
import { SideDashboard } from "../../../components/molecules/schoolAdmin/SideDashboard";
import { DepartmentsSettingsField } from "../../../components/organisms/schoolAdmin/DepartmentsSettingsField";
import { useRouter } from "next/router";
import SvgDepartment from "../../../components/atoms/svg/SvgDepartment";
import cookie from "js-cookie";
import { ClassesSettingsField } from "../../../components/organisms/schoolAdmin/ClassesSettingsField";
import { PersonsSettingsField } from "../../../components/organisms/schoolAdmin/PersonsSettingsField";
import { JoinCodesSettingsField } from "../../../components/organisms/schoolAdmin/JoinCodesSettingsField";
import { getAccessToken, getUserData, logout } from "../../../misc/authHelper";

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
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let accessToken = await getAccessToken();
    if (!accessToken) {
      router.push("/auth/login");
    }
    if (!schoolUUID && accessToken) {
      router.push("/school/select");
    }
    const fetchedData = await getUserData();
    setUserData(fetchedData);
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
        return <ClassesSettingsField />;
      case "persons":
        return <PersonsSettingsField />;
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
      <SettingsLayout>
        <Navbar></Navbar>
        <SideDashboard
          links={[
            {
              iconName: "SvgDepartment",
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
              iconName: "SvgClass",
              label: "Classes",
              href: `/school/${schoolUUID}/edit?tab=classes`,
              highlighted: urlParam == "classes" ? true : false,
            },
            {
              iconName: "SvgStudent",
              label: "Persons",
              href: `/school/${schoolUUID}/edit?tab=persons`,
              highlighted: urlParam == "persons" ? true : false,
            },
            {
              iconName: "SvgTeacher",
              label: "Invite Codes",
              href: `/school/${schoolUUID}/edit?tab=join-codes`,
              highlighted: urlParam == "join-codes" ? true : false,
            },
          ]}
          specialButton={{
            imageSrc: "/images/icons/round_user_icon.svg",
            imageAlt: "User Icon",
            label: userData
              ? userData.firstName + " " + userData.lastName
              : "User",
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
