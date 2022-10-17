import { styled } from "@stitches/react";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import {
  addSchoolRoom,
  deleteSchoolRoom,
  editSchoolRoom,
  fetchSchoolRooms,
} from "../../../utils/requests/admin";
import { addExam, deleteExam, editExam, getExams } from "../../../utils/requests/timeTable";
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

  const { data: rooms, status } = useQuery(
    ["rooms", schoolUUID],
    () => fetchSchoolRooms(schoolUUID),
    {
      enabled: !!schoolUUID,
    }
  );

  console.log(itemConfig);

  return (
    <StyledInputField>
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
            timeTableExamRoomUUID: value ?? "",
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
        selectValue={itemConfig.timeTableExamRoomUUID}
        theme="surface"
      ></Select>
    </StyledInputField>
  );
};

export const ExamsOverviewField: React.FC<Props> = ({ queryClient }) => {
  const router = useRouter();

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
        editElement={editExam}
        deleteElement={deleteExam}
        getAllElements={getExams}
        isItemValid={function (item: unknown): boolean {
          return true;
        }}
        EditElementInputs={EditElementInputs}
        defaultItemConfig={{
          schoolRoomName: "",
          schoolRoomAbbreviation: "",
          schoolRoomBuilding: "",
          schoolUUID: router.query.schoolUUID,
        }}
      ></AdminSettingsField>
    </>
  );
};
