import { styled } from "../../../../../stitches.config";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
const Navbar = dynamic(
  () => import("../../../../../components/organisms/Navbar")
);
import { Spacer } from "../../../../../components/atoms/Spacer";
import { Headline } from "../../../../../components/atoms/Headline";
import { Separator } from "../../../../../components/atoms/Separator";
import Footer from "../../../../../components/organisms/Footer";
import CourseMenu from "../../../../../components/atoms/course/CourseMenu";
import CourseContent from "../../../../../components/molecules/course/CourseContent";
import { Button } from "../../../../../components/atoms/Button";
import { useQuery } from "react-query";
import {
  fetchCourseContent,
  fetchCourses,
} from "../../../../../utils/requests";
import Skeleton from "react-loading-skeleton";
import dynamic from "next/dynamic";
import CourseContentGrades from "../../../../../components/molecules/course/CourseContentGrades";

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

  const courseUUID = router.query.courseUUID as string;
  const schoolUUID = router.query.schoolUUID as string;

  const { data: items, status: contentStatus } = useQuery(
    ["items", courseUUID],
    () => fetchCourseContent(courseUUID),
    {
      staleTime: 20000,
    }
  );
  const { data: courses, status: coursesStatus } = useQuery(
    ["courses", schoolUUID],
    async () => fetchCourses(schoolUUID),
    {
      staleTime: 20000,
    }
  );

  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if (contentStatus === "loading" || coursesStatus === "loading") {
    return (
      <>
        <Head>
          <title>Course - SchoolUtilities</title>
        </Head>
        <Navbar></Navbar>
        <Spacer size="small"></Spacer>
        <ContentLayout>
          <HeadlineLayout>
            <Skeleton width={300} height={60}></Skeleton>
          </HeadlineLayout>
          <Spacer size="verySmall"></Spacer>
          <Separator width="small" alignment="left" />
          <Spacer size="verySmall"></Spacer>
          <Skeleton
            width={`${getRandomNumber(70, 100)}%`}
            height={getRandomNumber(40, 80)}
          ></Skeleton>
          <Spacer size="verySmall"></Spacer>
          <Skeleton
            width={`${getRandomNumber(70, 100)}%`}
            height={getRandomNumber(40, 80)}
          ></Skeleton>
          <Spacer size="verySmall"></Spacer>
          <Skeleton
            width={`${getRandomNumber(70, 100)}%`}
            height={getRandomNumber(40, 80)}
          ></Skeleton>
          <Spacer size="verySmall"></Spacer>
          <Skeleton
            width={`${getRandomNumber(70, 100)}%`}
            height={getRandomNumber(40, 80)}
          ></Skeleton>
          <Spacer size="verySmall"></Spacer>
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

  if (contentStatus === "error" || coursesStatus === "error") {
    return <div>Error</div>;
  }

  const { courseName } = courses.find(
    (currCourse) => currCourse.courseUUID === courseUUID
  );

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
        </HeadlineLayout>
        <Separator width="small" alignment="left" />
        <Spacer size="verySmall"></Spacer>
        <CourseContentGrades items={items}></CourseContentGrades>
        {items.length == 0 && (
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
            router.push(`/school/${schoolUUID}/course/${courseUUID}/`);
          }}
        >
          Back to course
        </Button>
      </ContentLayout>
      <Footer></Footer>
    </>
  );
}