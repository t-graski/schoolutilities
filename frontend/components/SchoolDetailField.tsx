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
          selectOptions={[
            { value: "", label: "Language" },
            { value: "english", label: "English" },
          ]}
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
            { value: "", label: "Timezone" },
            { value: "GMT+0", label: "GMT+0" },
            { value: "GMT+1", label: "GMT+1" },
            { value: "GMT+2", label: "GMT+2" },
            { value: "GMT+0", label: "Africa/Accra" },
            { value: "GMT+1", label: "Africa/Cairo" },
            { value: "GMT+2", label: "Africa/Johannesburg" },
            { value: "GMT+3", label: "Africa/Nairobi" },
            { value: "GMT+4", label: "Asia/Baghdad" },
            { value: "GMT+5", label: "Asia/Karachi" },
            { value: "GMT+6", label: "Asia/Dhaka" },
            { value: "GMT+7", label: "Asia/Bangkok" },
            { value: "GMT+8", label: "Asia/Hong_Kong" },
            { value: "GMT+9", label: "Asia/Tokyo" },
            { value: "GMT+10", label: "Australia/Sydney" },
            { value: "GMT+11", label: "Pacific/Auckland" },
            { value: "GMT+12", label: "Pacific/Fiji" },
          ]}
          selectValue={schoolTimezone}
        ></InputField>
      </SchoolDetailLayout>
    </>
  );
};
