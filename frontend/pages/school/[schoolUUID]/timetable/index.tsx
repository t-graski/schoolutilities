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

const TimeTableSelectionLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 15fr",
  gridGap: "$2x",
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
        <TimeTableSelectionLayout>
          <TimeTableItemSelection
            schoolClassUUID={schoolClassUUID}
            setSchoolClassUUID={setSchoolClassUUID}
            startDate={startDate}
            setStartDate={setStartDate}
          ></TimeTableItemSelection>
        </TimeTableSelectionLayout>

        <TimeTableOverview
          startDate={startDate}
          schoolClassUUID={schoolClassUUID}
        ></TimeTableOverview>
      </TimeTableNavigationLayout>
    </SiteLayout>
  );
}
