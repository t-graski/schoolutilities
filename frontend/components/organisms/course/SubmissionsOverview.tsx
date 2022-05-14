import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getAccessToken } from "../../../utils/authHelper";
import { DownloadList } from "../DownloadList";

type Props = {
  submissionUUID: string;
};

export const SubmissionsOverview: React.FC<Props> = ({ submissionUUID }) => {
  const router = useRouter();
  useEffect(() => {
    requestDataFromDatabase();
  });
  const [submissionsContent, setSubmissionsContent] = useState([]);

  async function requestDataFromDatabase() {
    let accessToken = await getAccessToken();
    if (submissionUUID && accessToken && submissionsContent.length == 0) {
      const submissionResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/submissions/${submissionUUID}`,
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
          const mappedSubmissions = [];
          console.log(submissionData);
          submissionData.forEach((person) => {
            mappedSubmissions.push({
              name: person.fullName,
              description: person.submission ? `Submitted on ${new Date(person.submission.submissionDate).toLocaleDateString()}` : "Not submitted",
              downloadLink: person.submission ? person.submission.download : "",
              downloadName: person.submission ? person.submission.fileName : "",
              id: person.userUUID,
            });
          });
          setSubmissionsContent(mappedSubmissions);
        }
      }
    } else if (!accessToken) {
      router.push("/auth?tab=login");
    }
  }

  return (
    <>
      <h2>Submissions from students</h2>
      <br></br>
      <DownloadList
        entries={submissionsContent}
        entryProperties={{
          name: "name",
          description: "description",
          downloadLink: "downloadLink",
          downloadName: "downloadName",
          id: "id",
        }}
      ></DownloadList>
    </>
  );
};
