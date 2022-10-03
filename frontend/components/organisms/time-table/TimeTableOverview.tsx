import React, { useEffect, useState } from "react";
import { TimeTableColumn } from "../../molecules/TimeTableColumn";
import { styled } from "../../../stitches.config";
import { TimeTableTime } from "../../molecules/TimeTableTime";
import { TimeTableItemType } from "../../atoms/TimeTableItem";
import { useQuery } from "react-query";
import { getTimeTableForClass } from "../../../utils/requests";

type Props = {
  startDate: string;
  schoolClassUUID: string;
};

const TimeTableGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr repeat(5, 3fr)",
  gridTemplateRows: "1fr",
  gridGap: "$2x",
  backgroundColor: "$gray100",
  borderRadius: "0.5rem",
  width: "100%",
  padding: "0 $2x",
});

const TimeTableInformationGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr repeat(5, 3fr)",
  gridTemplateRows: "1fr",
  gridGap: "$2x",
  backgroundColor: "$gray100",
  borderRadius: "0.5rem",
  width: "100%",
  padding: "0 $2x",
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
  height: "81vh",
  overflowX: "auto",
});

const TimeTableDayHeaderTitle = styled("span", {});
const TimeTableDayHeaderDate = styled("span", {});

export const TimeTableOverview: React.FC<Props> = ({
  startDate,
  schoolClassUUID,
}) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let startInterval = setInterval(() => {
      setDate(new Date());
    }, 15000);

    return () => {
      clearInterval(startInterval);
    };
  }, []);

  const { data: weekTimeTable, status } = useQuery(
    ["timetable", schoolClassUUID, startDate],
    () => getTimeTableForClass(schoolClassUUID + "/" + startDate)
  );
  console.log(weekTimeTable);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  let { startTime, endTime } = getStartEndTime(weekTimeTable);

  const TimeTableMarker = styled("div", {
    position: "absolute",
    width: "100%",
    height: "2px",
    backgroundColor: "red",
    top: calculateTopDistance(date, startTime, endTime) * 100 + "%",
    display:
      calculateTopDistance(date, startTime, endTime) < 1 ? "block" : "none",
    zIndex: 1,
  });

  const timeTableRows = calculate5MinuteRows(startTime, endTime);
  console.log(date.toDateString());
  return (
    <>
      <TimeTableLayout>
        <TimeTableInformationGrid>
          <div></div>
          {weekTimeTable.map((dayTimeTable, index) => {
            return (
              <TimeTableDayHeader key={index}>
                <TimeTableDayHeaderTitle>
                  {dayTimeTable.day}  {dayTimeTable.date}
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
                {date.toDateString() ==
                  new Date(
                    dayTimeTable.timeTableElements[0]?.timeTableElementStartTime
                  ).toDateString() && <TimeTableMarker></TimeTableMarker>}
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

function calculateTopDistance(date: Date, startTime, endTime) {
  return (
    (getHoursFromDate(date) - getHoursFromTime(startTime)) /
    (getHoursFromTime(endTime) - getHoursFromTime(startTime))
  );
}

function getHoursFromDate(date) {
  return date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
}

function getHoursFromTime(time) {
  return parseInt(time.split(":")[0]) + parseInt(time.split(":")[1]) / 60;
}

function calculate5MinuteRows(startTime: string, endTime: string) {
  const start = startTime.split(":");
  const end = endTime.split(":");

  const startMinutes = parseInt(start[0]) * 60 + parseInt(start[1]);
  const endMinutes = parseInt(end[0]) * 60 + parseInt(end[1]);

  return (endMinutes - startMinutes) / 5;
}

function getStartEndTime(timeTable) {
  let startTime = getDateFromTime("12:00");
  let endTime = getDateFromTime("13:00");

  const minDate = new Date(
    Math.min.apply(
      null,
      timeTable.flatMap((dayTimeTable) =>
        dayTimeTable.timeTableElements.map((timeTableElement) => {
          const date = new Date(timeTableElement.timeTableElementStartTime);

          date.setFullYear(new Date().getFullYear());
          date.setMonth(new Date().getMonth());
          date.setDate(new Date().getDate());

          return date;
        })
      )
    )
  );
  const maxDate = new Date(
    Math.max.apply(
      null,
      timeTable.flatMap((dayTimeTable) =>
        dayTimeTable.timeTableElements.map((timeTableElement) => {
          const date = new Date(timeTableElement.timeTableElementEndTime);

          date.setFullYear(new Date().getFullYear());
          date.setMonth(new Date().getMonth());
          date.setDate(new Date().getDate());

          return date;
        })
      )
    )
  );

  return {
    startTime: getTimeFromDate(minDate),
    endTime: getTimeFromDate(maxDate),
  };
}

function getTimeFromDate(date: Date) {
  return (
    date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0")
  );
}

function getDateFromTime(time) {
  return new Date("2021-03-01T" + time + ":00.000Z");
}
