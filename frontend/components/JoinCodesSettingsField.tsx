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

const DepartmentName = styled("p", {
  fontSize: "1rem",
  color: "$fontPrimary",
});

const StyledDeleteText = styled("p", {
  fontSize: "1rem",
  color: "$fontPrimary",
  marginTop: "15px",
});

export const JoinCodesSettingsField: React.FC<Props> = ({}) => {
  const [joinCodes, setJoinCodes] = React.useState([]);
  const [isFirstTime, setIsFirstTime] = React.useState(true);
  const [editPopUpIsVisible, setEditPopUpIsVisible] = React.useState(false);
  const [deletePopUpIsVisible, setDeletePopUpIsVisible] = React.useState(false);
  const [joinCodeName, setJoinCodeName] = React.useState("");
  const [joinCodeNameValid, setJoinCodeNameValid] = React.useState(false);
  const [joinCodeId, setJoinCodeId] = React.useState("");
  const [error, setError] = React.useState("");
  const schoolUUID = cookie.get("schoolUUID");
  const router = useRouter();

  useEffect(() => {
    updateSettingsEntriesFromDatabase();
  });

  async function updateSettingsEntriesFromDatabase() {
    let accessToken = await getAccessToken();
    console.log(accessToken);
    if (!accessToken) {
      router.push("/auth/login");
    }
    if (!schoolUUID) {
      router.push("/profile/school-selection");
    }
    if (accessToken && schoolUUID && isFirstTime) {
      const response = await fetch(
        `http://localhost:8888/api/schooladmin/joinCode/${schoolUUID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const fetchedJoinCodes = await response.json();
      setJoinCodes(fetchedJoinCodes);
      setIsFirstTime(false);
    }
  }

  function savePopUpInput() {
    if (joinCodeId == "") {
      addSettingsEntry();
    } else {
      editSettingsEntry();
    }
    setEditPopUpIsVisible(false);
  }

  async function addSettingsEntry() {
    let accessToken = await getAccessToken();
    const data = {
      schoolUUID,
      joinCodeName: joinCodeName,
      expireDate: "2022-10-22 14:00:00",
    };
    const returnValue = await fetch(
      "http://localhost:8888/api/schooladmin/joinCode",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );
    console.log(returnValue);
    if (returnValue.status !== 200) {
      setError("Fehler beim hinzufügen");
    } else {
      const body = await returnValue.json();
      setError("");
      let entry = {
        joinCode: body.joinCode,
        joinCodeName,
      };
      setJoinCodes([...joinCodes, entry]);
    }
  }

  async function editSettingsEntry() {
    let accessToken = await getAccessToken();
    const data = {
      joinCode: joinCodeId,
      joinCodeName,
      expireDate: "2022-10-22 14:00:00",
    };
    console.log(data);
    const returnValue = await fetch(
      "http://localhost:8888/api/schooladmin/joinCode",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (returnValue.status !== 200) {
      setError("Error trying to save");
    } else {
      setError("");
      const newEntries = joinCodes.map((joinCode, index) => {
        if (joinCode.joinCode == joinCodeId) {
          joinCode.joinCodeName = joinCodeName;
          return joinCode;
        } else {
          return joinCode;
        }
      });
      setJoinCodes(newEntries);
    }
  }

  async function deleteSettingsEntry(id) {
    let accessToken = await getAccessToken();
    const returnValue = await fetch(
      "http://localhost:8888/api/schooladmin/joinCode",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          joinCode: id,
        }),
      }
    );
    if (returnValue.status !== 200) {
      setError("Error trying to save");
      console.log(returnValue);
    } else {
      setError("");
      let newSettingsEntries = joinCodes.filter(
        (department) => department.joinCode !== id
      );

      setJoinCodes(newSettingsEntries);
      if (newSettingsEntries.length == 0) {
        setJoinCodes([]);
      }
    }
  }

  return (
    <>
      <SchoolDetailLayout>
        {editPopUpIsVisible && (
          <SettingsPopUp
            headline={joinCodeId == "" ? "Add new entry" : "Edit entry"}
            inputValid={joinCodeNameValid}
            saveLabel={joinCodeId == "" ? "Add" : "Save"}
            saveFunction={savePopUpInput}
            closeFunction={() => {
              setEditPopUpIsVisible(false);
              setJoinCodeName("");
              setJoinCodeNameValid(false);
            }}
          >
            <StyledInputField>
              <InputField
                label="Invitecode name"
                inputType="text"
                value={joinCodeName}
                onChange={(event) => {
                  setJoinCodeName(event);
                }}
                iconName=""
                regex={regex.name}
                setValidInput={setJoinCodeNameValid}
                min="2"
                max="30"
              />
            </StyledInputField>
          </SettingsPopUp>
        )}
        {deletePopUpIsVisible && (
          <SettingsPopUp
            headline={`Remove ${joinCodeName}`}
            inputValid={true}
            saveLabel="Confirm"
            saveFunction={() => {
              deleteSettingsEntry(joinCodeId);
              setDeletePopUpIsVisible(false);
            }}
            closeFunction={() => {
              setDeletePopUpIsVisible(false);
              setJoinCodeName("");
              setJoinCodeNameValid(false);
            }}
          >
            <StyledDeleteText>
              This action cannot be undone. This will permanently delete this
              class.
            </StyledDeleteText>
          </SettingsPopUp>
        )}
        <SettingsHeader
          headline="Invite Codes"
          addFunction={() => {
            setJoinCodeName("");
            setJoinCodeId("");
            setEditPopUpIsVisible(true);
          }}
        ></SettingsHeader>
        {error && <StyledError>{error}</StyledError>}
        <SettingsEntriesLayout>
          {joinCodes.map((entry, index) => (
            <SettingsEntryLayout key={entry.joinCode} data-key={entry.joinCode}>
              <SettingsEntry
                editFunction={() => {
                  setJoinCodeName(entry.joinCodeName);
                  setJoinCodeId(entry.joinCode);
                  setEditPopUpIsVisible(true);
                }}
                deleteFunction={() => {
                  setJoinCodeId(entry.joinCode);
                  setDeletePopUpIsVisible(true);
                }}
                highlighted={
                  router.query &&
                  router.query.joinCode &&
                  entry.joinCode == router.query.joinCode
                }
              >
                <SettingsEntryName>{entry.joinCode}</SettingsEntryName>
                <DepartmentName>{entry.joinCodeName}</DepartmentName>
              </SettingsEntry>
            </SettingsEntryLayout>
          ))}
        </SettingsEntriesLayout>
      </SchoolDetailLayout>
    </>
  );
};
