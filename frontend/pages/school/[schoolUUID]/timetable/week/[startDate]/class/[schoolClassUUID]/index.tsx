import Head from "next/head";
const Navbar = dynamic(
  () => import("../../../../../../../../components/organisms/Navbar")
);
import { SiteLayout } from "../../../../../../../../components/atoms/SiteLayout";
import dynamic from "next/dynamic";
import { TimeTableOverview } from "../../../../../../../../components/organisms/time-table/TimeTableOverview";
import { styled } from "@stitches/react";
import { useEffect, useState } from "react";
import { TimeTableItemSelection } from "../../../../../../../../components/organisms/time-table/TimeTableItemSelection";
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
  const [schoolClassUUID, setSchoolClassUUID] = useState("");
  const [startDate, setStartDate] = useState("");

  useEffect(() => {
    setStartDate(router.query.startDate as string);
    setSchoolClassUUID(router.query.schoolClassUUID as string);
  }, [router.query.schoolClassUUID, router.query.startDate]);

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
