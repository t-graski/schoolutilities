import React, { useEffect } from "react";
import { styled } from "../../../stitches.config";
import { useRouter } from "next/router";
import { getAccessToken, getUserData } from "../../../misc/authHelper";
import { SettingsHeader } from "../../molecules/schoolAdmin/SettingsHeader";
import { SettingsEntry } from "../../molecules/schoolAdmin/SettingsEntry";
import { SettingsPopUp } from "../../molecules/schoolAdmin/SettingsPopUp";
import { InputField } from "../../atoms/input/InputField";
import { regex } from "../../../misc/regex";
import Skeleton from "react-loading-skeleton";

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

const StyledDeleteText = styled("p", {
  fontSize: "1rem",
  color: "$fontPrimary",
  marginTop: "15px",
});

export const RoleOrder = [
  {
    value: 1,
    label: "Admin",
  },
  {
    value: 2,
    label: "Teacher",
  },
  {
    value: 3,
    label: "Student",
  },
];

const StyledInputField = styled("div", {
  marginTop: "15px",
  marginBottom: "15px",
});

const PersonRoleName = styled("p", {
  fontSize: "1rem",
  color: "$fontPrimary",
});

export const PersonsSettingsField: React.FC<Props> = ({}) => {
  const [persons, setPersons] = React.useState([]);
  const [isFirstTime, setIsFirstTime] = React.useState(true);
  const [deletePopUpIsVisible, setDeletePopUpIsVisible] = React.useState(false);
  const [editPopUpIsVisible, setEditPopUpIsVisible] = React.useState(false);
  const [personName, setPersonName] = React.useState("");
  const [roleId, setRoleId] = React.useState("");
  const [personUUID, setPersonUUID] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  useEffect(() => {
    if (isFirstTime) {
      updateSettingsEntriesFromDatabase();
      setIsFirstTime(false);
    }

    async function updateSettingsEntriesFromDatabase() {
      let accessToken = await getAccessToken();
      if (!accessToken) {
        router.push("/auth/login");
      }
      if (!schoolUUID) {
        router.push("/school/select");
      }
      if (accessToken && schoolUUID && isFirstTime) {
        let returnValue = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/getPersons/${schoolUUID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        let json = await returnValue.json();
        
        setPersons(json);
      }
    }
  }, [isFirstTime, router, schoolUUID]);

  async function deleteSettingsEntry(id) {
    const returnValue = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/leaveSchool`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          schoolUUID,
          personUUID: id,
        }),
      }
    );
    if (returnValue.status !== 200) {
      setError("Error trying to delete");
    } else {
      setError("");
      let newSettingsEntries = persons.filter(
        (person) => person.personUUID !== id
      );

      setPersons(newSettingsEntries);
      if (newSettingsEntries.length == 0) {
        setPersons([]);
      }
    }
  }

  async function savePopUpInput() {
    const data = {
      schoolUUID,
      personUUID,
      roleId,
    };
    let accessToken = await getAccessToken();
    if (!accessToken) {
      router.push("/auth/login");
    }
    const returnValue = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/role`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );
    console.log(returnValue);
    if (returnValue.status !== 200) {
      setError("Error trying to save");
    } else {
      setError("");
      const newEntries = persons.map((person) => {
        if (person.personUUID == personUUID) {
          person.roleId = roleId;
          person.roleName = RoleOrder.find(
            (role) => role.value == Number(roleId)
          ).label;
          return person;
        } else {
          return person;
        }
      });
      setPersons(newEntries);
    }
    setEditPopUpIsVisible(false);
  }

  return (
    <>
      <SchoolDetailLayout>
        {deletePopUpIsVisible && (
          <SettingsPopUp
            headline={`Remove ${personName}`}
            inputValid={true}
            saveLabel="Confirm"
            saveFunction={() => {
              deleteSettingsEntry(personUUID);
              setDeletePopUpIsVisible(false);
            }}
            closeFunction={() => {
              setDeletePopUpIsVisible(false);
              setPersonName("");
            }}
          >
            <StyledDeleteText>
              This action cannot be undone. This will permanently delete this
              class.
            </StyledDeleteText>
          </SettingsPopUp>
        )}
        {editPopUpIsVisible && (
          <SettingsPopUp
            headline={"Edit person role"}
            inputValid={true}
            saveLabel={"Save"}
            saveFunction={savePopUpInput}
            closeFunction={() => {
              setEditPopUpIsVisible(false);
              setPersonName("");
            }}
          >
            <StyledInputField>
              <InputField
                inputType="select"
                selectValue={roleId}
                selectOptions={RoleOrder}
                onChange={(event) => {
                  setRoleId(event);
                }}
                iconName=""
              ></InputField>
            </StyledInputField>
          </SettingsPopUp>
        )}
        <SettingsHeader headline="Persons"></SettingsHeader>
        {error}
        <SettingsEntriesLayout>
          {persons.length > 0 ? (
            persons.map((entry, index) => (
              <SettingsEntryLayout
                key={entry.personUUID}
                data-key={entry.personUUID}
              >
                <SettingsEntry
                  deleteFunction={() => {
                    setPersonUUID(entry.personUUID);
                    setPersonName(entry.firstName + " " + entry.lastName);
                    setDeletePopUpIsVisible(true);
                  }}
                  editFunction={() => {
                    setPersonUUID(entry.personUUID);
                    setRoleId(entry.roleId);
                    setPersonName(entry.firstName + " " + entry.lastName);
                    setEditPopUpIsVisible(true);
                  }}
                  highlighted={
                    router.query &&
                    router.query.personUUID &&
                    entry.personUUID == router.query.personUUID
                  }
                >
                  <>
                    <SettingsEntryName>
                      {entry.firstName} {entry.lastName}
                    </SettingsEntryName>
                    <PersonRoleName>{entry.roleName}</PersonRoleName>
                  </>
                </SettingsEntry>
              </SettingsEntryLayout>
            ))
          ) : (
            <>
              <Skeleton width="100%" height={80}></Skeleton>
              <Skeleton width="100%" height={60}></Skeleton>
              <Skeleton width="100%" height={80}></Skeleton>
              <Skeleton width="100%" height={80}></Skeleton>
            </>
          )}
        </SettingsEntriesLayout>
      </SchoolDetailLayout>
    </>
  );
};
