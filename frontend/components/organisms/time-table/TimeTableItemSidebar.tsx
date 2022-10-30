import { Button } from "@/atoms/Button";
import { TimeTableItemDetail } from "@/molecules/time-table/TimeTableItemDetail";
import { styled } from "@stitches/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getTimeTableElement } from "../../../utils/requests/timeTable";

const SidebarLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$2x",
  width: "100%",
});

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

  console.log(timeTableElement);

  return (
    <>
      <SidebarLayout>
        {timeTableElement && (
          <>
            <TimeTableItemDetail item={timeTableElement}></TimeTableItemDetail>
            <Button buttonType="filled">
              {timeTableElement.omitted ? "Edit" : "Add"} substitution
            </Button>
          </>
        )}
      </SidebarLayout>
    </>
  );
};
