import React from "react";
import { Headline } from "../../atoms/Headline";
import Separator from "../../atoms/Separator";
import { ArticleDetails } from "../../article/ArticleDetails";
import { Spacer } from "../../atoms/Spacer";

export type SideDashboardProps = {
  content: {
    headline: string;
    content: string;
    creator: {
      firstName: string;
      lastName: string;
    };
    creationDate: string;
    readingTime: number;
  };
};

export const Article: React.FC<SideDashboardProps> = ({ content }) => {
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
      <div dangerouslySetInnerHTML={{ __html: content.content }}></div>
    </>
  );
};
