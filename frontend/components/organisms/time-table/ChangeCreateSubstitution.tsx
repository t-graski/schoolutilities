import { SearchSelect } from "@/atoms/input/SearchSelect";
import SvgSchool from "@/atoms/svg/SvgSchool";
import { SubjectSelectionField } from "@/molecules/schoolAdmin/SubjectSelectionField";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { fetchSchoolClasses, fetchTeachers } from "utils/requests";
import { fetchSchoolRooms } from "utils/requests/admin";
import { getTimeFormatFromDateString } from "utils/untilFunctions";
import { styled } from "../../../stitches.config";
import { TimeTableItemType } from "../../atoms/TimeTableItem";

type Props = {
  initialItemConfig: TimeTableItemType;
  itemConfig: any;
  setItemConfig: React.Dispatch<React.SetStateAction<TimeTableItemType>>;
};

const InputFieldsLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  gap: "9x",
});

const InputFieldLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$4x",
});

export const ChangeCreateSubstitution: React.FC<Props> = ({
  initialItemConfig,
  itemConfig,
  setItemConfig,
}) => {
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  const { data: classes, status: classesStatus } = useQuery(
    ["classes", schoolUUID],
    () => fetchSchoolClasses(schoolUUID),
    {
      enabled: !!schoolUUID,
    }
  );
  const { data: teachers, status: teachersStatus } = useQuery(
    ["teachers", schoolUUID],
    () => fetchTeachers(schoolUUID),
    {
      enabled: !!schoolUUID,
    }
  );
  const { data: rooms, status: roomsStatus } = useQuery(
    ["rooms", schoolUUID],
    () => fetchSchoolRooms(schoolUUID),
    {
      enabled: !!schoolUUID,
    }
  );

  console.log(classes);

  return (
    <>
      <InputFieldsLayout>
        <InputFieldLayout>
          Timetable element:
          <br />
          <span>
            {initialItemConfig.timeTableElementDay},{" "}
            {getTimeFormatFromDateString(
              initialItemConfig.timeTableElementStartTime
            )}{" "}
            -{" "}
            {getTimeFormatFromDateString(
              initialItemConfig.timeTableElementEndTime
            )}
          </span>
          {classesStatus === "success" &&
            classes
              .filter((element) =>
                itemConfig.timeTableSubstitutionClasses.includes(
                  element.classUUID
                )
              )
              .map((element) => element.className)
              .join(",")}
        </InputFieldLayout>
        <InputFieldLayout>
          <SubjectSelectionField
            selectedSubject={{
              label: itemConfig.schoolSubject.schoolSubjectAbbreviation,
              value: itemConfig.schoolSubject.schoolSubjectUUID,
            }}
            setSelectedSubject={(subject) => {
              setItemConfig({
                ...itemConfig,
                schoolSubject: {
                  ...itemConfig.schoolSubject,
                  schoolSubjectUUID: subject,
                },
              });
            }}
          ></SubjectSelectionField>
          {initialItemConfig.schoolSubject.schoolSubjectName && (
            <>Previous: {initialItemConfig.schoolSubject.schoolSubjectName}</>
          )}
        </InputFieldLayout>
        <InputFieldLayout>
          {teachersStatus === "success" && (
            <SearchSelect
              selectOptions={teachers.map((element) => {
                return {
                  value: element.users.userUUID,
                  label: element.users.userFirstname,
                };
              })}
              onChange={(e) => {
                setItemConfig({
                  ...itemConfig,
                  timeTableSubstitutionTeachers: e.map(
                    (element) => element?.value
                  ),
                });
              }}
              selectMultiValues={true}
              selectValue={teachers
                .filter((element) =>
                  itemConfig.timeTableSubstitutionTeachers.includes(
                    element.users.userUUID
                  )
                )
                .map((element) => {
                  return {
                    value: element.users.userUUID,
                    label: element.users.userFirstname,
                  };
                })}
              isSmall={true}
              label="Teachers"
            />
          )}
          {teachersStatus === "success" &&
            initialItemConfig.timeTableElementTeachers.length > 0 && (
              <>
                Previous:{" "}
                {teachers
                  .filter((element) =>
                    initialItemConfig.timeTableElementTeachers.includes(
                      element.users.userUUID
                    )
                  )
                  .map((element) => element.users.userFirstname)
                  .join(",")}
              </>
            )}
        </InputFieldLayout>
        <InputFieldLayout>
          {roomsStatus === "success" && (
            <SearchSelect
              selectOptions={rooms.map((element) => {
                return {
                  value: element.schoolRoomUUID,
                  label: element.schoolRoomName,
                };
              })}
              onChange={(e) => {
                setItemConfig({
                  ...itemConfig,
                  timeTableSubstitutionRoomUUID: e?.value,
                });
              }}
              selectMultiValues={false}
              selectValue={
                rooms
                  .filter((element) =>
                    itemConfig.timeTableSubstitutionRoomUUID?.includes(
                      element.schoolRoomUUID
                    )
                  )
                  .map((element) => {
                    return {
                      value: element.schoolRoomUUID,
                      label: element.schoolRoomName,
                    };
                  })[0]
              }
              isSmall={true}
              label="Room"
            />
          )}
          {roomsStatus === "success" &&
            initialItemConfig.timeTableElementRoomUUID.length > 0 && (
              <>
                Previous:{" "}
                {rooms
                  .filter((element) =>
                    initialItemConfig.timeTableElementRoomUUID.includes(
                      element.schoolRoomUUID
                    )
                  )
                  .map((element) => element.schoolRoomName)
                  .join(",")}
              </>
            )}
        </InputFieldLayout>
      </InputFieldsLayout>
    </>
  );
};
