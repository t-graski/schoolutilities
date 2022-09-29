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
import { useQuery } from "react-query";
import { getTimeTableForClass } from "../../../../utils/requests";

const TimeTableNavigationLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 7fr",
});

export default function ShowCourses() {
  const { data: timetable, status } = useQuery(
    ["timetable", "4f6aae61f-59f0-4abf-bc2b-92be34724b85"],
    () => getTimeTableForClass("4f6aae61f-59f0-4abf-bc2b-92be34724b85/2022-09-26")
  );

  if(status === "loading") {
    return <div>Loading...</div>
  }

  if(status === "error") {
    return <div>Error</div>
  }

  console.log(timetable);

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
          weekTimeTable={timetable}
        ></TimeTableOverview>
      </TimeTableNavigationLayout>
    </SiteLayout>
  );
}
