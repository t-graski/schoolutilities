import React from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/input/InputField";
import Link from "next/link";
import { useRouter } from "next/router";
import { SettingsHeader } from "../../molecules/schoolAdmin/SettingsHeader";
import { SettingsEntry } from "../../molecules/schoolAdmin/SettingsEntry";
import { SettingsPopUp } from "../../molecules/schoolAdmin/SettingsPopUp";
import { regex } from "../../../utils/regex";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addDepartment,
  deleteDepartment,
  editDepartment,
  fetchSchoolDepartments,
} from "../../../utils/requests";
import { AdminSettingsField } from "./AdminSettingsField";

type Props = {};

const SchoolDetailLayout = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  justifySelf: "center",
  width: "100%",
  padding: "40px 60px",

  overflowY: "scroll",
});

const SettingsEntriesLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
});

const SettingsEntryLayout = styled("div", {
  width: "100%",
});

const SettingsEntryName = styled("p", {
  fontSize: "2rem",
  fontWeight: "bold",
  color: "$onSurface",
});

const StyledInputField = styled("div", {
  marginTop: "15px",
  marginBottom: "15px",
});

const SettingsEntryLink = styled("a", {
  textDecoration: "none",
  cursor: "pointer",
});

const StyledError = styled("p", {
  marginTop: "15px",
  marginBottom: "15px",
  border: "solid 2px $error",
  padding: "20px",
  width: "fit-content",
  borderRadius: "25px",

  color: "$error",
  fontSize: "1.5rem",
  fontWeight: "$bold",
});

const LoadingLayout = styled("div", {
  position: "relative",
});

const StyledDeleteText = styled("p", {
  marginTop: "15px",

  fontSize: "1rem",
  color: "$neutral-500",
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

export const DepartmentsSettingsField: React.FC<Props> = ({}) => {
  const [editPopUpIsVisible, setEditPopUpIsVisible] = React.useState(false);
  const [deletePopUpIsVisible, setDeletePopUpIsVisible] = React.useState(false);
  const [departmentName, setDepartmentName] = React.useState("");
  const [departmentNameValid, setDepartmentNameValid] = React.useState(false);
  const [departmentId, setDepartmentId] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  const queryClient = useQueryClient();

  const { data: departments, status: departmentsStatus } = useQuery(
    ["departments", schoolUUID],
    () => fetchSchoolDepartments(schoolUUID)
  );

  const addDepartmentMutation = useMutation(addDepartment, {
    onMutate: async () => {
      await queryClient.cancelQueries(["departments", schoolUUID]);

      let entry = {
        schoolUUID,
        departmentName: departmentName,
        departmentUUID: "newEntry",
        isVisible: "true",
        childsVisible: "true",
      };

      queryClient.setQueryData(["departments", schoolUUID], (old: any) => [
        ...old,
        entry,
      ]);

      return { entry };
    },
    onSuccess: (response) => {
      let entry = {
        departmentUUID: response.departmentUUID,
        departmentName: response.name,
      };

      queryClient.setQueryData(["departments", schoolUUID], (old: any) =>
        old.map((currEntry) =>
          currEntry.departmentUUID === "newEntry" ? entry : currEntry
        )
      );

      setDepartmentId("");
      setDepartmentName("");
      setDepartmentNameValid(false);
    },
    onError: (err: any) => {
      setError(err.message);

      queryClient.setQueryData(["departments", schoolUUID], (old: any) =>
        old.filter((currEntry) => currEntry.departmentUUID !== "newEntry")
      );
    },
  });

  const deleteDepartmentMutation = useMutation(deleteDepartment, {
    onSuccess: async () => {
      await queryClient.cancelQueries(["departments", schoolUUID]);

      queryClient.setQueryData(["departments", schoolUUID], (old: any) =>
        old.filter((currElement) => currElement.departmentUUID !== departmentId)
      );
    },
    onError: (err: any) => {
      setError(err.message);
    },
  });

  const editDepartmentMutation = useMutation(editDepartment, {
    onSuccess: async () => {
      await queryClient.cancelQueries(["departments", schoolUUID]);

      queryClient.setQueryData(["departments", schoolUUID], (old: any) =>
        old.map((currEntry) =>
          currEntry.departmentUUID === departmentId
            ? {
                ...currEntry,
                departmentName: departmentName,
              }
            : currEntry
        )
      );
    },
    onError: (err: any) => {
      setError(err.message);
    },
  });

  function savePopUpInput() {
    if (departmentId == "") {
      addDepartmentMutation.mutate({
        schoolUUID,
        departmentName: departmentName,
        isVisible: "true",
        childsVisible: "true",
      });
    } else {
      editDepartmentMutation.mutate({
        departmentUUID: departmentId,
        departmentName: departmentName,
        isVisible: "true",
        childsVisible: "true",
      });
    }
    setEditPopUpIsVisible(false);
  }

  console.log(departments);

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
