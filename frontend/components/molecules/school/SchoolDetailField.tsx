import React, { useEffect } from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/input/InputField";
import { Headline } from "../../atoms/Headline";
import { Separator } from "../../atoms/Separator";
import { Spacer } from "../../atoms/Spacer";
import { regex } from "../../../utils/regex";
import { Select } from "../../atoms/input/Select";
import SvgSchool from "../../atoms/svg/SvgSchool";
import SvgLanguage from "../../atoms/svg/SvgLanguage";

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
  }, [schoolNameValid, schoolLanguage, schoolTimezone, isDisabled, schoolName, setDisabled, isFirstTime]);

  return (
    <>
      <SchoolDetailLayout>
        <div>
          <Headline
            label="School Setup"
            alignment="left"
            fontWeight="bold"
          ></Headline>
          <Separator width="small" alignment="left"></Separator>
        </div>
        <Spacer size="verySmall"></Spacer>
        <InputField
          label="School name"
          inputType="text"
          value={schoolName}
          onChange={setSchoolName}
          icon={SvgSchool}
          required={true}
          regex={regex.schoolName}
          setValidInput={setSchoolNameValid}
          errorMessage="Your school needs a name, doesn't it?"
        ></InputField>
        <Select
          label="Language"
          onChange={setSchoolLanguage}
          icon={SvgLanguage}
          required={true}
          selectOptions={[
            { value: "german", label: "German" },
            { value: "english", label: "English" },
          ]}
          selectValue={schoolLanguage}
        ></Select>
        <Select
          label="Timezone (GMT+0)"
          onChange={setSchoolTimezone}
          icon={SvgLanguage}
          required={true}
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
        ></Select>
      </SchoolDetailLayout>
    </>
  );
};
