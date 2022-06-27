import { styled } from "@stitches/react";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { fetchSubmissions } from "../../../utils/requests";
import { Spacer } from "../../atoms/Spacer";
import { DownloadList } from "../DownloadList";

type Props = {
  submissionUUID: string;
};

const Headline = styled("h2", {
  color: "$fontPrimary",
});

export const SubmissionsOverview: React.FC<Props> = ({ submissionUUID }) => {
  const { data: submissionsContent, status } = useQuery(
    ["submissions", submissionUUID],
    async () => {
      const data = await fetchSubmissions(submissionUUID);

      const mappedSubmissions = [];
      data.forEach((person) => {
        console.log(person);
        mappedSubmissions.push({
          name: person.fullName,
          description: person.submission
            ? `Submitted on ${new Date(
                person.submission.submissionDate
              ).toLocaleDateString()} at ${new Date(
                person.submission.submissionDate
              ).toLocaleTimeString()}`
            : "Not submitted",
          editLink: submissionUUID + "/person/" + person.userUUID,
          downloadLink: person.submission ? person.submission.download : "",
          downloadName: person.submission ? person.submission.fileName : "",
          id: person.userUUID,
        });
      });
      return mappedSubmissions;
    }
  );

  if (status === "loading") {
    return (
      <>
        <Headline>Submissions from students</Headline>
        <br></br>
        <Skeleton width={"100%"} height={80}></Skeleton>
        <Spacer size="verySmall"></Spacer>
        <Skeleton width={"100%"} height={80}></Skeleton>
        <Spacer size="verySmall"></Spacer>
        <Skeleton width={"100%"} height={80}></Skeleton>
        <Spacer size="verySmall"></Spacer>
        <Skeleton width={"100%"} height={80}></Skeleton>
        <Spacer size="verySmall"></Spacer>
      </>
    );
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <>
      <Headline>Submissions from students</Headline>
      <br></br>
      <DownloadList
        entries={submissionsContent}
        entryProperties={{
          name: "name",
          description: "description",
          editLink: "editLink",
          downloadLink: "downloadLink",
          downloadName: "downloadName",
          id: "id",
        }}
      ></DownloadList>
    </>
  );
};
