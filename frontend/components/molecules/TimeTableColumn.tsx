import React from "react";
import { styled } from "../../stitches.config";
import { TimeTableHoliday } from "../atoms/TimeTableHoliday";
import { TimeTableItemType, TimeTableItem } from "../atoms/TimeTableItem";

type Props = {
  dayTimeTable: TimeTableItemType[];
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
    gridTemplateColumns: "repeat(24,1fr)",
    gridGap: "2px",
    height: "100%",
    width: "100%",
  });

  dayTimeTable.forEach((element) => {
    // check if the element overlaps with an other element
    let overlaps = 0;
    dayTimeTable.forEach((element2) => {
      if (
        element.timeTableElementStartTime < element2.timeTableElementEndTime &&
        element.timeTableElementEndTime > element2.timeTableElementStartTime
      ) {
        overlaps++;
      }
    });

    let overlayCounter = 0;
    dayTimeTable = dayTimeTable.map((element2) => {
      if (
        element.timeTableElementStartTime < element2.timeTableElementEndTime &&
        element.timeTableElementEndTime > element2.timeTableElementStartTime
      ) {
        if (overlayCounter > 2) {
          console.log(overlayCounter);
        }
        return {
          ...element2,
          overlaps,
          overlapStart: overlayCounter++,
        };
      }
      return element2;
    });
  });

  return (
    <>
      <TimeTableColumnGrid>
        {dayTimeTable[0]?.timeTableElementEndTime &&
          dayTimeTable.map((lesson, index) => (
            <TimeTableItem
              key={index}
              item={lesson}
              startTime={startTime}
            ></TimeTableItem>
          ))}
        {dayTimeTable[0]?.holidayUUID && (
          <TimeTableHoliday
            holidayName={dayTimeTable[0].holidayName}
          ></TimeTableHoliday>
        )}
      </TimeTableColumnGrid>
    </>
  );
};
