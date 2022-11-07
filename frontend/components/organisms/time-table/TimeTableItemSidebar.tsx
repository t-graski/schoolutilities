import { Button } from "@/atoms/Button";
import { InputField } from "@/atoms/input/InputField";
import { Spacer } from "@/atoms/Spacer";
import { PopUp } from "@/molecules/PopUp";
import { TimeTableItemDetail } from "@/molecules/time-table/TimeTableItemDetail";
import { styled } from "@stitches/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useQuery, useQueryClient } from "react-query";
import {
  deleteOmitTimeTableElement,
  getTimeTableElementDetailed,
  omitTimeTableElement,
} from "../../../utils/requests/timeTable";

const SidebarLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$2x",
  width: "100%",
});

const PopUpLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$2x",
});

const ButtonLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "$2x",
  justifyContent: "flex-end",
});

const StyledLink = styled(Link, {
  width: "fit-content",
});

export const TimeTableItemSidebar: React.FC<{}> = () => {
  const [omittedPopUpVisible, setOmittedPopUpVisible] = useState(false);
  const router = useRouter();
  const [timeTableElementUUID, setTimeTableElementUUID] = useState<string>(
    router.query.detail as string
  );
  const [omittedReason, setOmittedReason] = useState("");
  const schoolUUId = router.query.schoolUUID as string;
  const startDate = router.query.startDate as string;
  const queryClient = useQueryClient();

  useEffect(() => {
    setTimeTableElementUUID(router.query.detail as string);
  }, [router.query.detail]);

  const { data: timeTableElement, status } = useQuery(
    ["timeTableElement", timeTableElementUUID, startDate],
    () => getTimeTableElementDetailed(timeTableElementUUID, startDate),
    {
      enabled: !!timeTableElementUUID && !!startDate,
    }
  );

  if (status === "loading") {
    return (
      <SidebarLayout>
        <Skeleton width={"90%"} height={50} />
        <Spacer size="1x"></Spacer>
        <Skeleton width={"70%"} height={30} />
        <Skeleton width={"90%"} height={40} />
        <Skeleton width={"90%"} height={30} />
        <Skeleton width={"90%"} height={30} />
      </SidebarLayout>
    );
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
            <StyledLink
              href={`/school/${schoolUUId}/timetable/element/${timeTableElementUUID}/substitution?date=${startDate}`}
              passHref
            >
              <Button buttonType="filled">
                {timeTableElement.substitution ? "Edit" : "Add"} substitution
              </Button>
            </StyledLink>
            <StyledLink
              href={
                timeTableElement.exam
                  ? `/school/${schoolUUId}/planner?tab=exams`
                  : `/school/${schoolUUId}/planner?tab=exams&element=${timeTableElementUUID}&date=${startDate}`
              }
              passHref
            >
              <Button buttonType="filled">
                {timeTableElement.exam ? "Edit" : "Add"} exam
              </Button>
            </StyledLink>
            <Button
              buttonType="outlined"
              onClick={() => {
                setOmittedReason("");
                setOmittedPopUpVisible(true);
              }}
            >
              {timeTableElement?.omitted ? "Uncancel" : "Cancel"} element
            </Button>
            <PopUp
              openButton={<></>}
              open={omittedPopUpVisible}
              onOpenChange={setOmittedPopUpVisible}
            >
              <PopUpLayout>
                Do you really want to{" "}
                {timeTableElement.omitted ? "uncancel" : "cancel"} this element
                ({timeTableElement.schoolSubject?.schoolSubjectName}
                )?
                <InputField
                  inputType={"text"}
                  value={
                    timeTableElement.omitted
                      ? timeTableElement.omitted.timeTableElementOmittedReason
                      : omittedReason
                  }
                  onChange={setOmittedReason}
                  theme={"surface"}
                  editable={
                    !timeTableElement.omitted?.timeTableElementOmittedReason
                  }
                ></InputField>
                <ButtonLayout>
                  <Button
                    buttonType="outlined"
                    onClick={() => {
                      setOmittedPopUpVisible(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    buttonType="filled"
                    onClick={async () => {
                      if (timeTableElement.omitted) {
                        await deleteOmitTimeTableElement(
                          timeTableElement.timeTableElementUUID
                        );
                        queryClient.invalidateQueries("timeTableElement");
                        queryClient.invalidateQueries("timetable");
                      } else {
                        let omittedDate = getParsedMonth(
                          new Date(startDate),
                          timeTableElement.timeTableElementDay
                        );
                        await omitTimeTableElement({
                          timeTableElementUUID:
                            timeTableElement.timeTableElementUUID,
                          timeTableElementOmittedReason: omittedReason,
                          timeTableElementOmittedDate: omittedDate,
                        });
                        queryClient.invalidateQueries("timeTableElement");
                        queryClient.invalidateQueries("timetable");
                      }
                      setOmittedPopUpVisible(false);
                    }}
                  >
                    {timeTableElement.omitted
                      ? "Uncancel lesson"
                      : "Cancel lesson"}
                  </Button>
                </ButtonLayout>
              </PopUpLayout>
            </PopUp>
          </>
        )}
      </SidebarLayout>
    </>
  );
};

function getParsedMonth(weekStartDay, weekDayName) {
  let addDays = 0;

  switch (weekDayName) {
    case "Monday":
      addDays = 1;
      break;
    case "Tuesday":
      addDays = 2;
      break;
    case "Wednesday":
      addDays = 3;
      break;
    case "Thursday":
      addDays = 4;
      break;
    case "Friday":
      addDays = 5;
      break;
    case "Saturday":
      addDays = 6;
      break;
    case "Sunday":
      addDays = 7;
      break;
  }

  return new Date(
    weekStartDay.getFullYear(),
    weekStartDay.getMonth(),
    weekStartDay.getDate() + addDays
  );
}
