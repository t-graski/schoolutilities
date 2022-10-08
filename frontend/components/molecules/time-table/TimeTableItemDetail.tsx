import { useRouter } from "next/router";
import React from "react";
import { styled } from "../../../stitches.config";
import { TimeTableItemType } from "../../atoms/TimeTableItem";

type Props = {
  item: TimeTableItemType;
};

const TimeTableItemLayout = styled("div", {
    variants: {
        omitted: {
            true: {
                textDecoration: "line-through",
            },
            false: {
                textDecoration: "none",
            },
        },
    },
    });

export const TimeTableItem: React.FC<Props> = ({ item }) => {
  const router = useRouter();

  console.log(item);

  return (
    <>
    <TimeTableItemLayout omitted={!!item?.omitted}>
      {item?.schoolSubjectName}
      <br />
      {item?.timeTableElementStartTime &&
        getSmallTimeFormat(item.timeTableElementStartTime)}{" "}
      -{" "}
      {item?.timeTableElementEndTime &&
        getSmallTimeFormat(item.timeTableElementEndTime)}
      <br /></TimeTableItemLayout>
    </>
  );
};

function getSmallTimeFormat(time: string) {
  let hour = new Date(time).getHours();
  let minute = new Date(time).getMinutes();
  return formatTime(hour) + ":" + formatTime(minute);
}

function formatTime(time: number) {
  return time < 10 ? "0" + time : time;
}

TimeTableItem.defaultProps = {};

export default TimeTableItem;
