import { styled } from "../../../../../stitches.config";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Navbar } from "../../../../../components/organisms/Navbar";
import { Spacer } from "../../../../../components/atoms/Spacer";
import { Headline } from "../../../../../components/atoms/Headline";
import { Separator } from "../../../../../components/atoms/Separator";
import Footer from "../../../../../components/organisms/Footer";
import { getAccessToken } from "../../../../../utils/authHelper";
import { InputField } from "../../../../../components/atoms/input/InputField";
import { Button } from "../../../../../components/atoms/Button";
import { regex } from "../../../../../utils/regex";
import { SearchSelect } from "../../../../../components/atoms/input/SearchSelect";
import SvgSchool from "../../../../../components/atoms/svg/SvgSchool";

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

const ButtonLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  gap: "10px",
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
  const [courseDataValid, setCourseDataValid] = React.useState(true);
  const [classes, setClasses] = useState([]);
  const [persons, setPersons] = useState([]);
  const [isFirstTime, setIsFirstTime] = React.useState(true);
  const schoolUUID = router.query.schoolUUID as string;
  const courseUUID = router.query.courseUUID as string;

  useEffect(() => {
    requestDataFromDatabase();
  });
  async function requestDataFromDatabase() {
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
          let courseData = await courseResponse.json();
          setInputData(courseData);
          for (let key in courseData) {
            courseData[key].persons = courseData[key].persons.map((person) => {
              return {
                value: person.personUUID,
                label: `${person.lastName} ${person.firstName}`,
              };
            });
            courseData[key].classes = courseData[key].classes.map(
              (schoolClass) => {
                return {
                  value: schoolClass.classUUID,
                  label: schoolClass.className,
                };
              }
            );
            setInputData(courseData[key]);
          }
        } else {
          setCourseDataValid(false);
        }
        setIsFirstTime(false);
      }
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
      const personResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/getPersons/${schoolUUID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const personData = await personResponse.json();
      setPersons(
        personData.map((person) => {
          return {
            value: person.personUUID,
            label: `${person.lastName} ${person.firstName}`,
          };
        })
      );
    } else if (!accessToken) {
      router.push("/auth?tab=login");
    }
  }

  return (
    <>
      <Head>
        <title>
          {!isFirstTime ? inputData.courseName : "Course description"} -
          SchoolUtilities
        </title>
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
          icon={SvgSchool}
          required={true}
          regex={regex.schoolName}
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
          icon={SvgSchool}
          required={false}
          setValidInput={setCourseDescriptionValid}
          errorMessage="Your course needs a description, doesn't it?"
        ></InputField>
        {persons && inputData.persons && (
          <>
            <Label>Select persons for this course:</Label>
            <SearchSelect
              selectValue={inputData.persons}
              onChange={(e) => {
                console.log(e);
                setInputData({
                  ...inputData,
                  persons: e,
                });
              }}
              icon={SvgSchool}

              selectMultiValues={true}
              selectOptions={persons}
            />
          </>
        )}
        {classes && inputData.classes && (
          <>
            <Label>Select classes for this course:</Label>
            <SearchSelect
              selectValue={inputData.classes}
              onChange={(e) => {
                console.log(e);
                setInputData({
                  ...inputData,
                  classes: e,
                });
              }}
              icon={SvgSchool}
              selectMultiValues={true}
              selectOptions={classes}
            />
          </>
        )}
        <Spacer size="verySmall"></Spacer>
        <ButtonLayout>
          <Button
            onClick={() => {
              router.push(`/school/${schoolUUID}/course/${courseUUID}`);
            }}
            backgroundColor={"secondary"}
            color={"primary"}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              let accessToken = await getAccessToken();
              if (courseUUID && accessToken) {
                console.log(
                  JSON.stringify({
                    courseName: inputData.courseName,
                    courseDescription: inputData.courseDescription,
                    persons: inputData.persons.map(
                      (dataInfo) => dataInfo.value
                    ),
                    classes: inputData.classes.map(
                      (dataInfo) => dataInfo.value
                    ),
                  })
                );
                const response = await fetch(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/updateCourse`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                      courseUUID: courseUUID,
                      courseName: inputData.courseName,
                      courseDescription: inputData.courseDescription,
                      persons: inputData.persons.map(
                        (dataInfo) => dataInfo.value
                      ),
                      classes: inputData.classes.map(
                        (dataInfo) => dataInfo.value
                      ),
                    }),
                  }
                );
                console.log(response);
                if (response.status == 200) {
                  router.push(`/school/${schoolUUID}/course/${courseUUID}`);
                } else {
                  setCourseDataValid(false);
                }
              } else if (!accessToken) {
                router.push("/auth?tab=login");
              }
            }}
            backgroundColor={"primary"}
            color={"primary"}
          >
            Save
          </Button>
        </ButtonLayout>
      </ContentLayout>
      <Footer></Footer>
    </>
  );
}
