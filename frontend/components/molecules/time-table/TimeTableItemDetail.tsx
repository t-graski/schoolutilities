import SvgClose from "@/atoms/svg/SvgClose";
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
  width: 25,
  height: 25,
  color: "$neutral-500",
  padding: 5,
});

const HeaderLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "$2x",
  minHeight: 35,

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

const ButtonLayout = styled("div", {
  width: 70,
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "$2x",
  padding: "0px 5px",
});

const LineThrough = styled("span", {
  textDecoration: "line-through",
});

export const TimeTableItemDetail: React.FC<Props> = ({ item }) => {
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  return (
    <>
      <TimeTableItemLayout>
        <HeaderLayout omitted={!!item?.omitted || !!item?.substitution}>
          {item?.schoolSubject.schoolSubjectName}
          {" - "} {item.schoolSubject.schoolSubjectAbbreviation}{" "}
          <ButtonLayout>
            <StyledButton
              onClick={() => {
                router.push(
                  `/school/${schoolUUID}/timetable/element/${item?.timeTableElementUUID}`
                );
              }}
            >
              <SvgEdit></SvgEdit>
            </StyledButton>
            <StyledButton
              onClick={() => {
                router.push({
                  query: { ...router.query, detail: undefined },
                });
              }}
            >
              <SvgClose></SvgClose>
            </StyledButton>
          </ButtonLayout>
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
            Omitted reason: {item?.omitted.timeTableElementOmittedReason}
          </span>
        )}
        {item?.substitution && (
          <span>
            Substitution changes: <br />
            <LineThrough>
              {item?.schoolSubject.schoolSubjectName}
            </LineThrough> -{" "}
            {item?.substitution.schoolSubject.schoolSubjectName}
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
