import React, { useEffect } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";
import { InputField } from "./InputField";
import { Button } from "./Button";
import Link from "next/link";
import { regex } from "../misc/regex";
import { useRouter } from "next/router";
import { Headline } from "./Headline";
import { Separator } from "./Separator";
import { Spacer } from "./Spacer";
import { getAccessToken } from "../misc/authHelper";
import { SettingsHeader } from "./SettingsHeader";
import { SettingsEntry } from "./SettingsEntry";
import { SettingsPopUp } from "./SettingsPopUp";
import cookie from "js-cookie";

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
  const [departments, setDepartments] = React.useState([]);
  const [classes, setClasses] = React.useState([]);
  const [isFirstTime, setIsFirstTime] = React.useState(true);
  const [editPopUpIsVisible, setEditPopUpIsVisible] = React.useState(false);
  const [deletePopUpIsVisible, setDeletePopUpIsVisible] = React.useState(false);
  const [schoolClassName, setSchoolClassName] = React.useState("");
  const [schoolClassNameValid, setSchoolClassNameValid] = React.useState(false);
  const [departmentUUID, setDepartmentUUId] = React.useState("");
  const [schoolClassId, setSchoolClassId] = React.useState("");
  const [error, setError] = React.useState("");
  const schoolUUID = cookie.get("schoolUUID");
  const router = useRouter();

  useEffect(() => {
    if (isFirstTime) {
      updateSettingsEntriesFromDatabase();
      setIsFirstTime(false);
    }
  });

  async function updateSettingsEntriesFromDatabase() {
    let accessToken = await getAccessToken();
    if (!accessToken) {
      router.push("/auth/login");
    }
    if (!schoolUUID) {
      router.push("/profile/school-selection");
    }
    if (accessToken && schoolUUID && isFirstTime) {
      let returnValue = await fetch(
        `http://localhost:8888/api/schooladmin/classes/${schoolUUID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      let json = await returnValue.json();
      setClasses(json);

      returnValue = await fetch(
        `http://localhost:8888/api/schooladmin/departments/${schoolUUID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      json = await returnValue.json();
      setDepartments(json);
    }
  }

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
      "http://localhost:8888/api/schooladmin/class",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (returnValue.status !== 200) {
      setError("Fehler beim hinzufügen");
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
      "http://localhost:8888/api/schooladmin/class",
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
          console.log(schoolClass.className);
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
      "http://localhost:8888/api/schooladmin/class",
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
            headline={schoolClassId == "" ? "Add new entry" : "Edit entry"}
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
                label="SchoolClass className"
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
                iconSrc={""}
                iconAlt={""}
                regex={regex.name}
                setValidInput={setSchoolClassNameValid}
                min="2"
                max="30"
              />
              <Spacer size="verySmall" />
              <InputField
                inputType="select"
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
                iconSrc={""}
                iconAlt={""}
              ></InputField>
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
              This action cannot be undone. This will permanently delete this
              class.
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
          {classes.map((entry, index) => (
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
                    href={`/school/admin/settings?departmentUUID=${entry.departmentUUID}`}
                  >
                    <SettingsEntryLink>
                      <DepartmentName>{entry.departmentName}</DepartmentName>
                    </SettingsEntryLink>
                  </Link>
                </>
              </SettingsEntry>
            </SettingsEntryLayout>
          ))}
        </SettingsEntriesLayout>
      </SchoolDetailLayout>
    </>
  );
};
