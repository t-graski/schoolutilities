import React, { useEffect } from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/input/InputField";
import { Headline } from "../../atoms/Headline";
import { Separator } from "../../atoms/Separator";
import { Spacer } from "../../atoms/Spacer";
import { regex } from "../../../utils/regex";

type Props = {
  setDisabled: Function;
  inputData: {
    courseName: string;
    courseDescription: string;
    classes: string[];
    members: string[];
  };
  setInputData: Function;
};

const CourseCreateDetailLayout = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

export const CourseCreateDetailField: React.FC<Props> = ({
  setDisabled,
  inputData,
  setInputData,
}) => {
  const [courseNameValid, setCourseNameValid] = React.useState(false);
  const [courseDescriptionValid, setCourseDescriptionValid] =
    React.useState(true);
  const [isDisabled, setIsDisabled] = React.useState(true);

  useEffect(() => {
    if (courseNameValid && courseDescriptionValid) {
      if (isDisabled) {
        setIsDisabled(false);
        setDisabled(false);
        console.log("asdf");
      }
    } else {
      if (!isDisabled) {
        setIsDisabled(true);
        setDisabled(true);
      }
    }
  }, [courseNameValid, courseDescriptionValid, isDisabled, setDisabled]);

  return (
    <>
      <CourseCreateDetailLayout>
        <div>
          <Headline
            label="Course Setup"
            alignment="left"
            fontWeight="bold"
          ></Headline>
          <Separator width="small" alignment="left"></Separator>
        </div>
        <Spacer size="verySmall"></Spacer>
        <InputField
          label="Course name"
          inputType="text"
          value={inputData.courseName}
          onChange={(e) => {
            setInputData({ ...inputData, courseName: e });
          }}
          iconName="SvgSchool"
          required={true}
          regex={regex.schoolName}
          setValidInput={setCourseNameValid}
          errorMessage="Your course needs a name, doesn't it?"
        ></InputField>
        <InputField
          label="Course description"
          inputType="text"
          value={inputData.courseDescription}
          onChange={(e) => {
            setInputData({ ...inputData, courseDescription: e });
          }}
          iconName="SvgSchool"
          required={false}
          setValidInput={setCourseDescriptionValid}
          errorMessage="Your course needs a description, doesn't it?"
        ></InputField>
      </CourseCreateDetailLayout>
    </>
  );
};
