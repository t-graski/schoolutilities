import React from "react";
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
            iconName: "SvgAlert",
            href: "/cockpit/articles",
          },
          {
            name: "Schools",
            iconName: "school",
            href: "/schools",
          },
          {
            name: "Departments",
            iconName: "department",
            href: "/departments",
          },
          {
            name: "Users",
            iconName: "user",
            href: "/users",
          },
          {
            name: "Settings",
            iconName: "settings",
            href: "/settings",
          },
        ]}
        active={active}
      ></SideDashboardBar>
    </>
  );
};
