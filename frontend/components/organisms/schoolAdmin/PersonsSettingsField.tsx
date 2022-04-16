import React, { useEffect } from "react";
import { styled } from "../../../stitches.config";
import { useRouter } from "next/router";
import { getAccessToken } from "../../../misc/authHelper";
import { SettingsHeader } from "../../molecules/schoolAdmin/SettingsHeader";
import { SettingsEntry } from "../../molecules/schoolAdmin/SettingsEntry";
import { SettingsPopUp } from "../../molecules/schoolAdmin/SettingsPopUp";

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

export const PersonsSettingsField: React.FC<Props> = ({}) => {
  const [persons, setPersons] = React.useState([]);
  const [isFirstTime, setIsFirstTime] = React.useState(true);
  const [deletePopUpIsVisible, setDeletePopUpIsVisible] = React.useState(false);
  const [personName, setPersonName] = React.useState("");
  const [personId, setPersonId] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

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

  return (
    <>
      <SchoolDetailLayout>
        {deletePopUpIsVisible && (
          <SettingsPopUp
            headline={`Remove ${personName}`}
            inputValid={true}
            saveLabel="Confirm"
            saveFunction={() => {
              deleteSettingsEntry(personId);
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
        <SettingsHeader headline="Persons"></SettingsHeader>
        {error}
        <SettingsEntriesLayout>
          {persons.map((entry, index) => (
            <SettingsEntryLayout
              key={entry.personUUID}
              data-key={entry.personUUID}
            >
              <SettingsEntry
                deleteFunction={() => {
                  setPersonId(entry.personUUID);
                  setPersonName(entry.firstName + " " + entry.lastName);
                  setDeletePopUpIsVisible(true);
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
                  {/* <Link
                    href={`/school/${router.query.schoolUUID as string}/edit?personUUID=${entry.personUUID}`}
                  >
                    <SettingsEntryLink>
                      <DepartmentName>{entry.departmentName}</DepartmentName>
                    </SettingsEntryLink>
                  </Link> */}
                </>
              </SettingsEntry>
            </SettingsEntryLayout>
          ))}
        </SettingsEntriesLayout>
      </SchoolDetailLayout>
    </>
  );
};
