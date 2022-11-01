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
  itemConfig: TimeTableItemType;
  setItemConfig: React.Dispatch<React.SetStateAction<TimeTableItemType>>;
};

const InputFieldsLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr",
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

  console.log(itemConfig);

  return (
    <>
      <InputFieldsLayout>
        {getTimeFormatFromDateString(
          initialItemConfig.timeTableElementStartTime
        )}{" "}
        -{" "}
        {getTimeFormatFromDateString(initialItemConfig.timeTableElementEndTime)}
        , {initialItemConfig.timeTableElementDay}
        {initialItemConfig.schoolSubject.schoolSubjectName}
        {teachersStatus === "success" &&
          teachers
            .filter((element) =>
              initialItemConfig.timeTableElementTeachers.includes(
                element.users.userUUID
              )
            )
            .map((element) => element.users.userFirstname)
            .join(",")}
        {classesStatus === "success" &&
          classes
            .filter((element) =>
              initialItemConfig.timeTableElementClasses.includes(
                element.schoolClassUUID
              )
            )
            .map((element) => element.schoolClassName)
            .join(",")}
        {roomsStatus === "success" &&
          rooms
            .filter((element) =>
              initialItemConfig.timeTableElementRoomUUID.includes(
                element.schoolRoomUUID
              )
            )
            .map((element) => element.schoolRoomName)
            .join(",")}
        <SubjectSelectionField
          selectedSubject={{
            label: itemConfig.schoolSubject.schoolSubjectAbbreviation,
            value: itemConfig.schoolSubject.schoolSubjectUUID,
          }}
          setSelectedSubject={(subject) => {
            setItemConfig({
              ...itemConfig,
              schoolSubjectUUID: subject,
            });
          }}
        ></SubjectSelectionField>
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
                timeTableElementTeachers: e.map((element) => element?.value),
              });
            }}
            icon={SvgSchool}
            selectMultiValues={true}
            selectValue={teachers
              .filter((element) =>
                itemConfig.timeTableElementTeachers.includes(
                  element.users.userUUID
                )
              )
              .map((element) => {
                return {
                  value: element.users.userUUID,
                  label: element.users.userFirstname,
                };
              })}
          />
        )}
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
                timeTableElementRoomUUID: e?.value,
              });
            }}
            icon={SvgSchool}
            selectMultiValues={false}
            selectValue={
              rooms
                .filter((element) =>
                  itemConfig.timeTableElementRoomUUID?.includes(
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
          />
        )}
      </InputFieldsLayout>
    </>
  );
};
