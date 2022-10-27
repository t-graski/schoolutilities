import React from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/input/InputField";
import { useRouter } from "next/router";
import { regex } from "../../../utils/regex";
import {
  addDepartment,
  deleteDepartment,
  editDepartment,
  fetchSchoolDepartments,
} from "../../../utils/requests";
import { AdminSettingsField } from "./AdminSettingsField";
import { QueryClient } from "react-query";

type Props = {
  queryClient: QueryClient;
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
        label="Name"
        inputType="text"
        value={itemConfig.departmentName}
        onChange={(event) => {
          setItemConfig({
            ...itemConfig,
            departmentName: event,
          });
        }}
        regex={regex.schoolName}
        min="2"
        max="30"
        theme="surface"
      />
    </StyledInputField>
  );
};

export const DepartmentsSettingsField: React.FC<Props> = ({ queryClient }) => {
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  return (
    <>
      <AdminSettingsField
        queryClient={queryClient}
        reactQueryKey={"departments"}
        texts={{
          title: "Departments",
          addHeadline: "Add new department",
          editHeadline: "Edit department",
          deleteHeadline: "Remove",
          deleteDescription:
            "This action can't be undone and will permanently remove the department ",
          elementsLoadingErrorMessage:
            "While loading the departments an error occured. Please try again.",
          elementsNoElementsMessage:
            "There are no departments yet. Add one by clicking the plus button.",
        }}
        uuidKey={"departmentUUID"}
        nameKey={"departmentName"}
        addElement={addDepartment}
        editElement={editDepartment}
        deleteElement={deleteDepartment}
        getAllElements={fetchSchoolDepartments}
        isItemValid={(item) => item.departmentName.length > 0}
        EditElementInputs={EditElementInputs}
        defaultItemConfig={{
          schoolUUID,
          departmentName: "",
          isVisible: "true",
          childsVisible: "true",
        }}
        columns={[
          {
            title: "Name",
            key: "departmentName",
            sortFunction: (a, b) =>
              a.departmentName.localeCompare(b.departmentName),
          },
        ]}
      ></AdminSettingsField>
    </>
  );
};
