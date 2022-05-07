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
import CourseMenu from "../../../../../components/atoms/course/CourseMenu";
import CourseContent from "../../../../../components/molecules/course/CourseContent";
import { Button } from "../../../../../components/atoms/Button";

const ContentLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "50px 10vw",
});

const HeadlineLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "40px",
  justifyContent: "flex-start",
  alignItems: "center",
});

export default function Features() {
  const router = useRouter();

  const [courseName, setCourseName] = useState("");
  const [courseUUID, setCourseUUID] = useState("");
  const [schoolUUID, setSchoolUUID] = useState("");
  const [canEditCourse, setCanEditCourse] = useState(false);

  useEffect(() => {
    requestDataFromDatabase();
  });

  async function requestDataFromDatabase() {
    if (!Array.isArray(router.query.courseUUID)) {
      setCourseUUID(router.query.courseUUID);
    }
    if (!Array.isArray(router.query.schoolUUID)) {
      setSchoolUUID(router.query.schoolUUID);
    }
    let accessToken = await getAccessToken();
    if (courseUUID && accessToken && courseName == "") {
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
          for (let key in courseData) {
            setCourseName(courseData[key].courseName);
            setCanEditCourse(courseData[key].canEdit);
          }
        } else {
          setCourseName("Database error");
        }
      }
      const elementsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/courseElements/${courseUUID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (elementsResponse) {
        if (elementsResponse.status == 200) {
          const courseData = await elementsResponse.json();
          console.log(courseData);
          setItems(courseData);
        } else {
          setCourseName("Database error");
        }
      }
    } else if (!accessToken) {
      router.push("/auth?tab=login");
    }
  }
  const [items, setItems] = useState([]);

  return (
    <>
      <Head>
        <title>{courseName ? courseName : "Course"} - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="small"></Spacer>
      <ContentLayout>
        <HeadlineLayout>
          <Headline
            width="content"
            label={courseName}
            alignment="left"
          ></Headline>
          {canEditCourse && <CourseMenu courseId={courseUUID}></CourseMenu>}
        </HeadlineLayout>
        <Separator width="small" alignment="left" />
        <Spacer size="verySmall"></Spacer>
        <CourseContent items={items}></CourseContent>
        {items.length == 0 && canEditCourse && (
          <>
            <p>No elements in this course yet</p>
            <Spacer size="small"></Spacer>
            <Button
              onClick={() => {
                router.push(
                  `/school/${schoolUUID}/course/${courseUUID}/elements`
                );
              }}
              backgroundColor={"primary"}
              color={"primary"}
            >Add elements</Button>
            <Spacer size="small"></Spacer>
          </>
        )}
        {items.length == 0 && !canEditCourse && (
          <>
            <p>
              The administrator of this site hasn&apos;t added elements to this
              course yet
            </p>
            <Spacer size="small"></Spacer>
          </>
        )}
        <Spacer size="small"></Spacer>
        <Button
          backgroundColor={"primary"}
          color={"primary"}
          onClick={() => {
            router.push(`/school/${schoolUUID}/course`);
          }}
        >Back to courses</Button>
      </ContentLayout>
      <Footer></Footer>
    </>
  );
}
