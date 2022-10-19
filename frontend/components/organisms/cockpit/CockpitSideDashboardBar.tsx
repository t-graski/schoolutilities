import React from "react";
import SvgAlert from "../../atoms/svg/SvgAlert";
import SvgDepartment from "../../atoms/svg/SvgDepartment";
import SvgSchool from "../../atoms/svg/SvgSchool";
import SvgUser from "../../atoms/svg/SvgUser";
import { SideDashboardBar } from "../SideDashboardBar";

type Props = {
  active?: string
};

export const CockpitSideDashboardBar: React.FC<Props> = ({
  active = "",
}) => {
  return (
    <>
      <SideDashboardBar
        items={[
          {
            name: "Articles",
            value: "articles",
            icon: SvgAlert,
            href: "/cockpit/articles",
          },
          {
            name: "Schools",
            value: "schools",
            icon: SvgSchool,
            href: "/schools",
          },
          {
            name: "Departments",
            value: "departments",
            icon: SvgDepartment,
            href: "/departments",
          },
          {
            name: "Users",
            value: "users",
            icon: SvgUser,
            href: "/users",
          },
          {
            name: "Settings",
            value: "settings",
            icon: SvgUser,
            href: "/settings",
          },
        ]}
        active={active}
      ></SideDashboardBar>
    </>
  );
};
