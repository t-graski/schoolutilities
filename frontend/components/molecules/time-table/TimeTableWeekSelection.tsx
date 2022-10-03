import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { styled } from "../../../stitches.config";
import { fetchSchoolClasses } from "../../../utils/requests";
import { SearchSelect } from "../../atoms/input/SearchSelect";
import SvgRightArrow from "../../atoms/svg/SvgRightArrow";

type Props = {
  startDate: string;
  setStartDate: (startDate: string) => void;
};

const TimeTableWeekSelectionLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  height: "8vh",
  padding: "$1x",
  alignItems: "center",
  gap: "$1x",
  backgroundColor: "$primary-200",
  borderRadius: "15px",
  color: "$primary-400",
});

const TimeTableArrowLayout = styled("button", {
  display: "flex",
  width: 20,
  height: 20,
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 2.5,
  color: "$primary-400",

  variants: {
    direction: {
      left: {
        transform: "rotate(180deg)",
      },
      right: {},
    },
  },
});

export const TimeTableWeekSelection: React.FC<Props> = ({
  startDate,
  setStartDate,
}) => {
  let date = new Date(startDate);
  let currentEndDate = new Date(date);
  currentEndDate.setFullYear(currentEndDate.getFullYear());
  currentEndDate.setMonth(currentEndDate.getMonth());
  currentEndDate.setDate(currentEndDate.getDate() + 6);
  const [endDate, setEndDate] = useState(
    new Date(currentEndDate).toISOString()
  );

  let options = {
    month: "2-digit",
    day: "2-digit",
  };

  return (
    <>
      <TimeTableWeekSelectionLayout>
        <TimeTableArrowLayout
          direction={"left"}
          onClick={() => {
            setStartDate(
              new Date(date.setDate(date.getDate() - 7))
                .toISOString()
                .split("T")[0]
            );
            setEndDate(
              new Date(date.setDate(date.getDate() + 7)).toISOString()
            );
          }}
        >
          <SvgRightArrow></SvgRightArrow>
        </TimeTableArrowLayout>
        {/*@ts-ignore */}
        {new Intl.DateTimeFormat("default", options).format(
          new Date(date)
        )} - {/*@ts-ignore */}
        {new Intl.DateTimeFormat("default", options).format(new Date(endDate))}
        <TimeTableArrowLayout
          direction={"right"}
          onClick={() => {
            setStartDate(
              new Date(date.setDate(date.getDate() + 7))
                .toISOString()
                .split("T")[0]
            );
            setEndDate(
              new Date(date.setDate(date.getDate() + 7)).toISOString()
            );
          }}
        >
          <SvgRightArrow></SvgRightArrow>
        </TimeTableArrowLayout>
      </TimeTableWeekSelectionLayout>
    </>
  );
};
