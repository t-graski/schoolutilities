import React from "react";
import { styled } from "../../../stitches.config";
import { AddIcon } from "../../atoms/AddIcon";
import { Headline } from "../../atoms/Headline";
import { Separator } from "../../atoms/Separator";

type Props = {
  headline: string;
  addFunction?: Function;
};

const HeaderLayout = styled("div", {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
});

const InformationLayout = styled("div", {});

const AddIconLayout = styled("div", {
  display: "flex",
  width: "80px",
  height: "80px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  backgroundColor: "$warning",
  cursor: "pointer",
});

const AddIconPlus = styled("p", {
  fontSize: "80px",
  color: "$neutral-500",
});

export const SettingsHeader: React.FC<Props> = ({ headline, addFunction }) => {
  return (
    <>
      <HeaderLayout>
        <InformationLayout>
          <Headline
            label={headline}
            alignment="left"
            fontWeight="bold"
          ></Headline>
          <Separator width="small" alignment="left"></Separator>
        </InformationLayout>
        {addFunction && <AddIcon addFunction={addFunction}></AddIcon>}
      </HeaderLayout>
    </>
  );
};
