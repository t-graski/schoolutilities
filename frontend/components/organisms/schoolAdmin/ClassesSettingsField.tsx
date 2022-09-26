import React from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/input/InputField";
import Link from "next/link";
import { regex } from "../../../utils/regex";
import { useRouter } from "next/router";
import { Spacer } from "../../atoms/Spacer";
import { SettingsHeader } from "../../molecules/schoolAdmin/SettingsHeader";
import { SettingsEntry } from "../../molecules/schoolAdmin/SettingsEntry";
import { SettingsPopUp } from "../../molecules/schoolAdmin/SettingsPopUp";
import Skeleton from "react-loading-skeleton";
import { Select } from "../../atoms/input/Select";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addSchoolClass,
  deleteSchoolClass,
  editSchoolClass,
  fetchSchoolClasses,
  fetchSchoolDepartments,
} from "../../../utils/requests";

type Props = {
  queryClient: any;
};

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
  color: "$fontPrimary",
});

const DepartmentName = styled("p", {
  fontSize: "1rem",
  color: "$fontPrimary",
});

const StyledInputField = styled("div", {
  marginTop: "15px",
  marginBottom: "15px",
});

const SettingsEntryLink = styled("a", {
  textDecoration: "none",
  cursor: "pointer",
});

const StyledDeleteText = styled("p", {
  fontSize: "1rem",
  color: "$fontPrimary",
  marginTop: "15px",
});

