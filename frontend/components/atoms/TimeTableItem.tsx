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
};

export const TimeTableItem: React.FC<Props> = ({ item }) => {
  let startPoint = getRowFromTime(item.startTime);
  let endPoint = getRowFromTime(item.endTime);

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

function getRowFromTime(time: string) {
  let hour = parseInt(time.split(":")[0]) - 8;
  let minute = parseInt(time.split(":")[1]);
  let row = Math.floor(1 + hour * 12 + minute / 5);
  return row;
}
