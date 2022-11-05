import { styled } from "@stitches/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchSchoolRooms } from "../../../utils/requests/admin";
import {
  addExam,
  deleteExam,
  editExam,
  getExams,
  getTimeTableElement,
} from "../../../utils/requests/timeTable";
import { InputField } from "../../atoms/input/InputField";
import { Select } from "../../atoms/input/Select";
import { Spacer } from "../../atoms/Spacer";
import { AdminSettingsField } from "../schoolAdmin/AdminSettingsField";

type Props = {
  queryClient: any;
};

const StyledInputField = styled("div", {
  marginTop: "15px",
  marginBottom: "15px",
});

const EditElementInputs: React.FC<{
  itemConfig: any;
  setItemConfig: Function;
}> = ({ itemConfig, setItemConfig }) => {
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  useEffect(() => {
    if (
      router.query.element &&
      router.query.date &&
      itemConfig.timeTableElementUUID != (router.query.element as string) &&
      itemConfig.timeTableExamDate != (router.query.date as string)
    ) {
      setItemConfig({
        ...itemConfig,
        timeTableElementUUID: router.query.element as string,
        timeTableExamDate: router.query.date as string,
      });
    }
  }, [itemConfig, router.query.date, router.query.element, setItemConfig]);

  const { data: rooms, status } = useQuery(
    ["rooms", schoolUUID],
    () => fetchSchoolRooms(schoolUUID),
    {
      enabled: !!schoolUUID,
    }
  );
  const { data: timeTableElement, status: timeTableElementStatus } = useQuery(
    ["timeTableElement", itemConfig.timeTableElementUUID],
    () => getTimeTableElement(itemConfig.timeTableElementUUID),
    {
      enabled: !!schoolUUID && !!itemConfig.timeTableElementUUID,
    }
  );

  return (
    <StyledInputField>
      {timeTableElementStatus === "success" && (
        <>
          {timeTableElement?.schoolSubject.schoolSubjectName}:{" "}
          {new Date(
            timeTableElement.timeTableElementStartTime
          ).toLocaleString()}
          {" - "}
          {new Date(timeTableElement.timeTableElementEndTime).toLocaleString()}
          <br />
          <br />
        </>
      )}
      <InputField
        label="Exam description"
        inputType="text"
        value={itemConfig.timeTableExamDescription}
        onChange={(event) => {
          setItemConfig({
            ...itemConfig,
            timeTableExamDescription: event,
          });
        }}
        min="2"
        max="30"
        theme="surface"
      />
      <Spacer size="verySmall" />
      <Select
        onChange={(value) => {
          setItemConfig({
            ...itemConfig,
            timeTableExamRoom: {
              ...itemConfig.timeTableExamRoom,
              schoolRoomUUID: value ?? "",
            },
          });
        }}
        label="Room"
        selectOptions={
          status == "success"
            ? rooms.map((element) => {
                return {
                  value: element.schoolRoomUUID,
                  label: element.schoolRoomName,
                };
              })
            : []
        }
        selectValue={itemConfig.timeTableExamRoom.schoolRoomUUID}
        theme="surface"
      ></Select>
    </StyledInputField>
  );
};

export const ExamsOverviewField: React.FC<Props> = ({ queryClient }) => {
  return (
    <>
      <AdminSettingsField
        queryClient={queryClient}
        reactQueryKey={"exams"}
        texts={{
          title: "Exams",
          addHeadline: "Add new exam",
          editHeadline: "Edit exam",
          deleteHeadline: "Remove",
          deleteDescription:
            "This action can't be undone and will permanently remove the exam ",
          elementsLoadingErrorMessage:
            "While loading the exam an error occured. Please try again.",
          elementsNoElementsMessage:
            "There is no exam yet. Add one by clicking the plus button at the timetable item.",
        }}
        uuidKey={"timeTableExamUUID"}
        nameKey={"timeTableExamDescription"}
        addElement={addExam}
        editElement={editExam}
        deleteElement={deleteExam}
        getAllElements={getExams}
        isItemValid={function (item: unknown): boolean {
          return true;
        }}
        EditElementInputs={EditElementInputs}
        defaultItemConfig={{
          timeTableElementUUID: "",
          timeTableExamDate: "",
          timeTableExamRoom: "",
        }}
        columns={[
          {
            title: "Name",
            key: "timeTableExamDescription",
            sortFunction: (a: any, b: any) => {
              return a.timeTableExamDescription.localeCompare(
                b.timeTableExamDescription
              );
            },
            link: (item: any) => {
              console.log(item);
              return `/school/${item.schoolUUID}/planner/tab?element=${item.timeTableElementUUID}&date=${item.timeTableExamDate}`;
            }
          },
          {
            title: "Room",
            key: "timeTableExamRoom",
            sortFunction: (a: any, b: any) => {
              return a?.schoolRoomName?.localeCompare(
                b?.schoolRoomName
              );
            },
            toStringFunction: (item: any) => {
              return item?.schoolRoomName;
            },
          },
        ]}
      ></AdminSettingsField>
    </>
  );
};


function getParsedMonth(weekStartDay, weekDayName) {
  let addDays = 0;

  switch (weekDayName) {
    case "Monday":
      addDays = 1;
      break;
    case "Tuesday":
      addDays = 2;
      break;
    case "Wednesday":
      addDays = 3;
      break;
    case "Thursday":
      addDays = 4;
      break;
    case "Friday":
      addDays = 5;
      break;
    case "Saturday":
      addDays = 6;
      break;
    case "Sunday":
      addDays = 7;
      break;
  }

  return new Date(
    weekStartDay.getFullYear(),
    weekStartDay.getMonth(),
    weekStartDay.getDate() - addDays
  );
}
