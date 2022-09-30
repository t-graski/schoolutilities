import React from "react";
import { styled } from "../../stitches.config";

export type TimeTableItemType = {
  timeTableElementUUID?: string;
  timeTableElementStartTime: string;
  timeTableElementEndTime: string;
  //- timeTableElementDay?: string;
  //- timeTableElementCreationTimestamp?: string;
  overlaps?: number;
  overlapStart?: number;
  schoolSubjectName?: string;
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
console.log(item);
  let now = new Date();
  let endTime = new Date(item.timeTableElementEndTime);
  let isBeforeNow = endTime < now;
  let overlapColumns = item.overlaps ? 24 / item.overlaps : 24;

  const TimeTableItemLayout = styled("div", {
    gridRow: `${startPoint} / ${endPoint}`,
    backgroundColor: isBeforeNow ? "LightGray" : "LightBlue",
    color: "black",
    gridColumn: "100%",
    borderRadius: "10px",
    padding: "$3x",
    gap: "$2x",
    gridColumn: `${
      item.overlapStart * overlapColumns + 1
    } / span ${overlapColumns}`,
    overflowX: "hidden",

    variants: {
      layout: {
        time: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          backgroundColor: "transparent",
          color: "$fontPrimary",
          padding: "0",
        },
        small: {
          padding: "0",
          wordBreak: "break-word",
        },
        big: {},
      },
    },
  });

  return (
    <>
      {item?.schoolSubjectName ? (
        <TimeTableItemLayout layout={item.overlaps > 1 ? "small" : "big"}>
          <TimeTableSubjectName>{item.schoolSubjectName}</TimeTableSubjectName>
          <div>
            {getSmallTimeFormat(item.timeTableElementStartTime)} -{" "}
            {getSmallTimeFormat(item.timeTableElementEndTime)}
          </div>

          {item.timeTableElementTeachers.map((teacher, index) => (
            <div key={index}>{teacher.userFirstname}</div>
          ))}
        </TimeTableItemLayout>
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
