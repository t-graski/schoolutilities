import { styled } from "../../../../../stitches.config";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
const Navbar = dynamic(
  () => import("../../../../../components/organisms/Navbar")
);
import { Spacer } from "../../../../../components/atoms/Spacer";
import { Headline } from "../../../../../components/atoms/Headline";
import Footer from "../../../../../components/organisms/Footer";
import CourseEditContent from "../../../../../components/molecules/course/CourseEditContent";
import { Button } from "../../../../../components/atoms/Button";
import AddCourseElement from "../../../../../components/atoms/course/AddCourseElement";
import { getAccessToken } from "../../../../../utils/authHelper";
import { ContentLayout } from "../../../../../utils/styles";
import dynamic from "next/dynamic";

const HeadlineLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",

  "@mobileOnly": {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

const CourseHeaderLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "40px",
  justifyContent: "left",
  alignItems: "center",

  "@mobileOnly": {
    gap: "20px",
  },
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

  console.log(responseBody);

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
            <AddCourseElement
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
            ></AddCourseElement>
          </CourseHeaderLayout>
          <CourseHeaderLayout>
            <Button
              backgroundColor={"secondary"}
              color={"primary"}
              onClick={() => {
                router.push(
                  `/school/${router.query.schoolUUID}/course/${router.query.courseUUID}`
                );
              }}
            >
              Cancel
            </Button>
            <Button
              backgroundColor={"primary"}
              color={"primary"}
              onClick={async () => {
                let accessToken = await getAccessToken();
                console.log(responseBody);
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
                if (saveResponse) {
                  if (saveResponse.status == 200) {
                    // router.push(
                    //   `/school/${router.query.schoolUUID}/course/${router.query.courseUUID}`
                    // );
                  } else {
                    alert("Error while saving");
                  }
                }
              }}
            >
              Save
            </Button>
          </CourseHeaderLayout>
        </HeadlineLayout>
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
