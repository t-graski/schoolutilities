import Head from "next/head";
const Navbar = dynamic(() => import("../../../../components/organisms/Navbar"));
import { SiteLayout } from "../../../../components/atoms/SiteLayout";
import dynamic from "next/dynamic";
import { styled } from "@stitches/react";
import { useState } from "react";
import { TimeTableItemSelection } from "../../../../components/organisms/time-table/TimeTableItemSelection";
import { getCurrentWeekMonday } from "../../../../components/molecules/time-table/TimeTableWeekSelection";
import { useRouter } from "next/router";
import { isSSR } from "../../../../utils/isSSR";

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
  const router = useRouter();
  const { schoolUUID } = router.query;
  const [schoolClassUUID, setSchoolClassUUID] = useState("");
  const [startDate, setStartDate] = useState(getCurrentWeekMonday());

  if (!isSSR() && startDate && schoolUUID) {
    router.push(`/school/${schoolUUID}/timetable/week/${startDate}/`);
  }

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
      </TimeTableNavigationLayout>
    </SiteLayout>
  );
}
