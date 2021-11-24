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
  const [isDisabled, setIsDisabled] = React.useState(false);

  useEffect(() => {
    if (schoolNameValid && schoolLanguageValid && schoolTimezoneValid) {
      if (isDisabled) {
        setIsDisabled(false);
        setDisabled(false);
      }
      // save schoolName, schoolLanguage, schoolTimezone as schoolDetails with to localStorage
      localStorage.setItem("schoolDetails", JSON.stringify({
        schoolName,
        schoolLanguage,
        schoolTimezone
      }));
    } else if (!isDisabled) {
      setIsDisabled(true);
      setDisabled(true);
    }
  });

  return (
    <>
      <SchoolDetailLayout>
        <InputField
          label="Name"
          inputType="text"
          value={schoolName}
          onChange={setSchoolName}
          iconSrc="/images/user.svg"
          iconAlt=""
          required={true}
          regex={regex.name}
          setValidInput={setSchoolNameValid}
          errorMessage="Please enter a valid name"
        ></InputField>
        <InputField
          label="Language"
          inputType="text"
          value={schoolLanguage}
          onChange={setSchoolLanguage}
          iconSrc="/images/user.svg"
          iconAlt=""
          required={true}
          regex={regex.name}
          setValidInput={setSchoolLanguageValid}
          errorMessage="Please enter a valid language"
        ></InputField>
        <InputField
          label="Timezone (GMT+0)"
          inputType="text"
          value={schoolTimezone}
          onChange={setSchoolTimezone}
          iconSrc="/images/user.svg"
          iconAlt=""
          required={true}
          regex={regex.name}
          setValidInput={setSchoolTimezoneValid}
          errorMessage="Please enter a valid Timezone"
        ></InputField>
      </SchoolDetailLayout>
    </>
  );
};
