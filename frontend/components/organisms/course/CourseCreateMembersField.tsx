import React, { useEffect, useState } from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/InputField";
import { useRouter } from "next/router";
import { Headline } from "../../atoms/Headline";
import { Separator } from "../../atoms/Separator";
import { Spacer } from "../../atoms/Spacer";
import { getAccessToken } from "../../../misc/authHelper";

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

const Label = styled("label", {
  fontSize: "20px",
  color: "$fontPrimary",
  marginBottom: "5px",
});

export const CourseCreateMembersField: React.FC<Props> = ({
  setDisabled,
  inputData,
  setInputData,
}) => {
  const [classes, setClasses] = useState([]);
  const [members, setMembers] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const router = useRouter();

  setDisabled(false);

  useEffect(() => {
    if (isFirstTime) {
      fetchSelectData();
      setIsFirstTime(false);
    }

    async function fetchSelectData() {
      let accessToken = await getAccessToken();
      const schoolUUID = router.query.schoolUUID as string;
      const classResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/classes/${schoolUUID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const classData = await classResponse.json();
      console.log(classData);
      if (classData.length > 0) {
        setClasses(
          classData.map((schoolClass) => {
            return {
              value: schoolClass.classUUID,
              label: schoolClass.className,
            };
          })
        );
      }
      const memberResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/getPersons/${schoolUUID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const memberData = await memberResponse.json();
      setMembers(
        memberData.map((member) => {
          return {
            value: member.personUUID,
            label: `${member.lastName} ${member.firstName}`,
          };
        })
      );
    }
  }, [isFirstTime, router.query.schoolUUID]);

  return (
    <>
      <CourseCreateDetailLayout>
        <div>
          <Headline
            label="Members selection"
            alignment="left"
            fontWeight="bold"
          ></Headline>
          <Separator width="small" alignment="left"></Separator>
        </div>
        <Spacer size="verySmall"></Spacer>
        <Label>Select classes for this course:</Label>
        <InputField
          label="Classes"
          inputType="search-select"
          selectValue={inputData.classes}
          onChange={(e) => {
            setInputData({
              ...inputData,
              classes: e,
            });
          }}
          iconName="SvgSchool"
          selectMultiValues={true}
          required={false}
          selectOptions={classes}
        />
        <Label>Select persons for this course:</Label>
        <InputField
          label="Persons"
          inputType="search-select"
          selectValue={inputData.members}
          onChange={(e) => {
            console.log(e);
            setInputData({
              ...inputData,
              members: e,
            });
          }}
          iconName="SvgSchool"
          selectMultiValues={true}
          required={false}
          selectOptions={members}
        />
      </CourseCreateDetailLayout>
    </>
  );
};
