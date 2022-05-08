import React from "react";
import { styled } from "../../../stitches.config";
import { getAccessToken } from "../../../utils/authHelper";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";

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
  borderRadius: "35px",

  backgroundColor: "$backgroundTertiary",
  transition: "all 200ms ease-in-out",
  cursor: "pointer",
  placeSelf: "center",
  color: "$fontPrimary",

  "&:hover": {
    opacity: "0.8",
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

async function fetchCourses(schoolUUID) {
  let accessToken = await getAccessToken();
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/getCourses/${schoolUUID}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export const CourseSelectionList: React.FC<SideDashboardProps> = ({}) => {
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  const { data: courses, status } = useQuery(["courses", schoolUUID], () =>
    fetchCourses(schoolUUID)
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
