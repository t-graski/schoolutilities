import { SearchSelect } from "@/atoms/input/SearchSelect";
import SvgSchool from "@/atoms/svg/SvgSchool";
import { SubjectSelectionField } from "@/molecules/schoolAdmin/SubjectSelectionField";
import { WeekdaySelection } from "@/molecules/WeekdaySelection";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { fetchSchoolClasses, fetchTeachers } from "utils/requests";
import { fetchSchoolRooms } from "utils/requests/admin";
import { getTimeFormatFromDateString } from "utils/untilFunctions";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/input/InputField";
import { TimeTableItemType } from "../../atoms/TimeTableItem";

type Props = {
  itemConfig: TimeTableItemType;
  setItemConfig: React.Dispatch<React.SetStateAction<TimeTableItemType>>;
};

const InputFieldsLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr",
});

const InputFieldLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
});

export const ChangeCreateItem: React.FC<Props> = ({
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

  return (
    <>
      <InputFieldsLayout>
        <InputFieldLayout>
          <InputField
            label="Start Time"
            value={getTimeFormatFromDateString(
              itemConfig.timeTableElementStartTime
            )}
            inputType={"time"}
            onChange={(time) => {
              if (time == "") {
                setItemConfig({
                  ...itemConfig,
                  timeTableElementStartTime: "",
                });
              } else {

                const date = new Date(itemConfig.timeTableElementStartTime != "" ? itemConfig.timeTableElementStartTime : null);
                const hours = time.split(":")[0];
                const minutes = time.split(":")[1];
                date.setHours(parseInt(hours));
                date.setMinutes(parseInt(minutes));

                setItemConfig({
                  ...itemConfig,
                  timeTableElementStartTime: date.toISOString(),
                });
              }
            }}
          ></InputField>
        </InputFieldLayout>
        <InputFieldLayout>
          <InputField
            label="End Time"
            value={getTimeFormatFromDateString(
              itemConfig.timeTableElementEndTime
            )}
            inputType={"time"}
            onChange={(time) => {
              if (time == "") {
                setItemConfig({
                  ...itemConfig,
                  timeTableElementEndTime: "",
                });
              } else {
                const date = new Date(itemConfig.timeTableElementEndTime != "" ? itemConfig.timeTableElementEndTime : null);
                const hours = time.split(":")[0];
                const minutes = time.split(":")[1];
                date.setHours(parseInt(hours));
                date.setMinutes(parseInt(minutes));

                setItemConfig({
                  ...itemConfig,
                  timeTableElementEndTime: date.toISOString(),
                });
              }
            }}
          ></InputField>
        </InputFieldLayout>

        <WeekdaySelection
          items={[
            {
              name: "Monday",
              shortcut: "M",
              value: "Monday",
            },
            {
              name: "Tuesday",
              shortcut: "T",
              value: "Tuesday",
            },
            {
              name: "Wednesday",
              shortcut: "W",
              value: "Wednesday",
            },
            {
              name: "Thursday",
              shortcut: "T",
              value: "Thursday",
            },
            {
              name: "Friday",
              shortcut: "F",
              value: "Friday",
            },
            {
              name: "Saturday",
              shortcut: "S",
              value: "Saturday",
            },
            {
              name: "Sunday",
              shortcut: "S",
              value: "Sunday",
            },
          ]}
          multipleSelection={false}
          selection={[itemConfig.timeTableElementDay]}
          updateSelection={(selectedItems) => {
            if (selectedItems.length > 0) {
              setItemConfig({
                ...itemConfig,
                timeTableElementDay: selectedItems[0],
              });
            }
          }}
        ></WeekdaySelection>
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
        {classesStatus === "success" && (
          <SearchSelect
            selectOptions={classes.map((element) => {
              return {
                value: element.classUUID,
                label: element.className,
              };
            })}
            onChange={(e) => {
              setItemConfig({
                ...itemConfig,
                timeTableElementClasses: e.map((element) => element.value),
              });
            }}
            icon={SvgSchool}
            selectMultiValues={true}
            selectValue={classes
              .filter((element) =>
                itemConfig.timeTableElementClasses.includes(element.classUUID)
              )
              .map((element) => {
                return {
                  value: element.classUUID,
                  label: element.className,
                };
              })}
          />
        )}
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
