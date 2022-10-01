import React from "react";
import { styled } from "../../stitches.config";

export type Props = {
  title: string;
  author: string;
  date: string;
  readingTime: string;
};

const ComponentAlignment = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
});

const ComponentLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  backgroundColor: "$neutral-300",
  color: "$neutral-500",
  fontFamily: "$neutral-500",
  fontSize: "1.2rem",
  lineHeight: "1.5",
  fontWeight: "normal",
  padding: "20px 40px",
  justifyContent: "center",
  alignItems: "center",
  gap: "30px",
  borderRadius: "1000px",
  width: "fit-content",

  "@mobileOnly": {
    fontSize: "1rem",
    padding: "20px",
    gap: "10px",
  },
});

const DetailItem = styled("span", {});

export const ArticleDetails: React.FC<Props> = ({
  title,
  author,
  date,
  readingTime,
}) => {
  return (
    <>
      <ComponentAlignment>
        <ComponentLayout>
          <DetailItem>{author}</DetailItem>
          <DetailItem>{date}</DetailItem>
          <DetailItem>{readingTime}</DetailItem>
        </ComponentLayout>
      </ComponentAlignment>
    </>
  );
};
