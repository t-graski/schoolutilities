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
  const [schoolTimezone, setSchoolTimezone] = React.useState("");
  const [isFirstTime, setIsFirstTime] = React.useState(true);
  const [isDisabled, setIsDisabled] = React.useState(false);

  console.log(schoolTimezone);
  useEffect(() => {
    if (
      schoolNameValid &&
      schoolLanguage &&
      schoolTimezone &&
      schoolLanguage != "Language" &&
      schoolTimezone != "Timezone"
    ) {
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
        <Headline
          label="School Setup"
          alignment="left"
          fontWeight="bold"
        ></Headline>
        <Separator width="small" alignment="left"></Separator>
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
          inputType="select"
          value={schoolLanguage}
          onChange={setSchoolLanguage}
          iconSrc="/images/language_icon.svg"
          iconAlt="language_icon"
          required={true}
          errorMessage="Tell us the language you speak in your school"
          selectOptions={["Language", "English"]}
          selectValue={schoolLanguage}
        ></InputField>
        <InputField
          label="Timezone (GMT+0)"
          inputType="select"
          value={schoolTimezone}
          onChange={setSchoolTimezone}
          iconSrc="/images/timezone_icon.svg"
          iconAlt="timezone_icon"
          required={true}
          errorMessage="Try to select a timezone in the drop-down menu"
          selectOptions={[
            "Timezone",
            "GMT-11:00 (Samoa)",
            "GMT-10:00 (Hawaii)",
            "GMT-09:00 (Alaska)",
            "GMT-08:00 (Pacific Time)",
            "GMT-07:00 (Mountain Time)",
            "GMT-06:00 (Central Time)",
            "GMT-05:00 (Eastern Time)",
            "GMT-04:00 (Atlantic Time)",
            "GMT-03:30 (Newfoundland)",
            "GMT-03:00 (Brasilia)",
            "GMT-02:00 (Mid-Atlantic)",
            "GMT-01:00 (Cape Verde)",
            "GMT+00:00 (Greenwich Mean Time)",
            "GMT+01:00 (Central European Time)",
            "GMT+02:00 (Eastern European Time)",
            "GMT+03:00 (Eastern African Time)",
            "GMT+03:30 (Iran)",
            "GMT+04:00 (Western African Time)",
            "GMT+04:30 (Afghanistan)",
            "GMT+05:00 (Pakistan)",
            "GMT+05:30 (India)",
            "GMT+05:45 (India Standard Time)",
            "GMT+06:00 (Bangladesh)",
            "GMT+06:30 (Myanmar)",
            "GMT+07:00 (Indochina)",
            "GMT+08:00 (China)",
            "GMT+08:45 (Australia Western Standard Time)",
            "GMT+09:00 (Japan)",
            "GMT+09:30 (Australia Central Standard Time)",
            "GMT+10:00 (Australia Eastern Standard Time)",
            "GMT+10:30 (Lord Howe Standard Time)",
            "GMT+11:00 (Solomon Standard Time)",
            "GMT+11:30 (Norfolk Standard Time)",
            "GMT+12:00 (New Zealand Standard Time)",
            "GMT+12:45 (Chatham Standard Time)",
            "GMT+13:00 (Tonga Standard Time)",
            "GMT+14:00 (Line Islands Standard Time)",
          ]}
          selectValue={schoolTimezone}
        ></InputField>
      </SchoolDetailLayout>
    </>
  );
};
