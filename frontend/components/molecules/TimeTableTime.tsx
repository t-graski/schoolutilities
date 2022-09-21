import React from "react";
import { styled } from "../../stitches.config";
import { TimeTableItem } from "../atoms/TimeTableItem";

type Props = {};

const TimeTableColumnGrid = styled("div", {
  display: "grid",
  gridTemplateRows: "repeat(111, 1fr)",
  height: "100%",
  width: "100%",
});

export const TimeTableTime: React.FC<Props> = ({}) => {
  const timeTableTime = [];

  for (let i = 0; i < 19; i++) {
    timeTableTime.push(i);
  }

  return (
    <>
      <TimeTableColumnGrid>
        {timeTableTime.map((i, index) => (
          <TimeTableItem
            key={index}
            item={{
              startTime: getTimeFromRow(i),
              endTime: getTimeFromRow(i + 1),
            }}
          ></TimeTableItem>
        ))}
      </TimeTableColumnGrid>
    </>
  );
};

function getTimeFromRow(row: number) {
  let hour = Math.floor(row / 2) + 8;
  let minute = (row % 2) * 30;
  let time = `${formatTime(hour)}:${formatTime(minute)}`;
  return time;
}

function formatTime(time) {
  if (time < 10) {
    return "0" + time;
  }
  return time;
}
