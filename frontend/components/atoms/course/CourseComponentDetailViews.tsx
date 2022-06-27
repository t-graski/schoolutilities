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
  config = { label: "", weight: 1 },
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
        icon={""}
        size="small"
      ></InputField>
      <InputField
        label="Weight"
        value={currentDetailsConfig.weight}
        inputType={"number"}
        onChange={(value) => {
          setCurrentDetailsConfig({
            ...currentDetailsConfig,
            weight: Number(value),
          });
          setDetailsConfig({
            ...currentDetailsConfig,
            weight: Number(value),
          });
          setButtonDisabled(
            currentDetailsConfig.label.length === 0 || value <= 0
          );
        }}
        icon={""}
        size="small"
      ></InputField>
    </>
  );
}

export function TextDetailView({
  children,
  setDetailsConfig,
  setButtonDisabled,
  config = { text: "", weight: 1 },
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
      ></TextField>
      <InputField
        label="Weight"
        value={currentDetailsConfig.weight}
        inputType={"number"}
        onChange={(value) => {
          setCurrentDetailsConfig({
            ...currentDetailsConfig,
            weight: Number(value),
          });
          setDetailsConfig({
            ...currentDetailsConfig,
            weight: Number(value),
          });
          setButtonDisabled(
            currentDetailsConfig.text.length === 0 || value <= 0
          );
        }}
        icon={""}
        size="small"
      ></InputField>
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
    allowedFileTypes: ".jpg,.png,.zip",
    weight: 1,
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
        size="small"
      ></InputField>
      <InputField
        label="Weight"
        value={currentDetailsConfig.weight}
        inputType={"number"}
        onChange={(value) => {
          setCurrentDetailsConfig({
            ...currentDetailsConfig,
            weight: Number(value),
          });
          setDetailsConfig({
            ...currentDetailsConfig,
            weight: Number(value),
          });
          setButtonDisabled(
            currentDetailsConfig.name.length === 0 || value <= 0
          );
        }}
        icon={""}
        size="small"
      ></InputField>
    </>
  );
}

export const elementsToChoose: {
  id: number;
  name: string;
  detailViewComponent: React.FC<{}>;
  component: React.FC<{}>;
  props: {};
}[] = [
  {
    id: 1,
    name: "Headline",
    detailViewComponent: HeadlineDetailView,
    component: Headline,
    props: {},
  },
  {
    id: 2,
    name: "Text",
    detailViewComponent: TextDetailView,
    component: CourseText,
    props: {},
  },
  {
    id: 3,
    name: "Exercise",
    detailViewComponent: ExerciseDetailView,
    component: CourseFile,
    props: {},
  },
];
