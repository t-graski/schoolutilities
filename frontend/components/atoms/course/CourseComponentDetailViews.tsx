import { useState } from "react";
import CourseText from "./CourseText";
import CourseFile from "./CourseFile";
import { Headline } from "../Headline";
import { InputField } from "../input/InputField";
import moment from "moment";
import { TextField } from "../input/TextField";

export function HeadlineDetailView({
  children,
  setDetailsConfig,
  setButtonDisabled,
  config = { label: "" },
  ...props
}) {
  const [currentDetailsConfig, setCurrentDetailsConfig] = useState(config);

  return (
    <>
      <InputField
        label="Headline text"
        value={currentDetailsConfig.label}
        inputType={"text"}
        onChange={(value) => {
          setCurrentDetailsConfig({
            ...currentDetailsConfig,
            label: value,
          });
          setDetailsConfig({
            ...currentDetailsConfig,
            label: value,
          });
          setButtonDisabled(value.length === 0);
        }}
        iconName={""}
        size="small"
      ></InputField>
    </>
  );
}

export function TextDetailView({
  children,
  setDetailsConfig,
  setButtonDisabled,
  config = { text: "" },
  ...props
}) {
  const [currentDetailsConfig, setCurrentDetailsConfig] = useState(config);

  return (
    <>
      <TextField
        label="Text"
        value={currentDetailsConfig.text}
        onChange={(value) => {
          setCurrentDetailsConfig({
            ...currentDetailsConfig,
            text: value,
          });
          setDetailsConfig({
            ...currentDetailsConfig,
            text: value,
          });
          setButtonDisabled(value.length === 0);
        }}
        iconName={""}
      ></TextField>
    </>
  );
}

export function ExerciseDetailView({
  children,
  setDetailsConfig,
  setButtonDisabled,
  config = {
    name: "",
    description: "",
    dueTime: "",
    submitLater: false,
    submitLaterTime: new Date(500).toISOString(),
    maxFileSize: 1000,
    allowedFileTypes: ".jpg,.png",
  },
  ...props
}) {
  const [currentDetailsConfig, setCurrentDetailsConfig] = useState(config);

  const isoDateTime = "2012-12-12T11:01:00.000Z";
  const dateTime = moment(isoDateTime).format("YYYY-MM-DDTHH:mm");
  console.log(dateTime);

  return (
    <>
      <InputField
        label="Name"
        value={currentDetailsConfig.name}
        inputType={"text"}
        onChange={(value) => {
          setCurrentDetailsConfig({
            ...currentDetailsConfig,
            name: value,
          });
          setDetailsConfig({
            ...currentDetailsConfig,
            name: value,
          });
          setButtonDisabled(value.length === 0);
        }}
        iconName={""}
        size="small"
      ></InputField>
      <TextField
        label="Description"
        value={currentDetailsConfig.description}
        onChange={(value) => {
          setCurrentDetailsConfig({
            ...currentDetailsConfig,
            description: value,
          });
          setDetailsConfig({
            ...currentDetailsConfig,
            description: value,
          });
        }}
        iconName={""}
      ></TextField>
      <InputField
        label="Due date"
        value={moment(currentDetailsConfig.dueTime).format("YYYY-MM-DDTHH:mm")}
        inputType={"datetime-local"}
        onChange={(value) => {
          setCurrentDetailsConfig({
            ...currentDetailsConfig,
            dueTime: new Date(Date.parse(value)).toISOString(),
          });
          console.log(value);
          console.log(new Date(Date.parse(value)).toISOString());
          setDetailsConfig({
            ...currentDetailsConfig,
            dueTime: new Date(Date.parse(value)).toISOString(),
          });
        }}
        iconName={""}
        size="small"
      ></InputField>
    </>
  );
}

export const elementsToChoose: {
  id: string;
  name: string;
  detailViewComponent: React.FC<{}>;
  component: React.FC<{}>;
  props: {};
}[] = [
  {
    id: "1",
    name: "Headline",
    detailViewComponent: HeadlineDetailView,
    component: Headline,
    props: {},
  },
  {
    id: "2",
    name: "Text",
    detailViewComponent: TextDetailView,
    component: CourseText,
    props: {},
  },
  {
    id: "3",
    name: "Exercise",
    detailViewComponent: ExerciseDetailView,
    component: CourseFile,
    props: {},
  },
];
