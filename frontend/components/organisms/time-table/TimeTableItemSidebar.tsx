import { TimeTableItemDetail } from "@/molecules/time-table/TimeTableItemDetail";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getTimeTableElement } from "../../../utils/requests/timeTable";

export const TimeTableItemSidebar: React.FC<{}> = () => {
  const router = useRouter();
  const [timeTableElementUUID, setTimeTableElementUUID] = useState<string>(
    router.query.detail as string
  );

  useEffect(() => {
    setTimeTableElementUUID(router.query.detail as string);
  }, [router.query.detail]);

  const { data: timeTableElement, status } = useQuery(
    ["timeTableElement", timeTableElementUUID],
    () => getTimeTableElement(timeTableElementUUID),
    {
      enabled: !!timeTableElementUUID,
    }
  );

  if (status === "loading") {
    return <div>Loading</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <>
      {timeTableElement && (
        <TimeTableItemDetail item={timeTableElement}></TimeTableItemDetail>
      )}
    </>
  );
};
