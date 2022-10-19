import React from "react";
import { styled } from "../../stitches.config";

type Props = {
  holidayName: string;
};

export const TimeTableHoliday: React.FC<Props> = ({ 
    holidayName
 }) => {

  const TimeTableItemLayout = styled("div", {
    gridRow: `1 / -1`,
    backgroundColor: "$primary-300",
    color: "$neutral-500",
    borderRadius: "10px",
    padding: "$2x",
    gap: "$2x",
    border: "3px solid $primary-400",
    boxSizing: "border-box",
    gridColumn: `1 / -1`,
    overflowX: "hidden",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  });

  return (
    <>
        <TimeTableItemLayout>
          {holidayName}
        </TimeTableItemLayout>
    </>
  );
};