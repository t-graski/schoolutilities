import { styled } from "../../../stitches.config";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Navbar } from "../../../components/Navbar";
import { Spacer } from "../../../components/Spacer";
import { Headline } from "../../../components/Headline";
import { Separator } from "../../../components/Separator";
import { Footer } from "../../../components/Footer";
import { getAccessToken } from "../../../misc/authHelper";

export default function Features() {
  const router = useRouter();

  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    requestDataFromDatabase();
  });

  async function requestDataFromDatabase() {
    const { courseUUID } = router.query;
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

  return (
    <>
      <Head>
        <title>Features - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label={courseName}></Headline>
      <Separator width="small" alignment="center" />

      <Footer></Footer>
    </>
  );
}
