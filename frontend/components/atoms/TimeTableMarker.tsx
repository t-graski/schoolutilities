import React, { useEffect, useState } from "react";
import { styled } from "../../stitches.config";
import { calculateTopDistance } from "../organisms/time-table/TimeTableOverview";

type Props = {
  startTime: string;
  endTime: string;
  dayStartTime: string;
};

export const TimeTableMarker: React.FC<Props> = ({
  startTime,
  endTime,
  dayStartTime,
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
  return (
    <>
      {date.toDateString() == new Date(dayStartTime).toDateString() && (
        <TimeTableMarker></TimeTableMarker>
      )}
    </>
  );
};
