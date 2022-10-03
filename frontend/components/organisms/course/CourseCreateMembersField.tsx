import React from "react";
import { styled } from "../../../stitches.config";
import { useRouter } from "next/router";
import { Headline } from "../../atoms/Headline";
import { Separator } from "../../atoms/Separator";
import { Spacer } from "../../atoms/Spacer";
import { SearchSelect } from "../../atoms/input/SearchSelect";
import SvgSchool from "../../atoms/svg/SvgSchool";
import { fetchSchoolClasses, fetchSchoolUsers } from "../../../utils/requests";
import { useQuery } from "react-query";

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
  color: "$neutral-500",
  marginBottom: "5px",
});

export const CourseCreateMembersField: React.FC<Props> = ({
  setDisabled,
  inputData,
  setInputData,
}) => {
  const { data: classes, status: classesStatus } = useQuery(
    "classes",
    async () => {
      const currentClasses = await fetchSchoolClasses(
        router.query.schoolUUID as string
      );
      return currentClasses.map((schoolClass) => {
        return {
          value: schoolClass.classUUID,
          label: schoolClass.className,
        };
      });
    }
  );
  const { data: members, status: membersStatus } = useQuery(
    "members",
    async () => {
      const currentMembers = await fetchSchoolUsers(
        router.query.schoolUUID as string
      );
      console.log(currentMembers);
      return currentMembers.map((member) => {
        return {
          value: member.userUUID,
          label: `${member.userLastname} ${member.userFirstname}`,
        };
      });
    }
  );

  const router = useRouter();

  setDisabled(false);

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
        <SearchSelect
          selectValue={inputData.classes}
          onChange={(e) => {
            setInputData({
              ...inputData,
              classes: e,
            });
          }}
          icon={SvgSchool}
          selectMultiValues={true}
          selectOptions={classes}
        />
        <Label>Select persons for this course:</Label>
        <SearchSelect
          selectValue={inputData.members}
          onChange={(e) => {
            console.log(e);
            setInputData({
              ...inputData,
              members: e,
            });
          }}
          icon={SvgSchool}
          selectMultiValues={true}
          selectOptions={members}
        />
      </CourseCreateDetailLayout>
    </>
  );
};