export const ClassesSettingsField: React.FC<Props> = ({
  queryClient,
}) => {
  const [editPopUpIsVisible, setEditPopUpIsVisible] = React.useState(false);
  const [deletePopUpIsVisible, setDeletePopUpIsVisible] = React.useState(false);
  const [schoolClassName, setSchoolClassName] = React.useState("");
  const [schoolClassNameValid, setSchoolClassNameValid] = React.useState(false);
  const [departmentUUID, setDepartmentUUID] = React.useState("");
  const [schoolClassId, setSchoolClassId] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  const { data: classes, status: classesStatus } = useQuery(
    ["classes", schoolUUID],
    () => fetchSchoolClasses(schoolUUID)
  );
  const { data: departments, status: departmentsStatus } = useQuery(
    ["departments", schoolUUID],
    () => fetchSchoolDepartments(schoolUUID)
  );

  const addClassMutation = useMutation(addSchoolClass, {
    onMutate: async () => {
      await queryClient.cancelQueries(["classes", schoolUUID]);

      let entry = {
        classUUID: "newEntry",
        className: schoolClassName,
        departmentUUID,
        departmentName: departments.find(
          (department) => department.departmentUUID === departmentUUID
        ).departmentName,
      };

      queryClient.setQueryData(["classes", schoolUUID], (old: any) => [
        ...old,
        entry,
      ]);

      return { entry };
    },
    onSuccess: (newEntry) => {
      let entry = {
        classUUID: newEntry.classUUID,
        className: newEntry.className,
        departmentUUID,
        departmentName: departments.find(
          (department) => department.departmentUUID === departmentUUID
        ).departmentName,
      };

      console.log(entry);

      queryClient.setQueryData(["classes", schoolUUID], (old: any) =>
        old.map((currEntry) =>
          currEntry.classUUID === "newEntry" ? entry : currEntry
        )
      );
    },
    onError: (err: any) => {
      setError(err.message);

      queryClient.setQueryData(["classes", schoolUUID], (old: any) =>
        old.filter((currEntry) => currEntry.classUUID !== "newEntry")
      );
    },
  });

  const deleteClassMutation = useMutation(deleteSchoolClass, {
    onSuccess: async () => {
      await queryClient.cancelQueries(["classes", schoolUUID]);

      queryClient.setQueryData(["classes", schoolUUID], (old: any) =>
        old.filter((currElement) => currElement.classUUID !== schoolClassId)
      );
    },
    onError: (err: any) => {
      setError(err.message);
    },
  });

  const editClassMutation = useMutation(editSchoolClass, {
    onSuccess: async (response) => {
      let entry = {
        classUUID: response.classUUID,
        className: response.className,
        departmentUUID,
        departmentName: departments.find(
          (department) => department.departmentUUID === departmentUUID
        ).departmentName,
      };

      queryClient.setQueryData(["classes", schoolUUID], (old: any) =>
        old.map((currEntry) =>
          currEntry.classUUID === response.classUUID ? entry : currEntry
        )
      );
    },
    onError: (err: any) => {
      setError(err.message);
    },
  });

  function savePopUpInput() {
    if (schoolClassId == "") {
      addClassMutation.mutate({
        classUUID: "newEntry",
        className: schoolClassName,
        departmentUUID,
        departmentName: departments.find(
          (department) => department.departmentUUID === departmentUUID
        ).departmentName,
      });
    } else {
      editClassMutation.mutate({
        classUUID: schoolClassId,
        className: schoolClassName,
        departmentUUID,
      });
    }
    setEditPopUpIsVisible(false);
  }

  return (
    <>
      <SchoolDetailLayout>
        {editPopUpIsVisible && (
          <SettingsPopUp
            headline={schoolClassId == "" ? "Add new class" : "Edit class"}
            inputValid={schoolClassNameValid}
            saveLabel={schoolClassId == "" ? "Add" : "Save"}
            saveFunction={savePopUpInput}
            closeFunction={() => {
              setEditPopUpIsVisible(false);
              setSchoolClassName("");
              setSchoolClassNameValid(false);
            }}
          >
            <StyledInputField>
              <InputField
                label="Name"
                inputType="text"
                value={schoolClassName}
                onChange={(event) => {
                  setSchoolClassName(event);
                  if (regex.name.test(event)) {
                    setSchoolClassNameValid(true);
                  } else {
                    setSchoolClassNameValid(false);
                  }
                }}
                regex={regex.schoolName}
                setValidInput={setSchoolClassNameValid}
                min="2"
                max="30"
              />
              <Spacer size="verySmall" />
              <Select
                selectValue={departmentUUID}
                selectOptions={departments.map((department) => {
                  return {
                    value: department.departmentUUID,
                    label: department.departmentName,
                  };
                })}
                onChange={(event) => {
                  setDepartmentUUID(event);
                }}
              ></Select>
            </StyledInputField>
          </SettingsPopUp>
        )}
        {deletePopUpIsVisible && (
          <SettingsPopUp
            headline={`Remove ${schoolClassName}`}
            inputValid={true}
            saveLabel="Confirm"
            saveFunction={() => {
              deleteClassMutation.mutate(schoolClassId);
              setDeletePopUpIsVisible(false);
            }}
            closeFunction={() => {
              setDeletePopUpIsVisible(false);
              setSchoolClassName("");
              setSchoolClassNameValid(false);
            }}
          >
            <StyledDeleteText>
              This action can&apos;t be undone and will permanently remove the
              class {schoolClassName}.
            </StyledDeleteText>
          </SettingsPopUp>
        )}
        <SettingsHeader
          headline="Classes"
          addFunction={() => {
            setSchoolClassName("");
            setSchoolClassId("");
            setEditPopUpIsVisible(true);
            setDepartmentUUID(departments[0].departmentUUID);
          }}
        ></SettingsHeader>
        {error}
        <SettingsEntriesLayout>
          {classesStatus == "success" && classes.length > 0 ? (
            classes.map((entry) => (
              <SettingsEntryLayout
                key={entry.classUUID}
                data-key={entry.classUUID}
              >
                <SettingsEntry
                  editFunction={() => {
                    setSchoolClassName(entry.className);
                    setSchoolClassId(entry.classUUID);
                    setDepartmentUUID(entry.departmentUUID);
                    setEditPopUpIsVisible(true);
                    setSchoolClassNameValid(true);
                  }}
                  deleteFunction={() => {
                    setSchoolClassId(entry.classUUID);
                    setSchoolClassName(entry.className);
                    setDeletePopUpIsVisible(true);
                  }}
                  highlighted={
                    router.query &&
                    router.query.departmentUUID &&
                    entry.departmentUUID == router.query.departmentUUID
                  }
                >
                  <>
                    <SettingsEntryName>{entry.className}</SettingsEntryName>
                    <Link
                      href={`/school/${router.query.schoolUUID as string
                        }/edit?departmentUUID=${entry.departmentUUID}`}
                      passHref
                    >
                      <SettingsEntryLink>
                        <DepartmentName>{entry.departmentName}</DepartmentName>
                      </SettingsEntryLink>
                    </Link>
                  </>
                </SettingsEntry>
              </SettingsEntryLayout>
            ))
          ) : (
            <>
              <Skeleton width="100%" height={100}></Skeleton>
              <Skeleton width="100%" height={100}></Skeleton>
              <Skeleton width="100%" height={100}></Skeleton>
            </>
          )}
        </SettingsEntriesLayout>
      </SchoolDetailLayout>
    </>
  );
};
