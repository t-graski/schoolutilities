import Head from "next/head";
const Navbar = dynamic(() => import("../../../../components/organisms/Navbar"));
import { SiteLayout } from "../../../../components/atoms/SiteLayout";
import dynamic from "next/dynamic";
import { TimeTableOverview } from "../../../../components/organisms/time-table/TimeTableOverview";
import { styled } from "@stitches/react";
import { SideDashboardBar } from "../../../../components/organisms/SideDashboardBar";
import SvgStudent from "../../../../components/atoms/svg/SvgStudent";
import SvgClass from "../../../../components/atoms/svg/SvgClass";
import SvgDepartment from "../../../../components/atoms/svg/SvgDepartment";

const TimeTableNavigationLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 7fr",
});

export default function ShowCourses() {
  return (
    <SiteLayout>
      <Head>
        <title>Timetable - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <TimeTableNavigationLayout>
        <SideDashboardBar
          items={[
            {
              name: "My Timetable",
              href: `/school/`,
              icon: SvgDepartment,
            },
            {
              name: "Classes",
              href: `/school/`,
              icon: SvgClass,
            },
            {
              name: "Teachers",
              href: `/school/`,
              icon: SvgStudent,
            },
          ]}
          active={""}
        ></SideDashboardBar>
        <TimeTableOverview
          startTime="08:00"
          endTime="17:15"
        ></TimeTableOverview>
      </TimeTableNavigationLayout>
    </SiteLayout>
  );
}
