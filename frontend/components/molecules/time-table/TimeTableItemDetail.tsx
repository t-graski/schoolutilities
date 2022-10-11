import { useRouter } from "next/router";
import React from "react";
import { styled } from "../../../stitches.config";
import SvgEdit from "../../atoms/svg/SvgEdit";
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

const StyledButton = styled("button", {
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  width: 15,
  height: 15,
  color: "$neutral-500",
});

const HeaderLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "$2x",
});

export const TimeTableItem: React.FC<Props> = ({ item }) => {
  const router = useRouter();
  const { schoolUUID } = router.query;

  console.log(item);

  return (
    <>
      <TimeTableItemLayout omitted={!!item?.omitted}>
        <HeaderLayout>
          {item?.schoolSubjectName}{" "}
          <StyledButton
            onClick={() => {
              router.push(`/school/${schoolUUID}/timetable/element/${item?.timeTableElementUUID}`);
            }}
          >
            <SvgEdit></SvgEdit>
          </StyledButton>
        </HeaderLayout>
        <br />
        {item?.timeTableElementStartTime &&
          getSmallTimeFormat(item.timeTableElementStartTime)}{" "}
        -{" "}
        {item?.timeTableElementEndTime &&
          getSmallTimeFormat(item.timeTableElementEndTime)}
        <br />
      </TimeTableItemLayout>
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
