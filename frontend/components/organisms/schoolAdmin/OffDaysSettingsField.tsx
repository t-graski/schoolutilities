import React from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/input/InputField";
import Link from "next/link";
import { regex } from "../../../utils/regex";
import { useRouter } from "next/router";
import { Spacer } from "../../atoms/Spacer";
import { SettingsHeader } from "../../molecules/schoolAdmin/SettingsHeader";
import { SettingsEntry } from "../../molecules/schoolAdmin/SettingsEntry";
import { SettingsPopUp } from "../../molecules/schoolAdmin/SettingsPopUp";
import Skeleton from "react-loading-skeleton";
import { Select } from "../../atoms/input/Select";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addSchoolClass,
  deleteSchoolClass,
  editSchoolClass,
  fetchSchoolClasses,
  fetchSchoolDepartments,
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

const DepartmentName = styled("p", {
  fontSize: "1rem",
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

  const { data: classes, status: classesStatus } = useQuery(
    ["classes", schoolUUID],
    () => fetchSchoolClasses(schoolUUID)
  );

  const addClassMutation = useMutation(addSchoolClass, {
    onMutate: async () => {
      await queryClient.cancelQueries(["classes", schoolUUID]);

      let entry = {
        classUUID: "newEntry",
        className: offDayName,
        departmentUUID: startDate,
        departmentName: departments.find(
          (department) => department.departmentUUID === startDate
        ).departmentName,
      };

      queryClient.setQueryData(["classes", schoolUUID], (old: any) => [
        ...old,
        entry,
      ]);

      return { entry };
    },
    onSuccess: (newEntry) => {
      let entry = {
        classUUID: newEntry.classUUID,
        className: newEntry.className,
        departmentUUID: startDate,
        departmentName: departments.find(
          (department) => department.departmentUUID === startDate
        ).departmentName,
      };

      queryClient.setQueryData(["classes", schoolUUID], (old: any) =>
        old.map((currEntry) =>
          currEntry.classUUID === "newEntry" ? entry : currEntry
        )
      );
    },
    onError: (err: any) => {
      setError(err.message);

      queryClient.setQueryData(["classes", schoolUUID], (old: any) =>
        old.filter((currEntry) => currEntry.classUUID !== "newEntry")
      );
    },
  });

  const deleteClassMutation = useMutation(deleteSchoolClass, {
    onSuccess: async () => {
      await queryClient.cancelQueries(["classes", schoolUUID]);

      queryClient.setQueryData(["classes", schoolUUID], (old: any) =>
        old.filter((currElement) => currElement.classUUID !== offDayId)
      );
    },
    onError: (err: any) => {
      setError(err.message);
    },
  });

  const editClassMutation = useMutation(editSchoolClass, {
    onSuccess: async (response) => {
      let entry = {
        classUUID: response.classUUID,
        className: response.className,
        departmentUUID: startDate,
        departmentName: departments.find(
          (department) => department.departmentUUID === startDate
        ).departmentName,
      };

      queryClient.setQueryData(["classes", schoolUUID], (old: any) =>
        old.map((currEntry) =>
          currEntry.classUUID === response.classUUID ? entry : currEntry
        )
      );
    },
    onError: (err: any) => {
      setError(err.message);
    },
  });

  function savePopUpInput() {
    if (offDayId == "") {
      addClassMutation.mutate({
        classUUID: "newEntry",
        className: offDayName,
        departmentUUID: startDate,
        departmentName: departments.find(
          (department) => department.departmentUUID === startDate
        ).departmentName,
      });
    } else {
      editClassMutation.mutate({
        classUUID: offDayId,
        className: offDayName,
        departmentUUID: startDate,
      });
    }
    setEditPopUpIsVisible(false);
  }

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
              deleteClassMutation.mutate(offDayId);
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
              class {offDayName}.
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
          {classesStatus == "success" && classes.length > 0 ? (
            classes.map((entry) => (
              <SettingsEntryLayout
                key={entry.classUUID}
                data-key={entry.classUUID}
              >
                <SettingsEntry
                  editFunction={() => {
                    setOffDayName(entry.className);
                    setOffDayId(entry.classUUID);
                    setStartDate(entry.departmentUUID);
                    setEditPopUpIsVisible(true);
                    setOffDayNameValid(true);
                  }}
                  deleteFunction={() => {
                    setOffDayId(entry.classUUID);
                    setOffDayName(entry.className);
                    setDeletePopUpIsVisible(true);
                  }}
                  highlighted={
                    router.query &&
                    router.query.departmentUUID &&
                    entry.departmentUUID == router.query.departmentUUID
                  }
                >
                  <>
                    <SettingsEntryName>{entry.className}</SettingsEntryName>
                    <Link
                      href={`/school/${
                        router.query.schoolUUID as string
                      }/edit?departmentUUID=${entry.departmentUUID}`}
                      passHref
                    >
                      <SettingsEntryLink>
                        <DepartmentName>{entry.departmentName}</DepartmentName>
                      </SettingsEntryLink>
                    </Link>
                  </>
                </SettingsEntry>
              </SettingsEntryLayout>
            ))
          ) : (
            <>
              <Skeleton width="100%" height={100}></Skeleton>
              <Skeleton width="100%" height={100}></Skeleton>
              <Skeleton width="100%" height={100}></Skeleton>
            </>
          )}
        </SettingsEntriesLayout>
      </SchoolDetailLayout>
    </>
  );
};
