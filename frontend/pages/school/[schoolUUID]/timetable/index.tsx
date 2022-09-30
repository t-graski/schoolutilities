import Head from "next/head";
const Navbar = dynamic(() => import("../../../../components/organisms/Navbar"));
import { SiteLayout } from "../../../../components/atoms/SiteLayout";
import dynamic from "next/dynamic";
import { TimeTableOverview } from "../../../../components/organisms/time-table/TimeTableOverview";
import { styled } from "@stitches/react";
import { useState } from "react";
import { TimeTableItemSelection } from "../../../../components/organisms/time-table/TimeTableItemSelection";

const TimeTableNavigationLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
});

export default function ShowCourses() {
  const [schoolClassUUID, setSchoolClassUUID] = useState(
    "4e31c3c28-10c8-42e4-9411-0255fd66e44b"
  );
  const [startDate, setStartDate] = useState("2022-09-26");

  return (
    <SiteLayout>
      <Head>
        <title>Timetable - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <TimeTableNavigationLayout>
        <TimeTableItemSelection
          schoolClassUUID={schoolClassUUID}
          setSchoolClassUUID={setSchoolClassUUID}
          startDate={startDate}
          setStartDate={setStartDate}
        ></TimeTableItemSelection>
        <TimeTableOverview
          startTime="08:00"
          endTime="17:15"
          startDate={startDate.split("T")[0]}
          schoolClassUUID={schoolClassUUID}
        ></TimeTableOverview>
      </TimeTableNavigationLayout>
    </SiteLayout>
  );
}
