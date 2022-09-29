import React, { useEffect, useState } from "react";
import { TimeTableColumn } from "../../molecules/TimeTableColumn";
import { styled } from "../../../stitches.config";
import { TimeTableTime } from "../../molecules/TimeTableTime";
import { TimeTableItem } from "../../atoms/TimeTableItem";

type Props = {
  startTime: string;
  endTime: string;
  weekTimeTable?: {
    day: string;
    date?: string;
    timeTableElements: TimeTableItem[];
  }[];
};

const TimeTableGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr repeat(5, 3fr)",
  gridTemplateRows: "1fr",
  gridGap: "1rem",
  backgroundColor: "$gray100",
  borderRadius: "0.5rem",
  width: "100%",
});

const TimeTableInformationGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr repeat(5, 3fr)",
  gridTemplateRows: "1fr",
  gridGap: "1rem",
  backgroundColor: "$gray100",
  borderRadius: "0.5rem",
  width: "100%",
});

const TimeTableDay = styled("div", {
  display: "flex",
  flexDirection: "column",
  backgroundColor: "$white",
  borderRadius: "0.5rem",
  height: "100%",
  position: "relative",
});

const TimeTableDayHeader = styled("div", {
  display: "flex",
  flexDirection: "column",
});

const TimeTableLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "89vh",
  overflowX: "auto",
});

const TimeTableDayHeaderTitle = styled("span", {});
const TimeTableDayHeaderDate = styled("span", {});

export const TimeTableOverview: React.FC<Props> = ({
  startTime,
  endTime,
  weekTimeTable,
}) => {
  const [date, setDate] = useState(new Date());

  console.log(calculateTopDistance(date));

  useEffect(() => {
    let startInterval = setInterval(() => {
      setDate(new Date());
      console.log("interval");
    }, 15000);

    return () => {
      clearInterval(startInterval);
    };
  }, []);

  const TimeTableMarker = styled("div", {
    position: "absolute",
    width: "100%",
    height: "2px",
    backgroundColor: "red",
    top: calculateTopDistance(date) * 100 + "%",
    display: calculateTopDistance(date) < 1 ? "block" : "none",
    zIndex: 1,
  });

  const timeTableRows = calculate5MinuteRows(startTime, endTime);

  return (
    <>
      <TimeTableLayout>
        <TimeTableInformationGrid>
          <div></div>
          {weekTimeTable.map((dayTimeTable, index) => {
            return (
              <TimeTableDayHeader key={index}>
                <TimeTableDayHeaderTitle>
                  {dayTimeTable.day} - {dayTimeTable.date}
                </TimeTableDayHeaderTitle>
              </TimeTableDayHeader>
            );
          })}
        </TimeTableInformationGrid>
        <TimeTableGrid>
          <TimeTableTime
            timeTableRows={timeTableRows}
            startTime={startTime}
          ></TimeTableTime>
          {weekTimeTable.map((dayTimeTable, index) => {
            return (
              <TimeTableDay key={index}>
                {date.getDay() == index + 1 && (
                  <TimeTableMarker></TimeTableMarker>
                )}
                <TimeTableColumn
                  dayTimeTable={dayTimeTable.timeTableElements}
                  timeTableRows={timeTableRows}
                  startTime={startTime}
                ></TimeTableColumn>
              </TimeTableDay>
            );
          })}
        </TimeTableGrid>
      </TimeTableLayout>
    </>
  );
};

function calculateTopDistance(date: Date) {
  return (
    (date.getHours() - 8 + date.getMinutes() / 60 + date.getSeconds() / 3600) /
    9.25
  );
}

function calculate5MinuteRows(startTime: string, endTime: string) {
  const start = startTime.split(":");
  const end = endTime.split(":");

  const startMinutes = parseInt(start[0]) * 60 + parseInt(start[1]);
  const endMinutes = parseInt(end[0]) * 60 + parseInt(end[1]);

  return (endMinutes - startMinutes) / 5;
}
