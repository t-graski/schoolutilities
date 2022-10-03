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
  fetchSchoolUsers,
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
  color: "$neutral-500",
});

const StyledDeleteText = styled("p", {
  marginTop: "15px",

  fontSize: "1rem",
  color: "$neutral-500",
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
  color: "$neutral-500",
});

export const PersonsSettingsField: React.FC<Props> = ({ queryClient }) => {
  const [deletePopUpIsVisible, setDeletePopUpIsVisible] = React.useState(false);
  const [editPopUpIsVisible, setEditPopUpIsVisible] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [schoolRoleId, setSchoolRoleId] = React.useState("");
  const [userUUID, setUserUUID] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  const { data: users, status: usersStatus } = useQuery(
    ["users", schoolUUID],
    async () => fetchSchoolUsers(schoolUUID)
  );

  const deletePersonMutation = useMutation(deleteSchoolPerson, {
    onSuccess: async () => {
      await queryClient.cancelQueries(["users", schoolUUID]);

      queryClient.setQueryData(["users", schoolUUID], (old: any) =>
        old.filter((currElement) => currElement.userUUID !== userUUID)
      );
    },
    onError: (err: any) => {
      setError(err.message);
    },
  });

  const editPersonMutation = useMutation(editSchoolPerson, {
    onSuccess: async () => {
      await queryClient.cancelQueries(["users", schoolUUID]);

      queryClient.setQueryData(["users", schoolUUID], (old: any) =>
        old.map((currEntry) =>
          currEntry.userUUID === userUUID
            ? {
                ...currEntry,
                schoolRoleId: schoolRoleId,
                schoolRoleName: RoleOrder.find(
                  (role) => role.value === Number(schoolRoleId)
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
            headline={`Remove ${userName}`}
            inputValid={true}
            saveLabel="Confirm"
            saveFunction={() => {
              deletePersonMutation.mutate({ schoolUUID, userUUID });
              setDeletePopUpIsVisible(false);
            }}
            closeFunction={() => {
              setDeletePopUpIsVisible(false);
              setUserName("");
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
            headline={"Edit user role"}
            inputValid={true}
            saveLabel={"Save"}
            saveFunction={() => {
              editPersonMutation.mutate({
                schoolUUID,
                userUUID,
                schoolRoleId,
              });
              setEditPopUpIsVisible(false);
            }}
            closeFunction={() => {
              setEditPopUpIsVisible(false);
              setUserName("");
            }}
          >
            <StyledInputField>
              <Select
                selectValue={schoolRoleId}
                selectOptions={RoleOrder}
                onChange={(event) => {
                  setSchoolRoleId(event);
                }}
              ></Select>
            </StyledInputField>
          </SettingsPopUp>
        )}
        <SettingsHeader headline="Users"></SettingsHeader>
        {error}
        <SettingsEntriesLayout>
          {usersStatus == "success" &&
            users.map((entry, index) => (
              <SettingsEntryLayout
                key={entry.userUUID}
                data-key={entry.userUUID}
              >
                <SettingsEntry
                  deleteFunction={() => {
                    setUserUUID(entry.userUUID);
                    setUserName(entry.userFirstname + " " + entry.userLastname);
                    setDeletePopUpIsVisible(true);
                  }}
                  editFunction={() => {
                    setUserUUID(entry.userUUID);
                    setSchoolRoleId(entry.roleId);
                    setUserName(entry.userFirstname + " " + entry.userLastname);
                    setEditPopUpIsVisible(true);
                  }}
                  highlighted={
                    router.query &&
                    router.query.userUUID &&
                    entry.uerUUID == router.query.userUUID
                  }
                >
                  <>
                    <SettingsEntryName>
                      {entry.userFirstname} {entry.userLastname}
                    </SettingsEntryName>
                    <PersonRoleName>{entry.schoolRoleName}</PersonRoleName>
                  </>
                </SettingsEntry>
              </SettingsEntryLayout>
            ))}
          {usersStatus == "loading" && (
            <>
              <Skeleton width="100%" height={80}></Skeleton>
              <Skeleton width="100%" height={60}></Skeleton>
              <Skeleton width="100%" height={80}></Skeleton>
              <Skeleton width="100%" height={80}></Skeleton>
            </>
          )}
          {usersStatus == "error" && (
            <>
              While loading the users an error occured. Please try again later.
            </>
          )}
        </SettingsEntriesLayout>
      </SchoolDetailLayout>
    </>
  );
};
