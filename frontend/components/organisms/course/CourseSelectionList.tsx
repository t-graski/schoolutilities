import React, { useEffect, useState } from "react";
import { styled } from "../../../stitches.config";
import { getAccessToken } from "../../../misc/authHelper";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";

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
  "&:hover": {
    backgroundColor: "$backgroundTertiary",
    color: "$fontSecondary",
  },
  cursor: "pointer",
  placeSelf: "center",
  color: "$fontPrimary",

  "@mobileOnly": {
    padding: "10px 20px",
    width: "100%",
  },
});

const CourseName = styled("p", {
  fontSize: "2.2rem",
  fontWeight: "bold",
  width: "100%",
  textAlign: "left",
  lineHeight: "2.2rem",
  margin: 0,
});

const TeacherName = styled("p", {
  display: "inline-block",
  fontSize: "1.1rem",
  fontWeight: "bold",
  width: "100%",
  textAlign: "left",
  marginBottom: "10px",
});

const CourseDescription = styled("p", {
  fontSize: "0.8rem",
  textAlign: "left",
  margin: 0,
});

export const CourseSelectionList: React.FC<SideDashboardProps> = ({ }) => {
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID;
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    updateCoursesFromDatabase();
  }, [schoolUUID]);

  async function updateCoursesFromDatabase() {
    let accessToken = await getAccessToken();
    if (!accessToken) {
      router.push("/auth?tab=login&redirect=/school/course");
    } else {
      if (schoolUUID) {
        let response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/getCourses/${schoolUUID}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        let fetchedCourses = await response.json();
        console.log(response);
        setCourses(fetchedCourses);
      }
    }
  }

  return (
    <>
      <CourseList>
        {courses.length > 0 ? courses.map((course) => (
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
        )) : (
          <>
            <Skeleton width="100%" height={150}></Skeleton>
            <Skeleton width="100%" height={150}></Skeleton>
            <Skeleton width="100%" height={150}></Skeleton>
            <Skeleton width="100%" height={150}></Skeleton>
          </>
        )
        }
      </CourseList>
    </>
  );
};
