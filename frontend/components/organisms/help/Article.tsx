import React from "react";
import { Headline } from "../../atoms/Headline";
import { Separator } from "../../atoms/Separator";
import { ArticleDetails } from "../../article/ArticleDetails";
import { Spacer } from "../../atoms/Spacer";

export type Props = {
  content: {
    articleHeadline: string;
    articleContent: string;
    articleCreationTimestamp: string;
  };
};

export const Article: React.FC<Props> = ({ content }) => {
  return (
    <>
      <Headline label={content.articleHeadline}></Headline>
      <Separator width="small" alignment="center" />
      <Spacer size="verySmall" />
      <ArticleDetails
        title={content.articleHeadline}
        author={""}
        date={new Date(content.articleCreationTimestamp).toLocaleDateString()}
        readingTime={" min read"}
      ></ArticleDetails>
      <div className="ProseMirror" dangerouslySetInnerHTML={{ __html: content.articleContent }}></div>
    </>
  );
};
