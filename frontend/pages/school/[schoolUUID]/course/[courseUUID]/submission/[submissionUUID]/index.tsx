import { styled } from "../../../../../../../stitches.config";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Navbar } from "../../../../../../../components/organisms/Navbar";
import { Spacer } from "../../../../../../../components/atoms/Spacer";
import { Headline } from "../../../../../../../components/atoms/Headline";
import { Separator } from "../../../../../../../components/atoms/Separator";
import Footer from "../../../../../../../components/organisms/Footer";
import { getAccessToken } from "../../../../../../../misc/authHelper";
import CourseMenu from "../../../../../../../components/atoms/CourseMenu";
import CourseContent from "../../../../../../../components/molecules/course/CourseContent";
import { FileUpload } from "../../../../../../../components/molecules/FileUpload";

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

  const [submissionContent, setSubmissionContent] = useState({
    name: "",
    description: "",
    dueTime: "",
    submitLater: false,
    submitLaterTime: new Date(500).toISOString(),
    maxFileSize: 1000,
    allowedFileTypes: ".jpg,.png",
  });
  const [submissionUUID, setSubmissionUUID] = useState("");

  useEffect(() => {
    requestDataFromDatabase();
  });

  async function requestDataFromDatabase() {
    const { submissionUUID } = router.query;
    if (!Array.isArray(submissionUUID)) {
      setSubmissionUUID(submissionUUID);
    }
    let accessToken = await getAccessToken();
    if (submissionUUID && accessToken && submissionContent.name == "") {
      const submissionResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/element/${submissionUUID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (submissionResponse) {
        if (submissionResponse.status == 200) {
          const submissionData = await submissionResponse.json();
          console.log(submissionData);
          setSubmissionContent(submissionData.options);
        } else {
        }
      }
    } else if (!accessToken) {
      router.push("/auth?tab=login");
    }
  }
  const [items, setItems] = useState([]);

  return (
    <>
      <Head>
        <title>
          {submissionContent ? submissionContent.name : "Submission"} -
          SchoolUtilities
        </title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <ContentLayout>
        <HeadlineLayout>
          <Headline
            width="content"
            label={submissionContent ? submissionContent.name : "Submission"}
            alignment="left"
          ></Headline>
        </HeadlineLayout>
        <Separator width="small" alignment="left" />
        <FileUpload></FileUpload>
        <Spacer size="verySmall"></Spacer>
      </ContentLayout>
      <Footer></Footer>
    </>
  );
}
