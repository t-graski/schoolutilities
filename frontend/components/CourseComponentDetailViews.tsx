import { useState } from "react";
import CourseText from "./CourseText";
import { Headline } from "./Headline";
import { InputField } from "./InputField";

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
      <InputField
        label="Text"
        value={currentDetailsConfig.text}
        inputType={"textfield"}
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
];
