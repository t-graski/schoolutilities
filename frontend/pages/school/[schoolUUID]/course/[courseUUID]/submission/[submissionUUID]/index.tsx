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
import { FileUpload } from "../../../../../../../components/molecules/FileUpload";
import { Button } from "../../../../../../../components/atoms/Button";
import { SubmissionsOverview } from "../../../../../../../components/organisms/course/SubmissionsOverview";

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
    hasSubmitted: false,
    allowedFileTypes: ".jpg,.png",
    canEdit: false,
  });
  const [submissionUUID, setSubmissionUUID] = useState("");

  useEffect(() => {
    requestDataFromDatabase();
  });

  async function requestDataFromDatabase() {
    if (!Array.isArray(submissionUUID)) {
      setSubmissionUUID(router.query.submissionUUID as string);
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
          submissionData.options.canEdit = submissionData.canEdit;
          submissionData.options.hasSubmitted = submissionData.hasSubmitted;
          setSubmissionContent(submissionData.options);
        }
      }
    } else if (!accessToken) {
      router.push("/auth?tab=login");
    }
  }

  console.log(submissionContent);

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
        <Spacer size="verySmall"></Spacer>
        {!submissionContent.canEdit && !submissionContent.hasSubmitted && <FileUpload></FileUpload>}
        {!submissionContent.canEdit && submissionContent.hasSubmitted && (<>You already submitted a file</>)}
        {submissionContent.canEdit && (
          <SubmissionsOverview submissionUUID={submissionUUID}></SubmissionsOverview>
        )}
        <Spacer size="verySmall"></Spacer>
        <Button
          backgroundColor={"secondary"}
          color={"primary"}
          label={"Back to course"}
          onClick={() => {
            router.push(
              `/school/${router.query.schoolUUID}/course/${router.query.courseUUID}`
            );
          }}
        ></Button>
        <Spacer size="verySmall"></Spacer>
      </ContentLayout>
      <Footer></Footer>
    </>
  );
}
