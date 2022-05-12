import React from "react";
import { styled } from "../../../stitches.config";
import { useRouter } from "next/router";
import { SettingsHeader } from "../../molecules/schoolAdmin/SettingsHeader";
import { SettingsEntry } from "../../molecules/schoolAdmin/SettingsEntry";
import { SettingsPopUp } from "../../molecules/schoolAdmin/SettingsPopUp";
import Skeleton from "react-loading-skeleton";
import { Select } from "../../atoms/input/Select";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteSchoolPerson,
  editSchoolPerson,
  fetchSchoolPersons,
} from "../../../utils/requests";

type Props = {
  queryClient: any;
};

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
  marginTop: "15px",

  fontSize: "1rem",
  color: "$fontPrimary",
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

export const PersonsSettingsField: React.FC<Props> = ({
  queryClient,
}) => {
  const [deletePopUpIsVisible, setDeletePopUpIsVisible] = React.useState(false);
  const [editPopUpIsVisible, setEditPopUpIsVisible] = React.useState(false);
  const [personName, setPersonName] = React.useState("");
  const [roleId, setRoleId] = React.useState("");
  const [personUUID, setPersonUUID] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  const { data: persons, status: personsStatus } = useQuery(
    ["persons", schoolUUID],
    async () => fetchSchoolPersons(schoolUUID)
  );

  const deletePersonMutation = useMutation(deleteSchoolPerson, {
    onSuccess: async () => {
      await queryClient.cancelQueries(["persons", schoolUUID]);

      queryClient.setQueryData(["persons", schoolUUID], (old: any) =>
        old.filter((currElement) => currElement.personUUID !== personUUID)
      );
    },
    onError: (err: any) => {
      setError(err.message);
    },
  });

  const editPersonMutation = useMutation(editSchoolPerson, {
    onSuccess: async () => {
      await queryClient.cancelQueries(["persons", schoolUUID]);

      queryClient.setQueryData(["persons", schoolUUID], (old: any) =>
        old.map((currEntry) =>
          currEntry.personUUID === personUUID
            ? {
                ...currEntry,
                roleId: roleId,
                roleName: RoleOrder.find(
                  (role) => role.value === Number(roleId)
                ).label,
              }
            : currEntry
        )
      );
    },
  });

  return (
    <>
      <SchoolDetailLayout>
        {deletePopUpIsVisible && (
          <SettingsPopUp
            headline={`Remove ${personName}`}
            inputValid={true}
            saveLabel="Confirm"
            saveFunction={() => {
              deletePersonMutation.mutate({ schoolUUID, personUUID });
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
            saveFunction={() => {
              editPersonMutation.mutate({
                schoolUUID,
                personUUID,
                roleId,
              });
              setEditPopUpIsVisible(false);
            }}
            closeFunction={() => {
              setEditPopUpIsVisible(false);
              setPersonName("");
            }}
          >
            <StyledInputField>
              <Select
                selectValue={roleId}
                selectOptions={RoleOrder}
                onChange={(event) => {
                  setRoleId(event);
                }}
              ></Select>
            </StyledInputField>
          </SettingsPopUp>
        )}
        <SettingsHeader headline="Persons"></SettingsHeader>
        {error}
        <SettingsEntriesLayout>
          {personsStatus == "success" && persons.length > 0 ? (
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
