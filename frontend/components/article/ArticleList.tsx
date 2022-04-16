import React from "react";
import { styled } from "../../stitches.config";

export type Props = {};

const ListLayout = styled("ul", {
  listStylePosition: "inside",
});

export const ArticleList: React.FC<Props> = ({ children }) => {
  return (
    <>
      <ListLayout>{children}</ListLayout>
    </>
  );
};
