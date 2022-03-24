import { styled } from "@stitches/react";
import React from "react";
import { Headline } from "../../atoms/Headline";
import { Spacer } from "../../atoms/Spacer";
import { SideDashboardBar } from "../SideDashboardBar";
import { MarkdownEditor } from "./MarkdownEditor";

type Props = {};

const ArticleAddFieldLayout = styled("div", {
  display: "flex",
  padding: "40px 0",
  flexDirection: "column",
});

const CreateHeadline = styled("h1", {
  fontSize: "3rem",
});

export const ArticleAddField: React.FC<Props> = ({}) => {
  return (
    <ArticleAddFieldLayout>
      <CreateHeadline>Neuen Artikel erstellen</CreateHeadline>
      <MarkdownEditor></MarkdownEditor>
    </ArticleAddFieldLayout>
  );
};
