import React from "react";
import { styled } from "../../stitches.config";
import { TimeTableItem } from "../atoms/TimeTableItem";

type Props = {
  dayTimeTable: TimeTableItem[];
  timeTableRows: number;
  startTime: string;
};

export const TimeTableColumn: React.FC<Props> = ({
  dayTimeTable,
  timeTableRows,
  startTime,
}) => {
  const TimeTableColumnGrid = styled("div", {
    display: "grid",
    gridTemplateRows: `repeat(${timeTableRows}, 1fr)`,
    height: "100%",
    width: "100%",
  });

  return (
    <>
      <TimeTableColumnGrid>
        {dayTimeTable.map((lesson, index) => (
          <TimeTableItem
            key={index}
            item={lesson}
            startTime={startTime}
          ></TimeTableItem>
        ))}
      </TimeTableColumnGrid>
    </>
  );
};
