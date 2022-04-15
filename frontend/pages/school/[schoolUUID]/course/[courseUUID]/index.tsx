import { styled } from "../../../../../stitches.config";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Navbar } from "../../../../../components/organisms/Navbar";
import { Spacer } from "../../../../../components/atoms/Spacer";
import { Headline } from "../../../../../components/atoms/Headline";
import { Separator } from "../../../../../components/atoms/Separator";
import Footer from "../../../../../components/organisms/Footer";
import { getAccessToken } from "../../../../../misc/authHelper";
import CourseMenu from "../../../../../components/atoms/CourseMenu";
import CourseContent from "../../../../../components/molecules/course/CourseContent";

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

  useEffect(() => {
    requestDataFromDatabase();
  });

  async function requestDataFromDatabase() {
    const { courseUUID } = router.query;
    if (!Array.isArray(courseUUID)) {
      setCourseUUID(courseUUID);
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
      <Spacer size="medium"></Spacer>
      <ContentLayout>
        <HeadlineLayout>
          <Headline
            width="content"
            label={courseName}
            alignment="left"
          ></Headline>
          <CourseMenu courseId={courseUUID}></CourseMenu>
        </HeadlineLayout>
        <Separator width="small" alignment="left" />
        <Spacer size="verySmall"></Spacer>
        <CourseContent items={items}></CourseContent>
      </ContentLayout>
      <Footer></Footer>
    </>
  );
}
