import React, { useEffect } from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/InputField";
import { useRouter } from "next/router";
import { getAccessToken } from "../../../misc/authHelper";
import { SettingsHeader } from "../../molecules/schoolAdmin/SettingsHeader";
import { SettingsEntry } from "../../molecules/schoolAdmin/SettingsEntry";
import { SettingsPopUp } from "../../molecules/schoolAdmin/SettingsPopUp";
import { regex } from "../../../misc/regex";

type Props = {};

const SchoolDetailLayout = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  justifySelf: "center",
  width: "100%",
  padding: "40px 60px",
  overflowY: "scroll",
  marginTop: "12vh",
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
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

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
      router.push("/school/select");
    }
    if (accessToken && schoolUUID && isFirstTime) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/joinCode/${schoolUUID}`,
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/joinCode`,
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
      setError("Error while adding");
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/joinCode`,
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/joinCode`,
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
            headline={
              joinCodeId == "" ? "Add new invite code" : "Edit invite code"
            }
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
                label="Name"
                inputType="text"
                value={joinCodeName}
                onChange={(event) => {
                  setJoinCodeName(event);
                }}
                iconName=""
                regex={regex.schoolName}
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
              This action can't be undone and will permanently remove the invite
              code {joinCodeName}.
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
