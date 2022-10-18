import React from "react";
import { styled } from "../../stitches.config";
import { Separator } from "../atoms/Separator";

export type TutorialListItemProps = {
  title: string;
};

const HeaderLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$2x",
  width: "100%",

  fontSize: "2.5rem",
});

export const PersonalSettingsHeader: React.FC<TutorialListItemProps> = ({
  title,
}) => {
  return (
    <>
      <HeaderLayout>
        {title}
        <Separator width={"big"} alignment={"left"}></Separator>
      </HeaderLayout>
    </>
  );
};
