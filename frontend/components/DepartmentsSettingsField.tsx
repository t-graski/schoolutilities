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

const StyledInputField = styled("div", {
  marginTop: "15px",
  marginBottom: "15px",
});

const SettingsEntryLink = styled("a", {
  textDecoration: "none",
  cursor: "pointer",
});

const StyledError = styled("p", {
  color: "$specialTertiary",
  fontSize: "1.5rem",
  fontWeight: "700",
  marginTop: "15px",
  marginBottom: "15px",
  border: "solid 2px $specialTertiary",
  padding: "20px",
  width: "fit-content",
  borderRadius: "25px",
});

export const DepartmentsSettingsField: React.FC<Props> = ({}) => {
  const [departments, setDepartments] = React.useState([]);
  const [isFirstTime, setIsFirstTime] = React.useState(true);
  const [popUpIsVisible, setPopUpIsVisible] = React.useState(false);
  const [departmentName, setDepartmentName] = React.useState("");
  const [departmentNameValid, setDepartmentNameValid] = React.useState(false);
  const [departmentId, setDepartmentId] = React.useState("");
  const [error, setError] = React.useState("");
  const schoolUUID = cookie.get("schoolUUID");
  const router = useRouter();

  useEffect(() => {
    updateSettingsEntriesFromDatabase();
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
      const response = await fetch(
        `http://localhost:8888/api/schooladmin/departments/${schoolUUID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const departments = await response.json();
      setDepartments(departments);
      setIsFirstTime(false);
    }
  }

  function savePopUpInput() {
    if (departmentId == "") {
      addSettingsEntry();
    } else {
      editSettingsEntry();
    }
    setPopUpIsVisible(false);
  }

  async function addSettingsEntry() {
    const data = {
      schoolUUID,
      departmentName: departmentName,
      isVisible: "true",
      childsVisible: "true",
    };
    const returnValue = await fetch(
      "http://localhost:8888/api/schooladmin/department",
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
    } else {
      const body = await returnValue.json();
      setError("");
      let entry = {
        departmentUUID: body.departmentUUID,
        departmentName: departmentName,
      };
      setDepartments([...departments, entry]);
    }
  }

  async function editSettingsEntry() {
    const data = {
      departmentUUID: departmentId,
      departmentName: departmentName,
      isVisible: "true",
      childsVisible: "true",
    };
    const returnValue = await fetch(
      "http://localhost:8888/api/schooladmin/department",
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
      const newEntries = departments.map((department, index) => {
        if (department.departmentUUID == departmentId) {
          console.log(department.departmentName);
          department.departmentName = departmentName;
          return department;
        } else {
          return department;
        }
      });
      setDepartments(newEntries);
    }
  }

  async function deleteSettingsEntry(id) {
    const returnValue = await fetch(
      "http://localhost:8888/api/schooladmin/department",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          departmentUUID: id,
        }),
      }
    );
    if (returnValue.status !== 200) {
      setError("Error trying to save");
      console.log(returnValue);
    } else {
      setError("");
      let newSettingsEntries = departments.filter(
        (department) => department.departmentUUID !== id
      );

      setDepartments(newSettingsEntries);
      if (newSettingsEntries.length == 0) {
        setDepartments([]);
      }
    }
  }

  return (
    <>
      <SchoolDetailLayout>
        {popUpIsVisible && (
          <SettingsPopUp
            headline={departmentId == "" ? "Add new entry" : "Edit entry"}
            inputValid={departmentNameValid}
            saveLabel={departmentId == "" ? "Add" : "Save"}
            saveFunction={savePopUpInput}
            closeFunction={() => {
              setPopUpIsVisible(false);
              setDepartmentName("");
              setDepartmentNameValid(false);
            }}
          >
            <StyledInputField>
              <InputField
                label="Department departmentName"
                inputType="text"
                value={departmentName}
                onChange={(event) => {
                  setDepartmentName(event);
                }}
                iconSrc={""}
                iconAlt={""}
                regex={regex.name}
                setValidInput={setDepartmentNameValid}
                min="2"
                max="30"
              />
            </StyledInputField>
          </SettingsPopUp>
        )}
        <SettingsHeader
          headline="Departments"
          addFunction={() => {
            setDepartmentName("");
            setDepartmentId("");
            setPopUpIsVisible(true);
          }}
        ></SettingsHeader>
        {error && <StyledError>{error}</StyledError>}
        <SettingsEntriesLayout>
          {departments.map((entry, index) => (
            <SettingsEntryLayout
              key={entry.departmentUUID}
              data-key={entry.departmentUUID}
            >
              <SettingsEntry
                editFunction={() => {
                  setDepartmentName(entry.departmentName);
                  setDepartmentId(entry.departmentUUID);
                  setPopUpIsVisible(true);
                }}
                deleteFunction={() => {
                  deleteSettingsEntry(entry.departmentUUID);
                }}
                highlighted={
                  router.query &&
                  router.query.departmentUUID &&
                  entry.departmentUUID == router.query.departmentUUID
                }
              >
                <Link
                  href={`/school/admin/settings?tab=classes&departmentUUID=${entry.departmentUUID}`}
                >
                  <SettingsEntryLink>
                    <SettingsEntryName>
                      {entry.departmentName}
                    </SettingsEntryName>
                  </SettingsEntryLink>
                </Link>
              </SettingsEntry>
            </SettingsEntryLayout>
          ))}
        </SettingsEntriesLayout>
      </SchoolDetailLayout>
    </>
  );
};
