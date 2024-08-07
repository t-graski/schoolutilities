import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { styled } from "../../stitches.config";

export type TimeTableElementTeacher = {
  userUUID: string;
  userFirstname: string;
  userLastname: string;
  userEmail: string;
};

export type TimeTableItemType = {
  timeTableElementUUID?: string;
  timeTableElementStartTime?: string;
  timeTableElementEndTime?: string;
  timeTableElementDay?: string;
  overlaps?: number;
  overlapStart?: number;
  timeTableElementOmitted?: {
    timeTableElementOmittedDate: string;
    timeTableElementOmittedReason: string;
  };
  omitted?: {
    timeTableElementOmittedDate: string;
    timeTableElementOmittedReason: string;
  };
  schoolSubject?: {
    schoolSubjectUUID: string;
    schoolSubjectName: string;
    schoolSubjectAbbreviation: string;
  };
  timeTableElementRoomUUID?: string;
  timeTableElementClasses?: string[];
  schoolSubjectUUID?: string;
  holidayUUID?: string;
  holidayName?: string;
  timeTableElementTeachers?: TimeTableElementTeacher[];
  substitution?: {
    timeTableSubstitutionUUID: string;
    timeTableSubstitutionClasses: {
      schoolClassUUID: string;
      schoolClassName: string;
    }[];
    timeTableSubstitutionTeachers: {
      userUUID: string;
      userFirstname: string;
      userLastname: string;
      userEmail: string;
    }[];
    timeTableSubstitutionRoomUUID: string;
    timeTableSubstitutionSubject?: {
      schoolSubjectUUID: string;
      schoolSubjectName: string;
      schoolSubjectAbbreviation: string;
    };
    schoolSubject?: {
      schoolSubjectUUID: string;
      schoolSubjectName: string;
      schoolSubjectAbbreviation: string;
    }
  };
  exam?: {
    timeTableExamUUID: string;
    timeTableExamDate: string;
    timeTableExamDescription: string;
    timeTableExamRoom: string;
  };
};

type Props = {
  item: TimeTableItemType;
  startTime: string;
};

const TimeTableSubjectName = styled("span", {
  display: "block",
  fontSize: "1.1rem",
  fontWeight: "bold",
});

const TimeTableTime = styled("span", {
  fontSize: "0.9rem",
});

export const TimeTableItem: React.FC<Props> = ({ item, startTime }) => {
  const [now, setDate] = useState(new Date());

  useEffect(() => {
    let startInterval = setInterval(() => {
      setDate(new Date());
    }, 45000);

    return () => {
      clearInterval(startInterval);
    };
  }, []);

  let startPoint = getRowFromTime(item.timeTableElementStartTime, startTime);
  let endPoint = getRowFromTime(item.timeTableElementEndTime, startTime);
  let endTime = new Date(item.timeTableElementEndTime);
  let isBeforeNow = endTime < now;
  let overlapColumns = item.overlaps ? 24 / item.overlaps : 24;
  const router = useRouter();
  const timeTableElementUUID = router.query.detail as string;

  const TimeTableItemLayout = styled("div", {
    gridRow: `${startPoint} / ${endPoint}`,
    backgroundColor: isBeforeNow ? "$primary-100" : "$primary-300",
    color: isBeforeNow ? "$outline" : "$onBackground",
    borderRadius: "10px",
    padding: "$1x",
    gap: "$2x",
    border: isBeforeNow ? "3px solid $outline" : "3px solid $inversePrimary",
    boxSizing: "border-box",
    gridColumn: `${
      item.overlapStart * overlapColumns + 1
    } / span ${overlapColumns}`,
    overflowX: "hidden",
    cursor: "pointer",
    height: "100%",

    variants: {
      layout: {
        time: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          backgroundColor: "transparent",
          color: "$neutral-500",
          padding: "0",
          border: "none",
          cursor: "default",
          gridColumn: "1 / span 24",
          lineHeight: "1rem",
          borderRadius: "0",
        },
        small: {
          padding: "$1x",
          wordBreak: "break-word",
        },
        big: {},
      },
      highlight: {
        true: {
          borderColor: "$primary",
        },
        false: {},
      },
      omitted: {
        true: {
          textDecoration: "line-through",
          borderColor: "transparent",
        },
        false: {
          textDecoration: "none",
        },
      },
      substituted: {
        true: {
          borderColor: isBeforeNow ? "$inversePrimary" : "$onSurfaceVariant",
        },
        false: {},
      },
      exam: {
        true: {
          borderColor: isBeforeNow ? "$primaryContainer" : "$onSurfaceVariant",
        },
        false: {},
      }
    },
    compoundVariants: [
      {
        highlight: "true",
        omitted: "true",
        css: {
          borderColor: "$primary",
        },
      },
    ],
  });

  const SkeletonLayout = styled("div", {
    gridRow: `${startPoint} / ${endPoint}`,
    borderRadius: "10px",
    boxSizing: "border-box",
    gridColumn: `${
      item.overlapStart * overlapColumns + 1
    } / span ${overlapColumns}`,
  });

  return (
    <>
      {item.schoolSubject && item.schoolSubject.schoolSubjectName != "" && (
        <TimeTableItemLayout
          layout={item.overlaps > 1 ? "small" : "big"}
          omitted={!!item?.omitted}
          onClick={() => {
            router.push({
              query: { ...router.query, detail: item.timeTableElementUUID },
            });
          }}
          highlight={
            !!timeTableElementUUID &&
            timeTableElementUUID == item.timeTableElementUUID
          }
          substituted={!!item.substitution}
          exam={!!item.exam}
        >
          <TimeTableSubjectName>
            {item.substitution?.timeTableSubstitutionSubject?.schoolSubjectAbbreviation ??
              item.schoolSubject.schoolSubjectAbbreviation}
          </TimeTableSubjectName>
          <TimeTableTime>
            {getSmallTimeFormat(item.timeTableElementStartTime)} -{" "}
            {getSmallTimeFormat(item.timeTableElementEndTime)}
          </TimeTableTime>

          {item.timeTableElementTeachers.map((teacher, index) => (
            <div key={index}>{teacher.userFirstname}</div>
          ))}
        </TimeTableItemLayout>
      )}
      {!item.timeTableElementUUID && !!item.timeTableElementTeachers && (
        <SkeletonLayout>
          <Skeleton width={"100%"} height={"65px"} />
        </SkeletonLayout>
      )}
      {!item.schoolSubject &&
        item.timeTableElementUUID != "" &&
        !item.timeTableElementTeachers && (
          <TimeTableItemLayout layout="time">
            {getSmallTimeFormat(item.timeTableElementStartTime)}
          </TimeTableItemLayout>
        )}
    </>
  );
};

function getRowFromTime(time: string, startTime: string) {
  let hour = new Date(time).getHours() - parseInt(startTime.split(":")[0]);
  let minute = new Date(time).getMinutes() - parseInt(startTime.split(":")[1]);
  if (minute < 0) {
    hour--;
    minute = 60 + minute;
  }
  let row = Math.floor(1 + hour * 12 + minute / 5);
  return row < 1 ? 1 : row;
}

function getSmallTimeFormat(time: string) {
  let hour = new Date(time).getHours();
  let minute = new Date(time).getMinutes();

  return formatTime(hour) + ":" + formatTime(minute);
}

function formatTime(time: number) {
  return time < 10 ? "0" + time : time;
}
