import React from "react";
import { styled } from "../../../stitches.config";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { fetchCourses } from "../../../utils/requests";

export type SideDashboardProps = {};

const CourseList = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "5vh 10vw",
  gap: "50px",

  "@mobileOnly": {
    gridTemplateColumns: "1fr",
    gap: "20px",
    padding: "5vh 10vw",
  },
});

const CourseLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  margin: "20px auto",
  height: "100%",
  padding: "10px 35px",
  borderRadius: "$2x",

  backgroundColor: "$surface3",
  transition: "all 200ms ease-in-out",
  cursor: "pointer",
  placeSelf: "center",
  color: "$neutral-500",

  "&:hover": {
    backgroundColor: "$secondaryContainer",
  },

  "@mobileOnly": {
    padding: "10px 20px",
    width: "100%",
  },
});

const CourseName = styled("p", {
  width: "100%",
  margin: 0,

  fontSize: "2.2rem",
  fontWeight: "bold",
  textAlign: "left",
  lineHeight: "2.2rem",
});

const TeacherName = styled("p", {
  display: "inline-block",
  width: "100%",
  marginBottom: "10px",

  fontSize: "1.1rem",
  fontWeight: "bold",
  textAlign: "left",
});

const CourseDescription = styled("p", {
  margin: 0,

  fontSize: "0.8rem",
  textAlign: "left",
});

export const CourseSelectionList: React.FC<SideDashboardProps> = ({}) => {
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  const { data: courses, status } = useQuery(
    ["courses", schoolUUID],
    () => fetchCourses(schoolUUID),
    {
      staleTime: 20000,
    }
  );

  if (status === "error") {
    return <div>Error</div>;
  }

  if (status === "loading") {
    return (
      <>
        <CourseList>
          <Skeleton width="100%" height={150}></Skeleton>
          <Skeleton width="100%" height={150}></Skeleton>
          <Skeleton width="100%" height={150}></Skeleton>
          <Skeleton width="100%" height={150}></Skeleton>
        </CourseList>
      </>
    );
  }

  if (courses.length === 0) {
    return <>You haven&apos;t been added to any course yet.</>;
  }
  return (
    <>
      <CourseList>
        {courses &&
          courses.length > 0 &&
          courses.map((course) => (
            <CourseLayout
              key={course.courseUUID}
              onClick={() => {
                router.push(
                  `/school/${schoolUUID}/course/${course.courseUUID}`
                );
              }}
            >
              <CourseName>{course.courseName}</CourseName>
              <TeacherName>
                {course.creator.firstName + " " + course.creator.lastName}{" "}
              </TeacherName>
              <CourseDescription>{course.courseDescription}</CourseDescription>
            </CourseLayout>
          ))}
      </CourseList>
    </>
  );
};
