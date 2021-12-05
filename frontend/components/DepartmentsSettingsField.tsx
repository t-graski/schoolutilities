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

type Props = {};

const SchoolDetailLayout = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  justifySelf: "center",
  width: "100%",
  padding: "20px",
});

const HeaderLayout = styled("div", {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
});

const InformationLayout = styled("div", {});

const AddIconLayout = styled("div", {
  display: "flex",
  width: "80px",
  height: "80px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  backgroundColor: "$specialPrimary",
  cursor: "pointer",
});

const AddIconPlus = styled("p", {
  fontSize: "80px",
  color: "$fontPrimary",
});

const SettingsEntriesLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
});

const SettingsEntryLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  width: "100%",
  alignItems: "center",
  padding: "20px",
  justifyContent: "space-between",
  backgroundColor: "$backgroundTertiary",
  borderRadius: "20px",
});

const SettingsEntryName = styled("p", {
  fontSize: "2rem",
  fontWeight: "bold",
  color: "$fontPrimary",
});

const SettingsEntryIcons = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "20px",
});

const SettingsEntryEditIcon = styled("div", {
  display: "flex",
  width: "40px",
  height: "40px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  backgroundColor: "$specialSecondary",
  cursor: "pointer",
});

const SettingsEntryDeleteIcon = styled("div", {
  display: "flex",
  width: "40px",
  height: "40px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  backgroundColor: "$specialTertiary",
  cursor: "pointer",
});

export const DepartmentsSettingsField: React.FC<Props> = ({}) => {
  const [departments, setDepartments] = React.useState([]);
  const [isFirstTime, setIsFirstTime] = React.useState(true);
  const [popUpIsVisible, setPopUpIsVisible] = React.useState(false);
  const [departmentName, setDepartmentName] = React.useState("");
  const [departmentNameValid, setDepartmentNameValid] = React.useState(false);
  const [departmentId, setDepartmentId] = React.useState("");
  const [error, setError] = React.useState("");

  useEffect(() => {
    if (isFirstTime) {
      updateSettingsEntriesFromDatabase();
      setIsFirstTime(false);
    }
  });

  async function updateSettingsEntriesFromDatabase() {
    let accessToken = await getAccessToken();
    const returnValue = await fetch(
      "http://localhost:8888/api/schooladmin/departments/292e08acd-9b11-4970-a509-ab643e2bfd9b",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const json = await returnValue.json();
    console.log(json);
    setDepartments(json);
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
      name: departmentName,
    };
    const returnValue = await fetch(
      "localhost:8888/api/schooladmin/department",
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
        name: departmentName,
      };
      setDepartments([...departments, entry]);
    }
  }

  async function editSettingsEntry() {
    const data = {
      departmentUUID: departmentId,
      name: departmentName,
    };
    const returnValue = await fetch(
      "localhost:8888/api/schooladmin/department",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (returnValue.status !== 200) {
      setError("Fehler beim Speichern");
    } else {
      setError("");
      const newEntries = departments.map((department, index) => {
        if (department.departmentUUID == departmentId) {
          department.name = departmentName;
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
      "localhost:8888/api/schooladmin/department",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          departmentUUID: id,
        }),
      }
    );
    if (returnValue.status !== 200) {
      setError("Fehler beim löschen");
    } else {
      setError("");
      let newSettingsEntries = departments.filter(
        (department) => department.departmentUUID == id
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
            headline={
              departmentId == ""
                ? "Neuen Eintrag hinzufügen"
                : "Eintrag bearbeiten"
            }
            inputValid={departmentNameValid}
            saveLabel={departmentId == "" ? "Hinzufügen" : "Speichern"}
            saveFunction={savePopUpInput}
            closeFunction={() => {
              setPopUpIsVisible(false);
              setDepartmentName("");
              setDepartmentNameValid(false);
            }}
          ></SettingsPopUp>
        )}
        <SettingsHeader
          headline="Departments"
          addFunction={() => {
            setDepartmentName("");
            setDepartmentId("");
            setPopUpIsVisible(true);
          }}
        ></SettingsHeader>
        {error}
        <SettingsEntriesLayout>
          {departments.map((entry, index) => (
            <div key={entry.departmentUUID} data-key={entry.departmentUUID}>
              <SettingsEntry
                editFunction={() => {
                  setDepartmentName(entry.name);
                  setDepartmentId(entry.departmentUUID);
                  setPopUpIsVisible(true);
                }}
                deleteFunction={() => {
                  deleteSettingsEntry(entry.departmentUUID);
                }}
              >
                <SettingsEntryName>{entry.name}</SettingsEntryName>
              </SettingsEntry>
            </div>
          ))}
        </SettingsEntriesLayout>
      </SchoolDetailLayout>
    </>
  );
};
