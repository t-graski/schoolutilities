import React, { useEffect } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";
import { InputField } from "./InputField";
import { Button } from "./Button";
import Link from "next/link";
import { regex } from "../misc/regex";
import { useRouter } from "next/router";
import { Headline } from "./Headline";
import { Separator } from "./Separator";
import validator from "validator";
import { LENGTHS, PASSWORD } from "../misc/parameterConstants";
import { Spacer } from "./Spacer";

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
  });

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
          validatorFunction={validator.isLength}
          validatorParams={[LENGTHS.NAME]}
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
          validatorFunction={validator.isLength}
          validatorParams={[LENGTHS.COURSE_DESCRIPTION]}
          setValidInput={setCourseDescriptionValid}
          errorMessage="Your course needs a description, doesn't it?"
        ></InputField>
      </CourseCreateDetailLayout>
    </>
  );
};
