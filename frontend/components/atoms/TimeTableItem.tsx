import React from "react";
import { styled } from "../../stitches.config";

type Props = {
  item: {
    name?: string;
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
  startTime: string;
};

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
      {item?.name ? (
        <TimeTableItemLayout>
          <div>{item.name}</div>
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
  if(minute < 0) {
    hour--;
    minute = 60 + minute;
  }
  let row = Math.floor(1 + hour * 12 + minute / 5);
  return row < 1 ? 1 : row;
}
