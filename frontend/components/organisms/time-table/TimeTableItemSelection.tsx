import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { styled } from "../../../stitches.config";
import { fetchSchoolClasses } from "../../../utils/requests";
import { SearchSelect } from "../../atoms/input/SearchSelect";
import { TimeTableWeekSelection } from "../../molecules/time-table/TimeTableWeekSelection";

type Props = {
  schoolClassUUID: string;
  setSchoolClassUUID: (schoolClassUUID: string) => void;
  startDate: string;
  setStartDate: (startDate: string) => void;
};

const TimeTableSelectionLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  height: "8vh",
  padding: "$1x",
  alignItems: "center",
  gap: "$4x",
});

export const TimeTableItemSelection: React.FC<Props> = ({
  schoolClassUUID,
  setSchoolClassUUID,
  startDate,
  setStartDate,
}) => {
  const router = useRouter();
  const { schoolUUID } = router.query;
  const { data: classes, status } = useQuery(["classes", schoolUUID], () =>
    fetchSchoolClasses(schoolUUID)
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <>
      <TimeTableSelectionLayout>
        <SearchSelect
          selectOptions={classes.map((element) => {
            return {
              value: element.classUUID,
              label: element.className,
            };
          })}
          onChange={(element) => setSchoolClassUUID(element?.value)}
          selectMultiValues={false}
          isSmall={true}
        ></SearchSelect>
        <TimeTableWeekSelection
          startDate={startDate}
          setStartDate={setStartDate}
        ></TimeTableWeekSelection>
      </TimeTableSelectionLayout>
    </>
  );
};
