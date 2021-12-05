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

export const DepartmentsSettingsField: React.FC<Props> = ({
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
    const returnValue = await fetch(dbEntryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(getAllEntriesBody),
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
      ...addEntryBody,
      name: settingsEntryName,
    };
    const returnValue = await fetch(dbEntryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (returnValue.status !== 200) {
      setError("Fehler beim hinzufügen");
    } else {
      const body = await returnValue.json();
      setError("");
      let entry = {
        name: settingsEntryName,
      };
      entry[UUIDField] = body[UUIDField];
      setSettingsEntries([...settingsEntries, entry]);
    }
  }

  async function editSettingsEntry() {
    const data = {
      ...editEntryBody,
      name: settingsEntryName,
    };
    data[UUIDField] = settingsEntryId;
    const returnValue = await fetch(dbEntryUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (returnValue.status !== 200) {
      setError("Fehler beim Speichern");
    } else {
      setError("");
      const newEntries = settingsEntries.map((entry, index) => {
        if (entry[UUIDField] == settingsEntryId) {
          entry.name = settingsEntryName;
          return entry;
        } else {
          return entry;
        }
      });
      setSettingsEntries(newEntries);
    }
  }

  async function deleteSettingsEntry(id) {
    const data = {};
    data[UUIDField] = id;
    const returnValue = await fetch(dbEntryUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (returnValue.status !== 200) {
      setError("Fehler beim löschen");
    } else {
      setError("");
      let newSettingsEntries = settingsEntries.filter(
        (settingsEntry) => settingsEntry[UUIDField] == id
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
          <SettingsPopUp
            headline=""
          >

          </SettingsPopUp>
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
          {settingsEntries.map((entry, index) => (
            <SettingsEntryLayout key={index}>
              <SettingsEntryName>{entry.name}</SettingsEntryName>
              <SettingsEntryIcons>
                <SettingsEntryEditIcon
                  onClick={() => {
                    setSettingsEntryName(entry.name);
                    setSettingsEntryId(entry[UUIDField]);
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
