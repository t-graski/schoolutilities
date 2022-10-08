import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { styled } from "../../stitches.config";
import { PopUp } from "../molecules/PopUp";
const TimeTableItemDetail = dynamic(
  () => import("../molecules/time-table/TimeTableItemDetail")
);

export type TimeTableItemType = {
  timeTableElementUUID?: string;
  timeTableElementStartTime?: string;
  timeTableElementEndTime?: string;
  //- timeTableElementDay?: string;
  //- timeTableElementCreationTimestamp?: string;
  overlaps?: number;
  overlapStart?: number;
  omitted?: {
    timeTableOmittedDate: string;
    timeTableOmittedReason: string;
  };
  schoolSubjectName?: string;
  holidayUUID?: string;
  holidayName?: string;
  timeTableElementTeachers?: {
    userUUID: string;
    userFirstname: string;
    userLastname: string;
    //- userBirthDate: string;
    userEmail: string;
    //- userEmailVerified: boolean;
    //- userCreationTimestamp: string;
    //- userLastLoginTimestamp: string;
  }[];
  substitution?: {
    timeTableSubstitutionUUID: string;
    //- timeTableSubstitutionDate: string;
    //+ timeTableSubstitutionSubjectName: string;
    timeTableSubstitutionClasses: {
      schoolClassUUID: string;
      schoolClassName: string;
    }[];
    timeTableSubstitutionTeachers: {
      userUUID: string;
      userFirstname: string;
      userLastname: string;
      //- userBirthDate: string;
      userEmail: string;
      //- userEmailVerified: boolean;
      //- userCreationTimestamp: string;
      //- userLastLoginTimestamp: string;
    }[];
  };
};

type Props = {
  item: TimeTableItemType;
  startTime: string;
};

const TimeTableSubjectName = styled("span", {
  fontSize: "1.1rem",
  fontWeight: "bold",
});

export const TimeTableItem: React.FC<Props> = ({ item, startTime }) => {
  let startPoint = getRowFromTime(item.timeTableElementStartTime, startTime);
  let endPoint = getRowFromTime(item.timeTableElementEndTime, startTime);
  let now = new Date();
  let endTime = new Date(item.timeTableElementEndTime);
  let isBeforeNow = endTime < now;
  let overlapColumns = item.overlaps ? 24 / item.overlaps : 24;
  const router = useRouter();

  const TimeTableItemLayout = styled("div", {
    gridRow: `${startPoint} / ${endPoint}`,
    backgroundColor: isBeforeNow ? "$primary-100" : "$primary-300",
    color: isBeforeNow ? "$neutral-300" : "$neutral-500",
    borderRadius: "10px",
    padding: "$2x",
    gap: "$2x",
    border: isBeforeNow ? "3px solid $primary-200" : "3px solid $primary-400",
    boxSizing: "border-box",
    gridColumn: `${
      item.overlapStart * overlapColumns + 1
    } / span ${overlapColumns}`,
    overflowX: "hidden",
    cursor: "pointer",

    variants: {
      layout: {
        time: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          backgroundColor: "transparent",
          color: "$neutral-500",
          padding: "0",
          border: "none",
        },
        small: {
          padding: "0",
          wordBreak: "break-word",
        },
        big: {},
        omitted: {
          textDecoration: "line-through",
        },
      },
      state: {
        omitted: {
          textDecoration: "line-through",
          borderColor: "$error",
        },
        normal: {},
      },
    },
  });

  return (
    <>
      {item?.schoolSubjectName ? (
        <PopUp
          onOpenChange={(open) => {
              console.log(open);
            if (open) {
              router.push({
                query: { ...router.query, detail: item.timeTableElementUUID },
              });
            } else {
              router.push({
                query: { ...router.query, detail: null },
              });
            }
          }}
          defaultOpen={router.query?.detail === item.timeTableElementUUID}
          openButton={
            <TimeTableItemLayout
              layout={item.overlaps > 1 ? "small" : "big"}
              state={item?.omitted ? "omitted" : "normal"}
            >
              <TimeTableSubjectName>
                {item.schoolSubjectName}
              </TimeTableSubjectName>
              <div>
                {getSmallTimeFormat(item.timeTableElementStartTime)} -{" "}
                {getSmallTimeFormat(item.timeTableElementEndTime)}
              </div>

              {item.timeTableElementTeachers.map((teacher, index) => (
                <div key={index}>{teacher.userFirstname}</div>
              ))}
            </TimeTableItemLayout>
          }
        >
          <TimeTableItemDetail item={item}></TimeTableItemDetail>
        </PopUp>
      ) : (
        <TimeTableItemLayout layout="time">
          <div>{getSmallTimeFormat(item.timeTableElementStartTime)}</div>
        </TimeTableItemLayout>
      )}
    </>
  );
};

function getRowFromTime(time: string, startTime: string) {
  let hour = new Date(time).getHours() - parseInt(startTime.split(":")[0]);
  let minute = new Date(time).getMinutes() - parseInt(startTime.split(":")[1]);
  if (minute < 0) {
    hour--;
    minute = 60 + minute;
  }
  let row = Math.floor(1 + hour * 12 + minute / 5);
  return row < 1 ? 1 : row;
}

function getSmallTimeFormat(time: string) {
  let hour = new Date(time).getHours();
  let minute = new Date(time).getMinutes();
  return formatTime(hour) + ":" + formatTime(minute);
}

function formatTime(time: number) {
  return time < 10 ? "0" + time : time;
}
