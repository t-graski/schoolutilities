import React, { useEffect } from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/input/InputField";
import Link from "next/link";
import { regex } from "../../../utils/regex";
import { useRouter } from "next/router";
import { Spacer } from "../../atoms/Spacer";
import { getAccessToken } from "../../../utils/authHelper";
import { SettingsHeader } from "../../molecules/schoolAdmin/SettingsHeader";
import { SettingsEntry } from "../../molecules/schoolAdmin/SettingsEntry";
import { SettingsPopUp } from "../../molecules/schoolAdmin/SettingsPopUp";
import Skeleton from "react-loading-skeleton";
import { Select } from "../../atoms/input/Select";
import { useQuery } from "react-query";
import { fetchSchoolClasses, fetchSchoolDepartments } from "../../../utils/requests";

type Props = {};

const SchoolDetailLayout = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  justifySelf: "center",
  width: "100%",
  padding: "40px 60px",
  marginTop: "12vh",
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

export const ClassesSettingsField: React.FC<Props> = ({}) => {
  const [editPopUpIsVisible, setEditPopUpIsVisible] = React.useState(false);
  const [deletePopUpIsVisible, setDeletePopUpIsVisible] = React.useState(false);
  const [schoolClassName, setSchoolClassName] = React.useState("");
  const [schoolClassNameValid, setSchoolClassNameValid] = React.useState(false);
  const [departmentUUID, setDepartmentUUId] = React.useState("");
  const [schoolClassId, setSchoolClassId] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  const {data: classes, status: classesStatus} = useQuery(["classes", schoolUUID], () => fetchSchoolClasses(schoolUUID));
  const {data: departments, status: departmentsStatus} = useQuery(["departments", schoolUUID], () => fetchSchoolDepartments(schoolUUID));

  function savePopUpInput() {
    if (schoolClassId == "") {
      addSettingsEntry();
    } else {
      editSettingsEntry();
    }
    setEditPopUpIsVisible(false);
  }

  async function addSettingsEntry() {
    const data = {
      departmentUUID,
      className: schoolClassName,
    };
    const returnValue = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/class`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (returnValue.status !== 200) {
      setError("Error while saving class");
      console.log(returnValue);
    } else {
      const body = await returnValue.json();
      setError("");
      let entry = {
        classUUID: body.classUUID,
        className: schoolClassName,
        departmentUUID,
        departmentName: departments.find(
          (department) => department.departmentUUID === departmentUUID
        ).departmentName,
      };
      setClasses([...classes, entry]);
    }
  }

  async function editSettingsEntry() {
    const data = {
      classUUID: schoolClassId,
      departmentUUID,
      className: schoolClassName,
    };
    const returnValue = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/class`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (returnValue.status !== 200) {
      setError("Error trying to save");
    } else {
      setError("");
      const newEntries = classes.map((schoolClass, index) => {
        if (schoolClass.classUUID == schoolClassId) {
          schoolClass.className = schoolClassName;
          schoolClass.departmentName = departments.find(
            (department) => department.departmentUUID === departmentUUID
          ).departmentName;
          schoolClass.departmentUUID = departmentUUID;
          return schoolClass;
        } else {
          return schoolClass;
        }
      });
      setClasses(newEntries);
    }
  }

  async function deleteSettingsEntry(id) {
    const returnValue = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/class`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          classUUID: id,
        }),
      }
    );
    if (returnValue.status !== 200) {
      setError("Error trying to delete");
      console.log(returnValue);
    } else {
      setError("");
      let newSettingsEntries = classes.filter(
        (schoolClass) => schoolClass.classUUID !== id
      );

      setClasses(newSettingsEntries);
      if (newSettingsEntries.length == 0) {
        setClasses([]);
      }
    }
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
                  setDepartmentUUId(event);
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
              deleteSettingsEntry(schoolClassId);
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
            setDepartmentUUId(departments[0].departmentUUID);
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
                    setDepartmentUUId(entry.departmentUUID);
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
                      href={`/school/${
                        router.query.schoolUUID as string
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
