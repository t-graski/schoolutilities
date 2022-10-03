import Head from "next/head";
const Navbar = dynamic(
  () => import("../../../../../../components/organisms/Navbar")
);
import { SiteLayout } from "../../../../../../components/atoms/SiteLayout";
import dynamic from "next/dynamic";
import { TimeTableOverview } from "../../../../../../components/organisms/time-table/TimeTableOverview";
import { styled } from "@stitches/react";
import { useEffect, useState } from "react";
import { TimeTableItemSelection } from "../../../../../../components/organisms/time-table/TimeTableItemSelection";
import { useRouter } from "next/router";

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
  const [startDate, setStartDate] = useState("");

  useEffect(() => {
    setStartDate(router.query.startDate as string);
  }, [router.query.startDate]);

  if (schoolClassUUID) {
    router.push(
      `/school/${schoolUUID}/timetable/week/${startDate}/class/${schoolClassUUID}`
    );
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

        Bitte wähle eine Klasse aus
      </TimeTableNavigationLayout>
    </SiteLayout>
  );
}
