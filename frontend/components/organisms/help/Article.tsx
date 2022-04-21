import React, { useEffect, useState } from "react";
import { styled } from "../../../stitches.config";
import { getAccessToken } from "../../../misc/authHelper";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { Headline } from "../../atoms/Headline";
import { Separator } from "../../atoms/Separator";
import { ArticleDetails } from "../../article/ArticleDetails";
import { Spacer } from "../../atoms/Spacer";

export type SideDashboardProps = {};

const ContentLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "5vh 15vw",
});

export const Article: React.FC<SideDashboardProps> = ({}) => {
  const router = useRouter();
  const articleUUID = router.query.articleUUID;

  useEffect(() => {
    getContent();
  }, [articleUUID]);

  const [content, setContent] = useState({
    headline: "",
    content: "",
    creator: {
      firstName: "",
      lastName: "",
    },
    creationDate: "",
    readingTime: 0,
  });

  const getContent = async () => {
    let accessToken = await getAccessToken();
    if (accessToken && articleUUID) {
      const getRequest = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/article/${articleUUID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const getResponse = await getRequest.json();
      setContent(getResponse);
    }
  };

  return (
    <>
      <Headline label={content.headline}></Headline>
      <Separator width="small" alignment="center" />
      <Spacer size="verySmall" />
      <ArticleDetails
        title={content.headline}
        author={content.creator.firstName + " " + content.creator.lastName}
        date={new Date(content.creationDate).toLocaleDateString()}
        readingTime={content.readingTime + " min read"}
      ></ArticleDetails>
      <ContentLayout>
        <div dangerouslySetInnerHTML={{ __html: content.content }}></div>
      </ContentLayout>
    </>
  );
};
