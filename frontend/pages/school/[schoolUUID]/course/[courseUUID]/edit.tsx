import { styled } from "../../../../stitches.config";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Navbar } from "../../../../components/Navbar";
import { Spacer } from "../../../../components/Spacer";
import { Headline } from "../../../../components/Headline";
import { Separator } from "../../../../components/Separator";
import { Footer } from "../../../../components/Footer";
import { getAccessToken } from "../../../../misc/authHelper";
import { SvgIcon } from "../../../../components/SvgIcon";
import CourseMenu from "../../../../components/CourseMenu";
import { InputField } from "../../../../components/InputField";
import validator from "validator";
import { LENGTHS, PASSWORD } from "../../../../misc/parameterConstants";

const ContentLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "35px",
  padding: "50px 10vw",
});

const HeadlineLayout = styled("div", {});

const IconLayout = styled("div", {
  width: "40px",
});

const Label = styled("label", {
  fontSize: "20px",
  color: "$fontPrimary",
  marginBottom: "5px",
});

export default function Features() {
  const router = useRouter();

  const [inputData, setInputData] = useState({
    courseName: "",
    courseDescription: "",
    classes: [],
    persons: [],
  });
  const [courseNameValid, setCourseNameValid] = React.useState(false);
  const [courseDescriptionValid, setCourseDescriptionValid] =
    React.useState(true);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [courseDataValid, setCourseDataValid] = React.useState(true);
  const [isFirstTime, setIsFirstTime] = React.useState(true);

  useEffect(() => {
    requestDataFromDatabase();
  });
console.log(inputData);
  async function requestDataFromDatabase() {
    const { courseUUID } = router.query;
    let accessToken = await getAccessToken();
    if (courseUUID && accessToken && isFirstTime) {
      const courseResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/getCourseInfo/${courseUUID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (courseResponse) {
        if (courseResponse.status == 200) {
          const courseData = await courseResponse.json();
          setInputData(courseData);
          for (let key in courseData) {
            setInputData(courseData[key]);
          }
        } else {
          setCourseDataValid(false);
        }
        setIsFirstTime(false);
      }

    } else if (!accessToken) {
      router.push("/auth?tab=login");
    }
  }

  return (
    <>
      <Head>
        <title>Features - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <ContentLayout>
        <HeadlineLayout>
          <Headline
            width="content"
            label="Edit course"
            alignment="left"
          ></Headline>
          <Separator width="small" alignment="left" />
        </HeadlineLayout>
        <InputField
          label={inputData.courseName}
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
          label={inputData.courseDescription}
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
        <Label>Select persons for this course:</Label>
        <InputField
          label="Persons"
          inputType="search-select"
          selectValue={inputData.persons}
          onChange={(e) => {
            console.log(e);
            setInputData({
              ...inputData,
              persons: e,
            });
          }}
          iconName="SvgSchool"
          selectMultiValues={true}
          required={false}
          selectOptions={inputData.persons}
        />
      </ContentLayout>
      <Footer></Footer>
    </>
  );
}
