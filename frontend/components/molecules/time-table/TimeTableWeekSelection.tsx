import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
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
  justifyContent: "space-between",
  height: "8vh",
  padding: "$1x",
  alignItems: "center",
  gap: "$1x",
  backgroundColor: "$neutral-100",
  borderRadius: "15px",
  minWidth: "180px",
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
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    let currentEndDate = new Date(startDate);
    currentEndDate.setFullYear(currentEndDate.getFullYear());
    currentEndDate.setMonth(currentEndDate.getMonth());
    currentEndDate.setDate(currentEndDate.getDate() + 6);
    setEndDate(new Date(currentEndDate).toISOString());
  }, [startDate]);

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
              moment(startDate).subtract(1, "w").format("YYYY-MM-DD")
            );
            setEndDate(moment(endDate).subtract(1, "w").format("YYYY-MM-DD"));
          }}
        >
          <SvgRightArrow></SvgRightArrow>
        </TimeTableArrowLayout>
        {startDate &&
          //@ts-ignore
          new Intl.DateTimeFormat("default", options).format(
            new Date(startDate)
          )}{" "}
        - {/*@ts-ignore */}
        {startDate &&
          //@ts-ignore
          new Intl.DateTimeFormat("default", options).format(new Date(endDate))}
        <TimeTableArrowLayout
          direction={"right"}
          onClick={() => {
            setStartDate(moment(startDate).add(1, "w").format("YYYY-MM-DD"));
            setEndDate(moment(endDate).add(1, "w").format("YYYY-MM-DD"));
          }}
        >
          <SvgRightArrow></SvgRightArrow>
        </TimeTableArrowLayout>
      </TimeTableWeekSelectionLayout>
    </>
  );
};

export function getCurrentWeekMonday() {
  let date = new Date();
  let day = date.getDay();
  let diff = date.getDate() - day + (day == 0 ? -6 : 1);
  return new Date(date.setDate(diff)).toISOString().split("T")[0];
}
