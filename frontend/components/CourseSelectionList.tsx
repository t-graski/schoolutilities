import React, { useEffect, useState } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import Link from "next/link";
import { SvgIcon } from "./SvgIcon";
import { getAccessToken } from "../misc/authHelper";
import { LoadingAnimation } from "./LoadingAnimation";
import cookie from "js-cookie";
import { useRouter } from "next/router";

export type SideDashboardProps = {};

const CourseList = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "5vh 10vw",
  gap: "50px",
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
    backgroundColor: "$backgroundSecondary",
  },
  cursor: "pointer",
  placeSelf: "center",
});

const CourseName = styled("p", {
  fontSize: "2.2rem",
  fontWeight: "bold",
  width: "100%",
  textAlign: "left",
  lineHeight: "2.2rem",
  margin: 0,
  color: "$fontPrimary",
});

const TeacherName = styled("p", {
  display: "inline-block",
  fontSize: "1.1rem",
  fontWeight: "bold",
  width: "100%",
  textAlign: "left",
  marginBottom: "10px",
  color: "$fontPrimary",
});

const CourseDescription = styled("p", {
  fontSize: "0.8rem",
  textAlign: "left",
  margin: 0,
  color: "$fontPrimary",
});

export const CourseSelectionList: React.FC<SideDashboardProps> = ({}) => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  useEffect(() => {
    updateCoursesFromDatabase();
  }, []);
  const router = useRouter();

  async function updateCoursesFromDatabase() {
    let accessToken = await getAccessToken();
    if (!accessToken) {
      router.push("/auth?tab=login&redirect=/school/course");
    } else if (!router.query.schoolUUID) {
      router.push("/school/select?redirect=/course");
    } else {
      setIsLoading(true);
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/getCourses/${
          router.query.schoolUUID as string
        }`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      let fetchedCourses = await response.json();
      setIsLoading(false);
      console.log(response);
      setCourses(fetchedCourses);
    }
  }

  return (
    <>
      <LoadingAnimation isVisible={isLoading} />
      <CourseList>
        {Array.isArray(courses) &&
          courses.map((course) => (
            <CourseLayout
              key={course.courseUUID}
              onClick={() => {
                router.push(
                  `/school/${router.query.schoolUUID as string}/course/${
                    course.courseUUID
                  }`
                );
              }}
            >
              <CourseName>{course.courseName}</CourseName>
              <TeacherName>{"Elisabeth Rumetshofer"}</TeacherName>
              <CourseDescription>
                {"lorem ipsum dolor ate male itum akar erum etor"}
              </CourseDescription>
            </CourseLayout>
          ))}
      </CourseList>
    </>
  );
};
