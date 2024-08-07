import React from "react";
import { styled } from "../../stitches.config";
import { TimeTableItem } from "../atoms/TimeTableItem";

type Props = {
  timeTableRows: number;
  startTime: string;
};

export const TimeTableTime: React.FC<Props> = ({
  timeTableRows,
  startTime,
}) => {
  const timeTableTime = [];

  for (let i = 0; i < Math.round(timeTableRows / 6); i++) {
    timeTableTime.push(i);
  }

  const TimeTableColumnGrid = styled("div", {
    display: "grid",
    gridTemplateRows: `repeat(${timeTableRows}, 1fr)`,
    height: "100%",
    width: "100%",
  });

  return (
    <>
      <TimeTableColumnGrid>
        {timeTableTime.map((i, index) => (
          <TimeTableItem
            key={index}
            item={{
              timeTableElementStartTime: getTimeFromRow(i, startTime),
              timeTableElementEndTime: getTimeFromRow(i + 1, startTime),
            }}
            startTime={startTime}
          ></TimeTableItem>
        ))}
      </TimeTableColumnGrid>
    </>
  );
};

function getTimeFromRow(row: number, startTime: string) {
  let hour = Math.floor(row / 2) + parseInt(startTime.split(":")[0]);
  let minute = (row % 2) * 30 + parseInt(startTime.split(":")[1]);
  if (minute >= 60) {
    hour++;
    minute -= 60;
  }
  let time = new Date(new Date().setHours(hour, minute)).toISOString();
  return time;
}

function formatTime(time) {
  if (time < 10) {
    return "0" + time;
  }
  return time;
}
