import { Button } from "@/atoms/Button";
import { InputField } from "@/atoms/input/InputField";
import { PopUp } from "@/molecules/PopUp";
import { TimeTableItemDetail } from "@/molecules/time-table/TimeTableItemDetail";
import { styled } from "@stitches/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  deleteOmitTimeTableElement,
  getTimeTableElement,
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

export const TimeTableItemSidebar: React.FC<{}> = () => {
  const [omittedPopUpVisible, setOmittedPopUpVisible] = useState(false);
  const router = useRouter();
  const [timeTableElementUUID, setTimeTableElementUUID] = useState<string>(
    router.query.detail as string
  );
  const [omittedReason, setOmittedReason] = useState("");
  const schoolUUId = router.query.schoolUUID as string;
  const startDate = router.query.startDate as string;

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

  console.log(timeTableElement.timeTableElementOmitted);

  return (
    <>
      <SidebarLayout>
        {timeTableElement && (
          <>
            <TimeTableItemDetail item={timeTableElement}></TimeTableItemDetail>
            <Link
              href={`/school/${schoolUUId}/timetable/element/${timeTableElementUUID}/substitution`}
              passHref
            >
              <Button buttonType="filled">Add substitution</Button>
            </Link>
            <Button
              buttonType="outlined"
              onClick={() => {
                setOmittedReason("");
                setOmittedPopUpVisible(true);
              }}
            >
              {timeTableElement?.timeTableElementOmitted
                ? "Uncancel"
                : "Cancel"}{" "}
              element
            </Button>
            <PopUp
              openButton={<></>}
              open={omittedPopUpVisible}
              onOpenChange={setOmittedPopUpVisible}
            >
              <PopUpLayout>
                Do you really want to{" "}
                {timeTableElement.timeTableElementOmitted
                  ? "uncancel"
                  : "cancel"}{" "}
                this element ({timeTableElement.schoolSubject.schoolSubjectName}
                )?
                <InputField
                  inputType={"text"}
                  value={
                    timeTableElement.timeTableElementOmitted
                      ? timeTableElement.timeTableElementOmitted
                          .timeTableElementOmittedReason
                      : omittedReason
                  }
                  onChange={setOmittedReason}
                  theme={"surface"}
                  editable={
                    !timeTableElement.timeTableElementOmitted
                      ?.timeTableElementOmittedReason
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
                    onClick={() => {
                      if (timeTableElement.timeTableElementOmitted) {
                        deleteOmitTimeTableElement(
                          timeTableElement.timeTableElementUUID
                        );
                      } else {
                        let omittedDate = getParsedMonth(
                          new Date(startDate),
                          timeTableElement.timeTableElementDay
                        );
                        omitTimeTableElement({
                          timeTableElementUUID:
                            timeTableElement.timeTableElementUUID,
                          timeTableElementOmittedReason: omittedReason,
                          timeTableElementOmittedDate: omittedDate,
                        });
                      }
                      setOmittedPopUpVisible(false);
                    }}
                  >
                    {timeTableElement.timeTableElementOmitted
                      ? "Uncancel"
                      : "Cancel"}
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
      addDays = 0;
      break;
    case "Tuesday":
      addDays = 1;
      break;
    case "Wednesday":
      addDays = 2;
      break;
    case "Thursday":
      addDays = 3;
      break;
    case "Friday":
      addDays = 4;
      break;
    case "Saturday":
      addDays = 5;
      break;
    case "Sunday":
      addDays = 6;
      break;
  }

  return new Date(
    weekStartDay.getFullYear(),
    weekStartDay.getMonth(),
    weekStartDay.getDate() + addDays
  );
}
