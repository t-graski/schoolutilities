import { styled } from "../../../../../stitches.config";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Navbar } from "../../../../../components/Navbar";
import { Spacer } from "../../../../../components/Spacer";
import { Headline } from "../../../../../components/Headline";
import { Separator } from "../../../../../components/Separator";
import { Footer } from "../../../../../components/Footer";
import { getAccessToken } from "../../../../../misc/authHelper";
import { SvgIcon } from "../../../../../components/SvgIcon";
import CourseMenu from "../../../../../components/CourseMenu";
import CourseEditContent from "../../../../../components/CourseEditContent";
import CourseContent from "../../../../../components/CourseContent";

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

const IconLayout = styled("div", {
  width: "40px",
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
    } else if (!accessToken) {
      router.push("/auth?tab=login");
    }
  }
  const [items, setItems] = useState([]);
  const [itemsCounter, setItemsCounter] = useState(0);

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
        <CourseContent
          courseId={courseUUID}
          items={items}
          setItems={setItems}
        ></CourseContent>
      </ContentLayout>
      <Footer></Footer>
    </>
  );
}
