import Head from "next/head";
import dynamic from "next/dynamic";
import { TimeTableOverview } from "../../../components/organisms/time-table/TimeTableOverview";
import { styled } from "@stitches/react";
import { useEffect, useState } from "react";
import { TimeTableItemSelection } from "../../../components/organisms/time-table/TimeTableItemSelection";
import { useRouter } from "next/router";
import { getCurrentWeekMonday } from "../../molecules/time-table/TimeTableWeekSelection";
import { TimeTableItemSidebar } from "./TimeTableItemSidebar";

const TimeTableNavigationLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
  width: "100%",
});

const TimeTableSelectionLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 15fr",
  gridGap: "$2x",
});

const TimeTableInfoLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "3fr minmax(300px, 1fr)",
  gridGap: "$2x",
  width: "100%",
  transition: "all 0.2s ease-in-out",

  variants: {
    showSideBar: {
      true: {
        gridTemplateColumns: "3fr minmax(300px, 1fr)",
      },
      false: {
        gridTemplateColumns: "3fr",
      },
    }
  }
});

export default function ClassTimeTable() {
  const router = useRouter();
  const detail = router.query.detail as string;
  const [schoolClassUUID, setSchoolClassUUID] = useState(
    (router.query.schoolClassUUID as string) ?? ""
  );
  const [startDate, setStartDate] = useState(
    (router.query.startDate as string) ?? getCurrentWeekMonday()
  );

  useEffect(() => {
    if (
      startDate != router.query.startDate ||
      schoolClassUUID != router.query.schoolClassUUID
    ) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          startDate,
          schoolClassUUID,
        },
      });
    }
  }, [router, router.query, schoolClassUUID, startDate]);

  return (
    <TimeTableInfoLayout showSideBar={!!detail}>
      <TimeTableNavigationLayout>
        <TimeTableSelectionLayout>
          <TimeTableItemSelection
            schoolClassUUID={schoolClassUUID}
            setSchoolClassUUID={setSchoolClassUUID}
            startDate={startDate}
            setStartDate={setStartDate}
          ></TimeTableItemSelection>
        </TimeTableSelectionLayout>
        {schoolClassUUID && startDate && (
          <TimeTableOverview
            startDate={startDate}
            schoolClassUUID={schoolClassUUID}
          ></TimeTableOverview>
        )}
      </TimeTableNavigationLayout>
      <TimeTableItemSidebar></TimeTableItemSidebar>
    </TimeTableInfoLayout>
  );
}
