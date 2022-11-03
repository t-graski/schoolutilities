import React from "react";
import { styled } from "../../../stitches.config";

type Props = {};

const AccountElementsLayout = styled("div", {
  display: "flex",
  width: "100%",
  flexDirection: "column",
  gap: "$9x",
});

const AccountElementlayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$4x",
});

export const AccountSettings: React.FC<Props> = () => {
  

  return (
    <AccountElementsLayout>
      <AccountElementlayout></AccountElementlayout>
    </AccountElementsLayout>
  );
};
