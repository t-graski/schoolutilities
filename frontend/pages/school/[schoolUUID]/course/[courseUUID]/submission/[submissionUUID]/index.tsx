import { styled } from "../../../../../../../stitches.config";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
const Navbar = dynamic(
  () => import("../../../../../../../components/organisms/Navbar")
);
import { Spacer } from "../../../../../../../components/atoms/Spacer";
import { Headline } from "../../../../../../../components/atoms/Headline";
import { Separator } from "../../../../../../../components/atoms/Separator";
import Footer from "../../../../../../../components/organisms/Footer";
import { FileUpload } from "../../../../../../../components/molecules/FileUpload";
import { Button } from "../../../../../../../components/atoms/Button";
import { SubmissionsOverview } from "../../../../../../../components/organisms/course/SubmissionsOverview";
import dynamic from "next/dynamic";
import Link from "next/link";
import { fetchCourseElement } from "../../../../../../../utils/requests";
import { useQuery } from "react-query";
import Skeleton from "react-loading-skeleton";
import { getAccessToken } from "../../../../../../../utils/authHelper";

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

const StyledBackLink = styled("a", {
  color: "$fontPrimary",
  textDecoration: "none",
  opacity: "0.8",
});

const SubmissionDescription = styled("p", {
  fontSize: "1.2rem",
  fontWeight: "400",
  color: "$fontPrimary",
  lineHeight: "1.5",
});

export default function Features() {
  const router = useRouter();
  const submissionUUID = router.query.submissionUUID as string;

  const {
    data: submissionContent,
    status,
    refetch,
  } = useQuery(["courseElement", submissionUUID], async () => {
    const data = await fetchCourseElement(submissionUUID);
    console.log(data);

    data.options.canEdit = data.canEdit;
    data.options.hasSubmitted = data.hasSubmitted;
    return data.options;
  });

  async function deleteSubmission() {
    const token = await getAccessToken();

    if (submissionUUID) {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/revertExercise/${submissionUUID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (request.status == 200) {
        refetch();
      }
    }
  }

  if (status === "loading") {
    return (
      <>
        <Head>
          <title>SchoolUtilities</title>
        </Head>
        <Navbar></Navbar>
        <ContentLayout>
          <HeadlineLayout>
            <Skeleton width={300} height={80}></Skeleton>
          </HeadlineLayout>
          <Spacer size="verySmall"></Spacer>
          <Separator width="small" alignment="left" />
          <Spacer size="verySmall"></Spacer>

          <Skeleton width={500} height={50}></Skeleton>
          <Spacer size="verySmall"></Spacer>
          <Link
            href={`/school/${router.query.schoolUUID}/course/${router.query.courseUUID}`}
            passHref
          >
            <Button backgroundColor={"primary"} color={"primary"}>
              Back to course
            </Button>
          </Link>
          <Spacer size="verySmall"></Spacer>
        </ContentLayout>
        <Footer></Footer>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{submissionContent.name} - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <ContentLayout>
        <Link
          href={`/school/${router.query.schoolUUID}/course/${router.query.courseUUID}`}
          passHref
        >
          <StyledBackLink>{"< Back to course"}</StyledBackLink>
        </Link>
        <HeadlineLayout>
          <Headline
            width="content"
            label={submissionContent ? submissionContent.name : "Submission"}
            alignment="left"
          ></Headline>
        </HeadlineLayout>
        <Spacer size="verySmall"></Spacer>
        <SubmissionDescription>
          {submissionContent.description}
        </SubmissionDescription>
        <Spacer size="small"></Spacer>
        <Separator width="big" alignment="left" />
        <Spacer size="small"></Spacer>
        {!submissionContent.canEdit && !submissionContent.hasSubmitted && (
          <FileUpload></FileUpload>
        )}
        {!submissionContent.canEdit && submissionContent.hasSubmitted && (
          <>
            You already submitted a file
            <Spacer size="verySmall"></Spacer>
            <Button
              backgroundColor={"secondary"}
              color={"primary"}
              onClick={deleteSubmission}
            >
              Remove submission
            </Button>
            <Spacer size="small"></Spacer>
          </>
        )}
        {submissionContent.canEdit && (
          <SubmissionsOverview
            submissionUUID={submissionUUID}
          ></SubmissionsOverview>
        )}
        <Spacer size="verySmall"></Spacer>
        <Spacer size="verySmall"></Spacer>
      </ContentLayout>
      <Footer></Footer>
    </>
  );
}
