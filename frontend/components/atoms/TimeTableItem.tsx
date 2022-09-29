import React from "react";
import { styled } from "../../stitches.config";

export type TimeTableItem = {
  schoolSubjectName?: string;
  shortName?: string;
  startTime: string;
  endTime: string;
  teachers?: {
    name: string;
    id: string;
  }[];
  classes?: {
    name: string;
    id: string;
  }[];
};

type Props = {
  item: TimeTableItem;
  startTime: string;
};

/*{
            "timeTableElementUUID": "T9ade3d0a-853d-491e-ab85-c187bf1a867d",
            "timeTableElementStartTime": "2022-10-10T06:00:00.000Z",
            "timeTableElementEndTime": "2022-10-10T06:50:00.000Z",
            "timeTableElementDay": "Monday",
            "timeTableElementCreationTimestamp": "2022-09-27T06:32:32.000Z",
            "schoolSubjectName": "German",
            "timeTableElementTeachers": [
                {
                    "userUUID": "151d402f9-33fb-4b66-8599-29f17c448630",
                    "userFirstname": "Tobias",
                    "userLastname": "Graski",
                    "userBirthDate": "2003-09-15T00:00:00.000Z",
                    "userEmail": "graski.tobias@gmail.com",
                    "userEmailVerified": false,
                    "userCreationTimestamp": "2022-09-27T06:16:44.000Z",
                    "userLastLoginTimestamp": "2022-09-28T08:26:20.000Z"
                }
            ]
        } */

export const TimeTableItem: React.FC<Props> = ({ item, startTime }) => {
  let startPoint = getRowFromTime(item.startTime, startTime);
  let endPoint = getRowFromTime(item.endTime, startTime);

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
            {item.startTime} - {item.endTime}
          </div>

          {item.teachers.map((teacher, index) => (
            <div key={index}>{teacher.name}</div>
          ))}

          {item.classes.map((classItem, index) => (
            <div key={index}>{classItem.name}</div>
          ))}
        </TimeTableItemLayout>
      ) : (
        <TimeTableItemLayout layout="time">
          <div>{item.startTime}</div>
        </TimeTableItemLayout>
      )}
    </>
  );
};

function getRowFromTime(time: string, startTime: string) {
  let hour = parseInt(time.split(":")[0]) - parseInt(startTime.split(":")[0]);
  let minute = parseInt(time.split(":")[1]) - parseInt(startTime.split(":")[1]);
  if (minute < 0) {
    hour--;
    minute = 60 + minute;
  }
  let row = Math.floor(1 + hour * 12 + minute / 5);
  return row < 1 ? 1 : row;
}
