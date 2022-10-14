import { styled } from "@stitches/react";
import { useRouter } from "next/router";
import React from "react";
import {
  addSchoolSubject,
  deleteSchoolSubject,
  editSchoolSubject,
  fetchSchoolSubjects,
} from "../../../utils/requests/admin";
import { InputField } from "../../atoms/input/InputField";
import { Spacer } from "../../atoms/Spacer";
import { AdminSettingsField } from "./AdminSettingsField";

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
  return (
    <StyledInputField>
      <InputField
        label="Subject name"
        inputType="text"
        value={itemConfig.schoolSubjectName}
        onChange={(event) => {
          setItemConfig({
            ...itemConfig,
            schoolSubjectName: event,
          });
        }}
        min="2"
        max="30"
      />
      <Spacer size="verySmall" />
      <InputField
        label="Subject Abbreviation"
        value={itemConfig.schoolSubjectAbbreviation}
        inputType={"text"}
        onChange={(event) => {
          setItemConfig({
            ...itemConfig,
            schoolSubjectAbbreviation: event,
          });
        }}
        min="2"
        max="30"
      ></InputField>
    </StyledInputField>
  );
};

export const SubjectsSettingsField: React.FC<Props> = ({ queryClient }) => {
  const router = useRouter();

  return (
    <>
      <AdminSettingsField
        queryClient={queryClient}
        reactQueryKey={"subjects"}
        texts={{
          title: "Subjects",
          addHeadline: "Add new subject",
          editHeadline: "Edit subject",
          deleteHeadline: "Remove",
          deleteDescription:
            "This action can't be undone and will permanently remove the subject ",
          elementsLoadingErrorMessage:
            "While loading the subjects an error occured. Please try again.",
          elementsNoElementsMessage:
            "There are no subjects yet. Add one by clicking the plus button.",
        }}
        uuidKey={"schoolSubjectUUID"}
        nameKey={"schoolSubjectName"}
        addElement={addSchoolSubject}
        editElement={editSchoolSubject}
        deleteElement={deleteSchoolSubject}
        getAllElements={fetchSchoolSubjects}
        isItemValid={function (item: unknown): boolean {
          return true;
        }}
        EditElementInputs={EditElementInputs}
        defaultItemConfig={{
          schoolSubjectName: "",
          schoolSubjectAbbreviation: "",
          schoolUUID: router.query.schoolUUID,
        }}
      ></AdminSettingsField>
    </>
  );
};
