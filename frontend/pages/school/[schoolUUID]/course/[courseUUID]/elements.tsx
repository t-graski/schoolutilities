import { styled } from "../../../../../stitches.config";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Navbar } from "../../../../../components/organisms/Navbar";
import { Spacer } from "../../../../../components/atoms/Spacer";
import { Headline } from "../../../../../components/atoms/Headline";
import Footer from "../../../../../components/organisms/Footer";
import { getAccessToken } from "../../../../../utils/authHelper";
import CourseEditContent from "../../../../../components/molecules/course/CourseEditContent";
import { Button } from "../../../../../components/atoms/Button";
import AddCourseElement from "../../../../../components/atoms/course/AddCourseElement";
import { fetchCourse, fetchCourseContent } from "../../../../../utils/requests";
import { useQuery } from "react-query";

export const ContentLayout = styled("div", {
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

  const { courseName } = course;

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
                router.push(`/school/${schoolUUID}/course/${courseUUID}`);
              }}
            >
              Cancel
            </Button>
            <Button
              backgroundColor={"primary"}
              color={"primary"}
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
