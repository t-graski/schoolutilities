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

type Props = {
  headline: string;
  addNewEntryHeadline: string;
  addEditEntryHeadline: string;
  popUpInputFieldPlaceholder: string;
  getAllEntriesUrl: string;
};

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

const PopUpLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.7)",
  position: "absolute",
  top: "0",
  left: "0",
  zIndex: "10",
});

const PopUpContentLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "50%",
  backgroundColor: "$backgroundPrimary",
  padding: "30px",
  borderRadius: "20px",
});

const StyledInputField = styled("div", {
  marginTop: "15px",
  marginBottom: "15px",
});

const StyledPopUpHeadline = styled("h2", {
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "$fontPrimary",
  margin: "0",
});

const PopUpButtonLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: "20px",
});

export const SettingsField: React.FC<Props> = ({
  headline,
  addNewEntryHeadline,
  addEditEntryHeadline,
  popUpInputFieldPlaceholder,
  getAllEntriesUrl,
}) => {
  const [settingsEntries, setSettingsEntries] = React.useState([]);
  const [isFirstTime, setIsFirstTime] = React.useState(true);
  const [popUpIsVisible, setPopUpIsVisible] = React.useState(false);
  const [settingsEntryName, setSettingsEntryName] = React.useState("");
  const [settingsEntryNameValid, setSettingsEntryNameValid] =
    React.useState(false);
  const [settingsEntryId, setSettingsEntryId] = React.useState("");
  const [error, setError] = React.useState("");

  useEffect(() => {
    if (isFirstTime) {
      updateSettingsEntriesFromDatabase();
      setIsFirstTime(false);
    }
  });

  async function updateSettingsEntriesFromDatabase() {
    let accessToken = await getAccessToken();
    const returnValue = await fetch(getAllEntriesUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        schoolUUID: "292e08acd-9b11-4970-a509-ab643e2bfd9b",
      }),
    });
    const json = await returnValue.json();
    console.log(json);
    setSettingsEntries(json);
  }

  function savePopUpInput() {
    if (settingsEntryId == "") {
      addSettingsEntry();
    } else {
      editSettingsEntry();
    }
    setPopUpIsVisible(false);
  }

  async function addSettingsEntry() {
    const data = {
      name: settingsEntryName,
      isVisible: true,
      childsVisible: true,
    };
    const returnValue = await fetch(
      "http://localhost:8080/api/schooladmin/addDepartment",
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
      setSettingsEntries([
        ...settingsEntries,
        {
          name: settingsEntryName,
          departmentUUID: body.departmentUUID,
        },
      ]);
    }
  }

  async function editSettingsEntry() {
    const data = {
      departmentUUID: settingsEntryId,
      name: settingsEntryName,
      isVisible: true,
      childsVisible: true,
    };
    const returnValue = await fetch(
      "http://localhost:8080/api/schooladmin/updateDepartment",
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
      const newDepartments = settingsEntries.map((department, index) => {
        if (department.departmentUUID == settingsEntryId) {
          department.name = settingsEntryName;
          return department;
        } else {
          return department;
        }
      });
      setSettingsEntries(newDepartments);
    }
  }

  async function deleteSettingsEntry(id) {
    const data = {
      departmentUUID: id,
    };
    const returnValue = await fetch(
      "http://localhost:8080/api/schooladmin/removeDepartment",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (returnValue.status !== 200) {
      setError("Fehler beim löschen");
    } else {
      setError("");
      let newSettingsEntries = settingsEntries.filter(
        (settingsEntry) => settingsEntry.departmentUUID == id
      );

      setSettingsEntries(newSettingsEntries);
      if (newSettingsEntries.length == 0) {
        setSettingsEntries([]);
      }
    }
  }

  return (
    <>
      <SchoolDetailLayout>
        {popUpIsVisible && (
          <PopUpLayout>
            <PopUpContentLayout>
              <StyledPopUpHeadline>
                {settingsEntryId == ""
                  ? addNewEntryHeadline
                  : addEditEntryHeadline}
              </StyledPopUpHeadline>
              <Separator width="ultraSmall" alignment="left" />
              <StyledInputField>
                <InputField
                  label={popUpInputFieldPlaceholder}
                  inputType="text"
                  value={settingsEntryName}
                  onChange={(event) => {
                    setSettingsEntryName(event);
                    if (regex.name.test(event)) {
                      setSettingsEntryNameValid(true);
                    } else {
                      setSettingsEntryNameValid(false);
                    }
                  }}
                  iconSrc={""}
                  iconAlt={""}
                  regex={regex.name}
                  setValidInput={setSettingsEntryNameValid}
                  min="2"
                  max="30"
                />
              </StyledInputField>
              <PopUpButtonLayout>
                <Button
                  label="Close"
                  onClick={() => {
                    setSettingsEntryName("");
                    setPopUpIsVisible(false);
                  }}
                  backgroundColor={"secondary"}
                  color={"primary"}
                />
                <Button
                  label={settingsEntryId == "" ? "Add" : "Edit"}
                  onClick={savePopUpInput}
                  backgroundColor={"primary"}
                  color={"primary"}
                  disabled={
                    !settingsEntryNameValid ||
                    (settingsEntryId != "" &&
                      settingsEntryName == settingsEntries[settingsEntryId])
                  }
                  type="submit"
                />
              </PopUpButtonLayout>
            </PopUpContentLayout>
          </PopUpLayout>
        )}
        <HeaderLayout>
          <InformationLayout>
            <Headline
              label={headline}
              alignment="left"
              fontWeight="bold"
            ></Headline>
            <Separator width="small" alignment="left"></Separator>
          </InformationLayout>
          <AddIconLayout
            onClick={() => {
              setSettingsEntryName("");
              setSettingsEntryId("");
              setPopUpIsVisible(true);
            }}
          >
            <AddIconPlus>+</AddIconPlus>
          </AddIconLayout>
        </HeaderLayout>
        {error}
        <SettingsEntriesLayout>
          {settingsEntries.map((department, index) => (
            <SettingsEntryLayout key={index}>
              <SettingsEntryName>{department.className}</SettingsEntryName>
              <SettingsEntryIcons>
                <SettingsEntryEditIcon
                  onClick={() => {
                    setSettingsEntryName(department.className);
                    setSettingsEntryId(department.classUUID);
                    setPopUpIsVisible(true);
                  }}
                >
                  <Image
                    src="/images/icons/edit_icon.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </SettingsEntryEditIcon>
                <SettingsEntryDeleteIcon
                  onClick={() => {
                    deleteSettingsEntry(index);
                  }}
                >
                  <Image
                    src="/images/icons/delete_icon.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </SettingsEntryDeleteIcon>
              </SettingsEntryIcons>
            </SettingsEntryLayout>
          ))}
        </SettingsEntriesLayout>
      </SchoolDetailLayout>
    </>
  );
};
