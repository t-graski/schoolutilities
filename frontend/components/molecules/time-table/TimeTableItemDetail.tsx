import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { fetchSchoolSubjects } from "utils/requests/admin";
import { styled } from "../../../stitches.config";
import SvgEdit from "../../atoms/svg/SvgEdit";
import { TimeTableItemType } from "../../atoms/TimeTableItem";

type Props = {
  item: TimeTableItemType;
};

const TimeTableItemLayout = styled("div", {});

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

export const TimeTableItemDetail: React.FC<Props> = ({ item }) => {
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  console.log(item?.timeTableElementStartTime);

  return (
    <>
      <TimeTableItemLayout>
        <HeaderLayout omitted={!!item?.omitted}>
          {item?.schoolSubject.schoolSubjectName}
          {" - "} {item.schoolSubject.schoolSubjectAbbreviation}{" "}
          <StyledButton
            onClick={() => {
              router.push(
                `/school/${schoolUUID}/timetable/element/${item?.timeTableElementUUID}`
              );
            }}
          >
            <SvgEdit></SvgEdit>
          </StyledButton>
        </HeaderLayout>
        {item?.timeTableElementStartTime &&
          getSmallTimeFormat(item.timeTableElementStartTime)}{" "}
        -{" "}
        {item?.timeTableElementEndTime &&
          getSmallTimeFormat(item.timeTableElementEndTime)}
        <br />
        <br />
        {item?.omitted && (
          <span>
            Omitted reason:{" "}
            {item?.omitted.timeTableElementOmittedReason}
          </span>
        )}
        <br />
      </TimeTableItemLayout>
    </>
  );
};

function getSmallTimeFormat(time: string) {
  let hour = new Date(time).getHours();
  let minute = new Date(time).getMinutes();
  console.log(time, hour, minute);
  return formatTime(hour) + ":" + formatTime(minute);
}

function formatTime(time: number) {
  return time < 10 ? "0" + time : time;
}

TimeTableItemDetail.defaultProps = {};

export default TimeTableItemDetail;
