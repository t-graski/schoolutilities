import React from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/input/InputField";
import { useRouter } from "next/router";
import { SettingsHeader } from "../../molecules/schoolAdmin/SettingsHeader";
import { SettingsEntry } from "../../molecules/schoolAdmin/SettingsEntry";
import { SettingsPopUp } from "../../molecules/schoolAdmin/SettingsPopUp";
import { regex } from "../../../utils/regex";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addSchoolJoinCode,
  deleteJoinCode,
  editJoinCode,
  fetchSchoolJoinCodes,
} from "../../../utils/requests";

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

const StyledInputField = styled("div", {
  marginTop: "15px",
  marginBottom: "15px",
});

const StyledError = styled("p", {
  marginTop: "15px",
  marginBottom: "15px",
  border: "solid 2px $specialTertiary",
  padding: "20px",
  width: "fit-content",
  borderRadius: "25px",

  color: "$specialTertiary",
  fontSize: "1.5rem",
  fontWeight: "$bold",
});

const DepartmentName = styled("p", {
  fontSize: "1rem",
  color: "$fontPrimary",
});

const StyledDeleteText = styled("p", {
  marginTop: "15px",

  fontSize: "1rem",
  color: "$fontPrimary",
});

export const JoinCodesSettingsField: React.FC<Props> = ({}) => {
  const [editPopUpIsVisible, setEditPopUpIsVisible] = React.useState(false);
  const [deletePopUpIsVisible, setDeletePopUpIsVisible] = React.useState(false);
  const [joinCodeName, setJoinCodeName] = React.useState("");
  const [joinCodeNameValid, setJoinCodeNameValid] = React.useState(false);
  const [joinCodeId, setJoinCodeId] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  const queryClient = useQueryClient();

  const { data: joinCodes, status: joinCodesStatus } = useQuery(
    ["joinCodes", schoolUUID],
    () => fetchSchoolJoinCodes(schoolUUID)
  );

  const addJoinCodeMutation = useMutation(addSchoolJoinCode, {
    onSuccess: (response) => {
      let entry = {
        joinCode: response.joinCode,
        joinCodeName,
      };

      queryClient.setQueryData(["joinCodes", schoolUUID], (old: any) => [
        ...old,
        entry,
      ]);
    },
    onError: (err: any) => {
      setError(err.message);
    },
  });

  const deleteJoinCodeMutation = useMutation(deleteJoinCode, {
    onSuccess: async () => {
      await queryClient.cancelQueries(["joinCodes", schoolUUID]);

      queryClient.setQueryData(["joinCodes", schoolUUID], (old: any) =>
        old.filter((currElement) => currElement.joinCode !== joinCodeId)
      );
    },
    onError: (err: any) => {
      setError(err.message);
    },
  });

  const editJoinCodeMutation = useMutation(editJoinCode, {
    onSuccess: async () => {
      let entry = {
        joinCode: joinCodeId,
        joinCodeName: joinCodeName,
      };

      queryClient.setQueryData(["joinCodes", schoolUUID], (old: any) =>
        old.map((currEntry) =>
          currEntry.joinCode === joinCodeId ? entry : currEntry
        )
      );
    },
    onError: (err: any) => {
      setError(err.message);
    },
  });

  function savePopUpInput() {
    if (joinCodeId == "") {
      addJoinCodeMutation.mutate({
        schoolUUID,
        joinCodeName,
        expireDate: "2022-10-22 14:00:00",
      });
    } else {
      editJoinCodeMutation.mutate({
        joinCode: joinCodeId,
        joinCodeName,
        expireDate: "2022-10-22 14:00:00",
      });
    }
    setEditPopUpIsVisible(false);
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
              deleteJoinCodeMutation.mutate(joinCodeId);
              setDeletePopUpIsVisible(false);
            }}
            closeFunction={() => {
              setDeletePopUpIsVisible(false);
              setJoinCodeName("");
              setJoinCodeNameValid(false);
            }}
          >
            <StyledDeleteText>
              This action can&apos;t be undone and will permanently remove the
              invite code {joinCodeName}.
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
          {joinCodesStatus == "success" && joinCodes.length > 0 ? (
            joinCodes.map((entry, index) => (
              <SettingsEntryLayout
                key={entry.joinCode}
                data-key={entry.joinCode}
              >
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
            ))
          ) : (
            <>
              <Skeleton width="100%" height={100}></Skeleton>
              <Skeleton width="100%" height={100}></Skeleton>
              <Skeleton width="100%" height={80}></Skeleton>
              <Skeleton width="100%" height={100}></Skeleton>
            </>
          )}
        </SettingsEntriesLayout>
      </SchoolDetailLayout>
    </>
  );
};
