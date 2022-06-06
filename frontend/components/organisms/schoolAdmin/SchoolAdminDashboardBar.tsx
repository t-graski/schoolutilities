import { useRouter } from "next/router";
import React from "react";
import SvgAlert from "../../atoms/svg/SvgAlert";
import SvgDepartment from "../../atoms/svg/SvgDepartment";
import SvgSchool from "../../atoms/svg/SvgSchool";
import SvgUser from "../../atoms/svg/SvgUser";
import { SideDashboardBar } from "../SideDashboardBar";

type Props = {
  active?: string;
};

export const SchoolAdminDashboardBar: React.FC<Props> = ({ active = "" }) => {
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;
  return (
    <>
      <SideDashboardBar
        items={[
          {
            name: "Departments",
            icon: SvgAlert,
            href: `/school/${schoolUUID}/edit?tab=departments`,
          },
          {
            name: "Classes",
            icon: SvgSchool,
            href: `/school/${schoolUUID}/edit?tab=classes`,
          },
          {
            name: "Persons",
            icon: SvgDepartment,
            href: `/school/${schoolUUID}/edit?tab=persons`,
          },
          {
            name: "Invite Codes",
            icon: SvgUser,
            href: `/school/${schoolUUID}/edit?tab=invite-codes`,
          },
          {
            name: "General",
            icon: SvgUser,
            href: `/school/${schoolUUID}/edit?tab=general`,
          },
          {
            name: "Info Page",
            icon: SvgUser,
            href: `/school/${schoolUUID}/edit?tab=info-page`,
          },
        ]}
        active={active}
      ></SideDashboardBar>
    </>
  );
};
