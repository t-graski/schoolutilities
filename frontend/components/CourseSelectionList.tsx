import React, { useEffect, useState } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import Link from "next/link";
import { SvgIcon } from "./SvgIcon";
import { getAccessToken } from "../misc/authHelper";
import cookie from "js-cookie";
import { useRouter } from "next/router";

export type SideDashboardProps = {};

const CourseList = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});

const CourseLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  marginTop: "20px",
  marginBottom: "20px",
  padding: "20px 40px",
  borderRadius: "5px",
  backgroundColor: "$backgroundTertiary",
  transition: "all 200ms ease-in-out",
  "&:hover": {
    backgroundColor: "$backgroundSecondary",
  },
  cursor: "pointer",
});

const CourseName = styled("p", {
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "10px",
  margin: 0,
  color: "$fontPrimary",
});

export const CourseSelectionList: React.FC<SideDashboardProps> = ({}) => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    updateCoursesFromDatabase();
  }, []);
  const router = useRouter();

  async function updateCoursesFromDatabase() {
    let accessToken = await getAccessToken();
    if (!accessToken) {
      router.push("/auth?tab=login&redirect=/school/course");
    } else if (!cookie.get("schoolUUID")) {
      router.push("/profile/school-selection?redirect=/school/course");
    } else {
      let response = await fetch(
        `https://backend.schoolutilities.net/api/course/getCourses/${cookie.get(
          "schoolUUID"
        )}`,
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

  return (
    <>
      <CourseList>
        {Array.isArray(courses) &&
          courses.map((course) => (
            <CourseLayout
              key={course.courseUUID}
              onClick={() => {
                router.push(`/school/course/${course.courseUUID}`);
              }}
            >
              <CourseName>{course.courseName}</CourseName>
            </CourseLayout>
          ))}
      </CourseList>
    </>
  );
};
