import React from "react";
import { styled } from "../../stitches.config";

export type TimeTableItem = {
  timeTableElementUUID?: string;
  timeTableElementStartTime?: string;
  timeTableElementEndTime?: string;
  timeTableElementDay?: string;
  timeTableElementCreationTimestamp?: string;
  schoolSubjectName?: string;
  startTime?: string;
  endTime?: string;
  timeTableElementTeachers?: {
    userUUID: string;
    userFirstname: string;
    userLastname: string;
    userBirthDate: string;
    userEmail: string;
    userEmailVerified: boolean;
    userCreationTimestamp: string;
    userLastLoginTimestamp: string;
  }[];
  substitution?: {
    timeTableSubstitutionUUID: string;
    timeTableSubstitutionDate: string;
    timeTableSubstitutionClasses: {
      schoolClassUUID: string;
      schoolClassName: string;
    }[];
    timeTableSubstitutionTeachers: {
      userUUID: string;
      userFirstname: string;
      userLastname: string;
      userBirthDate: string;
      userEmail: string;
      userEmailVerified: boolean;
      userCreationTimestamp: string;
      userLastLoginTimestamp: string;
    }[];
  };
};

type Props = {
  item: TimeTableItem;
  startTime: string;
};

export const TimeTableItem: React.FC<Props> = ({ item, startTime }) => {
  let startPoint = getRowFromTime(item.timeTableElementStartTime ?? item.startTime, startTime);
  let endPoint = getRowFromTime(item.timeTableElementEndTime ?? item.endTime, startTime);
  
  const TimeTableItemLayout = styled("div", {
    gridRow: `${startPoint} / ${endPoint}`,
    backgroundColor: "lightblue",
    color: "black",
    gridColumn: "100%",

    variants: {
      layout: {
        time: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          backgroundColor: "transparent",
          color: "$fontPrimary",
        },
      },
    },
  });
  return (
    <>
      {item?.schoolSubjectName ? (
        <TimeTableItemLayout>
          <div>{item.schoolSubjectName}</div>
          <div>
            {getSmallTimeFormat(item.timeTableElementStartTime)} - {getSmallTimeFormat(item.timeTableElementEndTime)}
          </div>

          {item.timeTableElementTeachers.map((teacher, index) => (
            <div key={index}>{teacher.userFirstname}</div>
          ))}
        </TimeTableItemLayout>
      ) : (
        <TimeTableItemLayout layout="time">
          <div>{getSmallTimeFormat(item.startTime)}</div>
        </TimeTableItemLayout>
      )}
    </>
  );
};

function getRowFromTime(time: string, startTime: string) {
  console.log(time);
  let hour = new Date(time).getHours() - parseInt(startTime.split(":")[0]);
  let minute = new Date(time).getMinutes() - parseInt(startTime.split(":")[1]);
  if (minute < 0) {
    hour--;
    minute = 60 + minute;
  }
  console.log(new Date(time).getHours());
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