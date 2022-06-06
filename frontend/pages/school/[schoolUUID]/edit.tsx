import React from "react";
const Navbar = dynamic(() => import("../../../components/organisms/Navbar"));
import { styled } from "../../../stitches.config";
import Head from "next/head";
import { DepartmentsSettingsField } from "../../../components/organisms/schoolAdmin/DepartmentsSettingsField";
import { useRouter } from "next/router";
import { ClassesSettingsField } from "../../../components/organisms/schoolAdmin/ClassesSettingsField";
import { PersonsSettingsField } from "../../../components/organisms/schoolAdmin/PersonsSettingsField";
import { JoinCodesSettingsField } from "../../../components/organisms/schoolAdmin/JoinCodesSettingsField";
import { useQueryClient } from "react-query";
import dynamic from "next/dynamic";
import { SchoolAdminDashboardBar } from "../../../components/organisms/schoolAdmin/SchoolAdminDashboardBar";

const SettingsLayout = styled("div", {
  display: "flex",
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  paddingTop: "10vh",
});

export default function CreateSchool() {
  const router = useRouter();

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
      // case "general":
      //   return <GeneralSettingsField queryClient={queryClient} />;
      // case "info-page":
      //   return <InfoPageSettingsField queryClient={queryClient} />;
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
        <SchoolAdminDashboardBar active={urlParam}></SchoolAdminDashboardBar>
        {getSecondPart()}
      </SettingsLayout>
    </>
  );
}
