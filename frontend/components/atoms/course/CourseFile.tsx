import { styled } from "@stitches/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

// this usually goes once
// to the entry point of the whole app
// (e.g. src/index.js)
import "react-nestable/dist/styles/index.css";

type Props = {
  name: string;
  description: string;
  elementUUID: string;
  dueTime: string;
  submitLater: boolean;
  submitLaterTime: string;
  maxFileSize: number;
  allowedFileTypes: string;
};

const StyledLink = styled("a", {
  color: "$neutral-500",
  textDecoration: "none",
  cursor: "pointer",
});

export const CourseFile: React.FC<Props> = ({
  name,
  description,
  elementUUID,
  dueTime,
  submitLater,
  submitLaterTime,
  maxFileSize,
  allowedFileTypes,
}) => {
  const Router = useRouter();
  return (
    <>
      <Link
        href={{
          pathname:
            "/school/[schoolUUID]/course/[courseUUID]/submission/[submissionUUID]",
          query: {
            schoolUUID: Router.query.schoolUUID as string,
            courseUUID: Router.query.courseUUID as string,
            submissionUUID: elementUUID,
          },
        }}
        passHref
      >
        <StyledLink>Abgabe: {name}</StyledLink>
      </Link>
    </>
  );
};

export default CourseFile;
