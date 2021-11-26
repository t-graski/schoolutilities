import React, { useEffect } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";
import { InputField } from "./InputField";
import { Button } from "./Button";
import Link from "next/link";
import { regex } from "../misc/regex";
import { useRouter } from "next/router";

type Props = {
  setDisabled: Function;
};

const SchoolDetailLayout = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

export const SchoolDetailField: React.FC<Props> = ({ setDisabled }) => {
  const [schoolName, setSchoolName] = React.useState("");
  const [schoolNameValid, setSchoolNameValid] = React.useState(false);
  const [schoolLanguage, setSchoolLanguage] = React.useState("");
  const [schoolLanguageValid, setSchoolLanguageValid] = React.useState(false);
  const [schoolTimezone, setSchoolTimezone] = React.useState("");
  const [schoolTimezoneValid, setSchoolTimezoneValid] = React.useState(false);
  const [isFirstTime, setIsFirstTime] = React.useState(true);
  const [isDisabled, setIsDisabled] = React.useState(false);

  useEffect(() => {
    if (schoolNameValid && schoolLanguageValid && schoolTimezoneValid) {
      if (isDisabled) {
        setIsDisabled(false);
        setDisabled(false);
      }
      localStorage.setItem(
        "schoolDetails",
        JSON.stringify({
          schoolName,
          schoolLanguage,
          schoolTimezone,
        })
      );
    } else {
      const schoolDetails = JSON.parse(localStorage.getItem("schoolDetails"));
      console.log(schoolDetails);
      if (schoolDetails && isFirstTime) {
        setSchoolName(schoolDetails.schoolName);
        setSchoolLanguage(schoolDetails.schoolLanguage);
        setSchoolTimezone(schoolDetails.schoolTimezone);
        // check if all values are valid
        if (
          schoolDetails.schoolName &&
          schoolDetails.schoolLanguage &&
          schoolDetails.schoolTimezone
        ) {
          setSchoolNameValid(true);
          setSchoolLanguageValid(true);
          setSchoolTimezoneValid(true);
        }
      } else if (!isDisabled) {
        setIsDisabled(true);
        setDisabled(true);
      }
      setIsFirstTime(false);
    }
  });

  return (
    <>
      <SchoolDetailLayout>
        <InputField
          label="School name"
          inputType="text"
          value={schoolName}
          onChange={setSchoolName}
          iconSrc="/images/school_name_icon.svg"
          iconAlt="school_name_icon"
          required={true}
          regex={regex.name}
          setValidInput={setSchoolNameValid}
          errorMessage="Your school needs a name, doesn't it?"
        ></InputField>
        <InputField
          label="Language"
          inputType="text"
          value={schoolLanguage}
          onChange={setSchoolLanguage}
          iconSrc="/images/language_icon.svg"
          iconAlt="language_icon"
          required={true}
          regex={regex.name}
          setValidInput={setSchoolLanguageValid}
          errorMessage="Tell us the language you speak in your school"
        ></InputField>
        <InputField
          label="Timezone (GMT+0)"
          inputType="text"
          value={schoolTimezone}
          onChange={setSchoolTimezone}
          iconSrc="/images/timezone_icon.svg"
          iconAlt="timezone_icon"
          required={true}
          regex={regex.name}
          setValidInput={setSchoolTimezoneValid}
          errorMessage="Try to select a timezone in the drop-down menu"
        ></InputField>
      </SchoolDetailLayout>
    </>
  );
};
