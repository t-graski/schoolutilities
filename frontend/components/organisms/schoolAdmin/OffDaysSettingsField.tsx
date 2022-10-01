import React from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/input/InputField";
import { regex } from "../../../utils/regex";
import { useRouter } from "next/router";
import { Spacer } from "../../atoms/Spacer";
import { SettingsHeader } from "../../molecules/schoolAdmin/SettingsHeader";
import { SettingsEntry } from "../../molecules/schoolAdmin/SettingsEntry";
import { SettingsPopUp } from "../../molecules/schoolAdmin/SettingsPopUp";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQuery } from "react-query";
import {
  addOffDay,
  addSchoolClass,
  deleteOffDay,
  deleteSchoolClass,
  editOffDay,
  editSchoolClass,
  fetchOffDays,
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
  color: "$fontPrimary",
});

const OffDayDate = styled("p", {
  fontSize: "1rem",
  color: "$fontPrimary",
});

const StyledInputField = styled("div", {
  marginTop: "15px",
  marginBottom: "15px",
});

const StyledDeleteText = styled("p", {
  fontSize: "1rem",
  color: "$fontPrimary",
  marginTop: "15px",
});

export const OffDaysSettingsField: React.FC<Props> = ({ queryClient }) => {
  const [editPopUpIsVisible, setEditPopUpIsVisible] = React.useState(false);
  const [deletePopUpIsVisible, setDeletePopUpIsVisible] = React.useState(false);
  const [offDayName, setOffDayName] = React.useState("");
  const [offDayNameValid, setOffDayNameValid] = React.useState(false);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [offDayId, setOffDayId] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  const { data: offDays, status: offDaysStatus } = useQuery(
    ["offDays", schoolUUID],
    () => fetchOffDays(schoolUUID)
  );

  const addOffDayMutation = useMutation(addOffDay, {
    onMutate: async () => {
      await queryClient.cancelQueries(["offDays", schoolUUID]);

      let entry = {
        holidayUUID: "newEntry",
        holidayName: offDayName,
        holidayStartDate: startDate,
        holidayEndDate: endDate,
      };

      queryClient.setQueryData(["offDays", schoolUUID], (old: any) => [
        ...old,
        entry,
      ]);

      return { entry };
    },
    onSuccess: (newEntry) => {
      let entry = {
        holidayUUID: newEntry.holidayUUID,
        holidayName: newEntry.holidayName,
        holidayStartDate: startDate,
        holidayEndDate: endDate,
      };

      console.log(newEntry);

      queryClient.setQueryData(["offDays", schoolUUID], (old: any) =>
        old.map((currEntry) =>
          currEntry.holidayUUID === "newEntry" ? entry : currEntry
        )
      );
    },
    onError: (err: any) => {
      setError(err.message);

      queryClient.setQueryData(["offDays", schoolUUID], (old: any) =>
        old.filter((currEntry) => currEntry.holidayUUID !== "newEntry")
      );
    },
  });

  const deleteClassMutation = useMutation(
    () => deleteOffDay(offDayId),
    {
      onSuccess: async () => {
        await queryClient.cancelQueries(["offDays", schoolUUID]);

        queryClient.setQueryData(["offDays", schoolUUID], (old: any) =>
          old.filter((currElement) => currElement.holidayUUID !== offDayId)
        );
      },
      onError: (err: any) => {
        setError(err.message);
      },
    }
  );

  const editClassMutation = useMutation(editOffDay, {
    onSuccess: async (response) => {
      let entry = {
        holidayUUID: response.holidayUUID,
        holidayName: response.holidayName,
        holidayStartDate: response.holidayStartDate,
        holidayEndDate: response.holidayEndDate,
      };

      queryClient.setQueryData(["offDays", schoolUUID], (old: any) =>
        old.map((currEntry) =>
          currEntry.holidayUUID === response.holidayUUID ? entry : currEntry
        )
      );
    },
    onError: (err: any) => {
      setError(err.message);
    },
  });

  function savePopUpInput() {
    if (offDayId == "") {
      addOffDayMutation.mutate({
        schoolUUID,
        holidayName: offDayName,
        holidayStartDate: startDate,
        holidayEndDate: endDate,
      });
    } else {
      editClassMutation.mutate({
        holidayUUID: offDayId,
        holidayName: offDayName,
        holidayStartDate: startDate,
        holidayEndDate: endDate,
      });
    }
    setEditPopUpIsVisible(false);
  }

  let options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  return (
    <>
      <SchoolDetailLayout>
        {editPopUpIsVisible && (
          <SettingsPopUp
            headline={offDayId == "" ? "Add new off day" : "Edit off day"}
            inputValid={offDayNameValid}
            saveLabel={offDayId == "" ? "Add" : "Save"}
            saveFunction={savePopUpInput}
            closeFunction={() => {
              setEditPopUpIsVisible(false);
              setOffDayName("");
              setOffDayNameValid(false);
            }}
          >
            <StyledInputField>
              <InputField
                label="Off day name"
                inputType="text"
                value={offDayName}
                onChange={(event) => {
                  setOffDayName(event);
                  if (regex.name.test(event)) {
                    setOffDayNameValid(true);
                  } else {
                    setOffDayNameValid(false);
                  }
                }}
                regex={regex.schoolName}
                setValidInput={setOffDayNameValid}
                min="2"
                max="30"
              />
              <Spacer size="verySmall" />
              <InputField
                label="Off day begin"
                value={startDate}
                inputType={"date"}
                onChange={(event) => {
                  setStartDate(event);
                }}
              ></InputField>
              <Spacer size="verySmall" />
              <InputField
                label="Off day end"
                value={endDate}
                inputType={"date"}
                onChange={(event) => {
                  setEndDate(event);
                }}
              ></InputField>
            </StyledInputField>
          </SettingsPopUp>
        )}
        {deletePopUpIsVisible && (
          <SettingsPopUp
            headline={`Remove ${offDayName}`}
            inputValid={true}
            saveLabel="Confirm"
            saveFunction={() => {
              deleteClassMutation.mutate();
              setDeletePopUpIsVisible(false);
            }}
            closeFunction={() => {
              setDeletePopUpIsVisible(false);
              setOffDayName("");
              setOffDayNameValid(false);
            }}
          >
            <StyledDeleteText>
              This action can&apos;t be undone and will permanently remove the
              off day {offDayName}.
            </StyledDeleteText>
          </SettingsPopUp>
        )}
        <SettingsHeader
          headline="Off Days"
          addFunction={() => {
            setOffDayName("");
            setOffDayId("");
            setEditPopUpIsVisible(true);
            setStartDate("");
          }}
        ></SettingsHeader>
        {error}
        <SettingsEntriesLayout>
          {offDaysStatus == "success" &&
            offDays.length > 0 &&
            offDays.map((entry) => (
              <SettingsEntryLayout
                key={entry.holidayUUID}
                data-key={entry.holidayUUID}
              >
                <SettingsEntry
                  editFunction={() => {
                    setOffDayName(entry.holidayName);
                    setOffDayId(entry.holidayUUID);
                    setStartDate(entry.holidayStartDate);
                    setEndDate(entry.holidayEndDate);
                    setEditPopUpIsVisible(true);
                    setOffDayNameValid(true);
                  }}
                  deleteFunction={() => {
                    setOffDayId(entry.holidayUUID);
                    setOffDayName(entry.holidayName);
                    setDeletePopUpIsVisible(true);
                  }}
                >
                  <>
                    <SettingsEntryName>{entry.holidayName}</SettingsEntryName>
                    <OffDayDate>
                      {/*@ts-ignore */}
                      {new Intl.DateTimeFormat("default", options).format(
                        new Date(entry.holidayStartDate)
                      )}{" "}
                      -{" "}
                      {new Intl.DateTimeFormat("default", options).format(
                        new Date(entry.holidayEndDate)
                      )}
                    </OffDayDate>
                  </>
                </SettingsEntry>
              </SettingsEntryLayout>
            ))}
          {offDaysStatus == "success" && offDays.length <= 0 && (
            <>There are no off days yet. Add one by clicking the plus button.</>
          )}
          {offDaysStatus == "loading" && (
            <>
              <Skeleton width="100%" height={100}></Skeleton>
              <Skeleton width="100%" height={100}></Skeleton>
              <Skeleton width="100%" height={100}></Skeleton>
            </>
          )}
          {offDaysStatus == "error" && (
            <>While loading the off days an error occured. Please try again.</>
          )}
        </SettingsEntriesLayout>
      </SchoolDetailLayout>
    </>
  );
};
