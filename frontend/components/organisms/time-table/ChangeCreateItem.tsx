import React, { useState } from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/input/InputField";
import { TimeTableItemType } from "../../atoms/TimeTableItem";

type Props = {
  timeTableElement: TimeTableItemType;
  setTimeTableElement: React.Dispatch<React.SetStateAction<TimeTableItemType>>;
};

const InputFieldsLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr",
});

const InputFieldLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
});

export const ChangeCreateItem: React.FC<Props> = ({}) => {
  const [itemConfig, setItemConfig] = useState<any>({
    timeTableElementStartTime: "",
    timeTableElementEndTime: "",
    schoolSubject: {
      schoolSubjectUUID: "",
      schoolSubjectName: "",
      schoolSubjectAbbreviation: "",
    },
    teachers: [],
    classes: [],
  });

  return (
    <>
      <InputFieldsLayout>
        <InputFieldLayout>
          <InputField
            label="Name"
            value={itemConfig.schoolSubjectName}
            inputType={"text"}
            onChange={(event) => {
              setItemConfig({
                ...itemConfig,
                schoolSubjectName: event,
              });
            }}
          ></InputField>
        </InputFieldLayout>
        <InputFieldLayout>
          <InputField
            label="Start Time"
            value={itemConfig.startTime}
            inputType={"time"}
            onChange={(event) => {
              setItemConfig({
                ...itemConfig,
                startTime: event,
              });
            }}
          ></InputField>
        </InputFieldLayout>
        <InputFieldLayout>
          <InputField
            label="End Time"
            value={itemConfig.endTime}
            inputType={"time"}
            onChange={(event) => {
              setItemConfig({
                ...itemConfig,
                endTime: event,
              });
            }}
          ></InputField>
        </InputFieldLayout>
      </InputFieldsLayout>
    </>
  );
};
