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
import { useQuery } from "react-query";

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

async function fetchCourse(courseUUID) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/getCourseInfo/${courseUUID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  for (let key in data) {
    return data[key];
  }

  throw new Error("No course found");
}

async function fetchCourseContent(courseUUID) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/courseElements/${courseUUID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export default function Features() {
  const router = useRouter();

  const courseUUID = router.query.courseUUID as string;
  const schoolUUID = router.query.schoolUUID as string;

  const { data: items, status: contentStatus } = useQuery(
    ["items", courseUUID],
    () => fetchCourseContent(courseUUID)
  );
  const { data: course, status: courseStatus } = useQuery(
    ["course", courseUUID],
    () => fetchCourse(courseUUID)
  );

  if (contentStatus === "loading" || courseStatus === "loading") {
    return null;
  }

  if (contentStatus === "error" || courseStatus === "error") {
    return <div>Error</div>;
  }

  const { courseName, canEdit } = course;

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
          {canEdit && <CourseMenu courseId={courseUUID}></CourseMenu>}
        </HeadlineLayout>
        <Separator width="small" alignment="left" />
        <Spacer size="verySmall"></Spacer>
        <CourseContent items={items}></CourseContent>
        {items.length == 0 && canEdit && (
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
            >
              Add elements
            </Button>
            <Spacer size="small"></Spacer>
          </>
        )}
        {items.length == 0 && !canEdit && (
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
        >
          Back to courses
        </Button>
      </ContentLayout>
      <Footer></Footer>
    </>
  );
}
