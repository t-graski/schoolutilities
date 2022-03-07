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
import { Button } from "../../../../../components/Button";

const ContentLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "50px 10vw",
});

const HeadlineLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const IconLayout = styled("div", {
  width: "40px",
});

const CourseHeaderLayout = styled("div", {
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
    const currentCourseUUID = router.query.courseUUID;
    if (!Array.isArray(currentCourseUUID)) {
      setCourseUUID(currentCourseUUID);
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

  const [responseBody, setResponseBody] = useState({});

  return (
    <>
      <Head>
        <title>{courseName ? courseName : "Course"} - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <ContentLayout>
        <HeadlineLayout>
          <CourseHeaderLayout>
            <Headline
              width="content"
              label={courseName}
              alignment="left"
            ></Headline>
            <CourseMenu
              courseId={courseUUID}
              addNewEntry={(choosenElement, config) => {
                setItems([
                  ...items,
                  {
                    id: itemsCounter,
                    config: { ...config, choosenElement },
                    children: [],
                  },
                ]);
                setItemsCounter(itemsCounter + 1);
              }}
            ></CourseMenu>
          </CourseHeaderLayout>
          <CourseHeaderLayout>
            <Button
              backgroundColor={"secondary"}
              color={"primary"}
              label={"Cancel"}
              onClick={() => {
                router.push(
                  `/school/${router.query.schoolUUID}/course/${router.query.courseUUID}`
                );
              }}
            ></Button>
            <Button
              backgroundColor={"primary"}
              color={"primary"}
              label={"Save"}
              onClick={async () => {
                let accessToken = await getAccessToken();
                const saveResponse = await fetch(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/courseElements`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(responseBody),
                  }
                );
                console.log(responseBody);
                if (saveResponse) {
                  if (saveResponse.status == 200) {
                    router.push(
                      `/school/${router.query.schoolUUID}/course/${router.query.courseUUID}`
                    );
                  } else {
                    alert("Error while saving");
                  }
                }
              }}
            ></Button>
          </CourseHeaderLayout>
        </HeadlineLayout>
        <Separator width="small" alignment="left" />
        <Spacer size="verySmall"></Spacer>
        <CourseEditContent
          courseId={courseUUID}
          items={items}
          setItems={setItems}
          setResponseBody={setResponseBody}
        ></CourseEditContent>
      </ContentLayout>
      <Footer></Footer>
    </>
  );
}
