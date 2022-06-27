import { styled } from "../../../../../../../../../stitches.config";
import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
const Navbar = dynamic(
  () => import("../../../../../../../../../components/organisms/Navbar")
);
import dynamic from "next/dynamic";
import Link from "next/link";
import { useQuery } from "react-query";
import Skeleton from "react-loading-skeleton";
import {
  fetchCourseElement,
  fetchUserSubmissionData,
  saveGradeAndNote,
} from "../../../../../../../../../utils/requests";
import { Spacer } from "../../../../../../../../../components/atoms/Spacer";
import { Separator } from "../../../../../../../../../components/atoms/Separator";
import { Button } from "../../../../../../../../../components/atoms/Button";
import Footer from "../../../../../../../../../components/organisms/Footer";
import { Headline } from "../../../../../../../../../components/atoms/Headline";
import { InputField } from "../../../../../../../../../components/atoms/input/InputField";
import { TextField } from "../../../../../../../../../components/atoms/input/TextField";

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
  const [weight, setWeight] = useState("");
  const [grade, setGrade] = useState(-1);
  const [notes, setNotes] = useState("");
  const router = useRouter();
  const submissionUUID = router.query.submissionUUID as string;
  const userUUID = router.query.userUUID as string;

  const {
    data: submissionContent,
    status: submissionContentStatus,
    refetch,
  } = useQuery(["courseElement", submissionUUID], async () => {
    const data = await fetchCourseElement(submissionUUID);
    console.log(data);

    data.options.canEdit = data.canEdit;
    data.options.hasSubmitted = data.hasSubmitted;
    return data.options;
  });

  const { data: userSubmissionData, status: userSubmissionStatus } = useQuery(
    ["userSubmission", submissionUUID, userUUID],
    async () => {
      const data = await fetchUserSubmissionData(submissionUUID, userUUID);

      setGrade(data.grade >= 0 ? data.grade : "");
      setNotes(data.notes);

      return data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (
    submissionContentStatus === "loading" ||
    userSubmissionStatus === "loading"
  ) {
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
        <InputField
          label="Grade"
          value={grade >= 0 ? grade : ""}
          inputType={"number"}
          onChange={(value) => {
            setGrade(value == "" ? -1 : Number(value));
          }}
          icon={""}
          size="small"
        ></InputField>
        <Spacer size="verySmall"></Spacer>
        <TextField value={notes} onChange={setNotes} label="Note"></TextField>
        <Spacer size="verySmall"></Spacer>
        <Button
          backgroundColor="primary"
          color="primary"
          onClick={async () => {
            try {
              await saveGradeAndNote(submissionUUID, userUUID, grade, notes);
              router.push(
                `/school/${router.query.schoolUUID}/course/${router.query.courseUUID}/submission/${submissionUUID}`
              );
            } catch (e) {
              console.log(e);
            }
          }}
        >
          Save grade and note
        </Button>
      </ContentLayout>
      <Footer></Footer>
    </>
  );
}
