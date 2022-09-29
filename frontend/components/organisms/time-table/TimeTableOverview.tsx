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
    date: string;
    dayTimeTable: TimeTableItem[];
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
  weekTimeTable = {
    "Monday": [
        {
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
        },
        {
            "timeTableElementUUID": "T474c1ea6-29f0-4455-b00a-b3bcc8d36eb2",
            "timeTableElementStartTime": "2022-10-10T06:50:00.000Z",
            "timeTableElementEndTime": "2022-10-10T07:45:00.000Z",
            "timeTableElementDay": "Monday",
            "timeTableElementCreationTimestamp": "2022-09-27T06:32:26.000Z",
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
        },
        {
            "timeTableElementUUID": "T3fe985d4-4fac-4e2b-a798-b05b74d79f4f",
            "timeTableElementStartTime": "2022-10-10T08:00:00.000Z",
            "timeTableElementEndTime": "2022-10-10T08:50:00.000Z",
            "timeTableElementDay": "Monday",
            "timeTableElementCreationTimestamp": "2022-09-27T06:31:32.000Z",
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
        }
    ],
    "Tuesday": [
        {
            "timeTableElementUUID": "T2a5981b8-98b8-4e09-9dac-2b471d478589",
            "timeTableElementStartTime": "2022-10-10T06:00:00.000Z",
            "timeTableElementEndTime": "2022-10-10T06:50:00.000Z",
            "timeTableElementDay": "Tuesday",
            "timeTableElementCreationTimestamp": "2022-09-27T06:54:00.000Z",
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
        }
    ]
},
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
                  dayTimeTable={dayTimeTable.dayTimeTable}
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
