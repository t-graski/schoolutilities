import React from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/input/InputField";
import { regex } from "../../../utils/regex";
import { useRouter } from "next/router";
import { Spacer } from "../../atoms/Spacer";
import Skeleton from "react-loading-skeleton";
import { Select } from "../../atoms/input/Select";
import {
  addSchoolClass,
  deleteSchoolClass,
  editSchoolClass,
  fetchSchoolClasses,
  fetchSchoolDepartments,
} from "../../../utils/requests";
import { AdminSettingsField } from "./AdminSettingsField";
import { useQuery } from "react-query";

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
  const { data: departments, status: departmentsStatus } = useQuery(
    ["departments", schoolUUID],
    () => fetchSchoolDepartments(schoolUUID)
  );

  if (departmentsStatus === "loading") {
    return <Skeleton height={50} width={200} />;
  }

  if (departmentsStatus === "error") {
    return <p>Error</p>;
  }

  return (
    <StyledInputField>
      <InputField
        label="Name"
        inputType="text"
        value={itemConfig.className}
        onChange={(event) => {
          setItemConfig({
            ...itemConfig,
            className: event.target.value,
          });
        }}
        regex={regex.schoolName}
        min="2"
        max="30"
        theme="surface"
      />
      <Spacer size="verySmall" />
      <Select
        selectValue={itemConfig.departmentUUID}
        selectOptions={departments.map((department) => {
          return {
            value: department.departmentUUID,
            label: department.departmentName,
          };
        })}
        onChange={(event) => {
          setItemConfig({
            ...itemConfig,
            departmentUUID: event,
          });
        }}
        theme="surface"
      ></Select>
    </StyledInputField>
  );
};

export const ClassesSettingsField: React.FC<Props> = ({ queryClient }) => {
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;
  const { data: departments, status: departmentsStatus } = useQuery(
    ["departments", schoolUUID],
    () => fetchSchoolDepartments(schoolUUID)
  );

  return (
    <>
      <AdminSettingsField
        queryClient={queryClient}
        reactQueryKey={"classes"}
        texts={{
          title: "Classes",
          addHeadline: "Add new class",
          editHeadline: "Edit class",
          deleteHeadline: "Remove",
          deleteDescription:
            "This action can't be undone and will permanently remove the class ",
          elementsLoadingErrorMessage:
            "While loading the classes an error occured. Please try again.",
          elementsNoElementsMessage:
            "There are no classes yet. Add one by clicking the plus button.",
        }}
        uuidKey={"classUUID"}
        nameKey={"className"}
        addElement={addSchoolClass}
        editElement={editSchoolClass}
        deleteElement={deleteSchoolClass}
        getAllElements={fetchSchoolClasses}
        isItemValid={(item) => {
          return true;
        }}
        EditElementInputs={EditElementInputs}
        defaultItemConfig={{
          className: "",
          departmentUUID: "",
        }}
        columns={[
          {
            title: "Name",
            key: "className",
            sortFunction: (a, b) => {
              return a.className.localeCompare(b.className);
            },
          },
          {
            title: "Department",
            key: "departmentUUID",
            sortFunction: (a, b) => {
              if (departmentsStatus !== "success") {
                return -1;
              }
              let aDepartment = departments.find(
                (department) => department.departmentUUID == a.departmentUUID
              );
              let bDepartment = departments.find(
                (department) => department.departmentUUID == b.departmentUUID
              );
              return aDepartment.departmentName.localeCompare(
                bDepartment.departmentName
              );
            },
            toStringFunction: (item) => {
              if (departmentsStatus !== "success") {
                return <Skeleton height={20} width={100} />;
              }
              let department = departments.find(
                (department) => department.departmentUUID == item
              );
              return department.departmentName;
            },
          },
        ]}
      ></AdminSettingsField>
    </>
  );
};
