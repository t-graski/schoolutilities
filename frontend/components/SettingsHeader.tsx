import React from "react";
import { styled } from "../stitches.config";
import { Headline } from "./Headline";
import { Separator } from "./Separator";

type Props = {
  headline: string;
  addFunction: Function;
};

const SchoolDetailLayout = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  justifySelf: "center",
  width: "100%",
  padding: "20px",
});

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
  backgroundColor: "$specialPrimary",
  cursor: "pointer",
});

const AddIconPlus = styled("p", {
  fontSize: "80px",
  color: "$fontPrimary",
});

export const SettingsHeader: React.FC<Props> = ({
  headline,
  addFunction
}) => {

  return (
    <>
      <SchoolDetailLayout>
        <HeaderLayout>
          <InformationLayout>
            <Headline
              label={headline}
              alignment="left"
              fontWeight="bold"
            ></Headline>
            <Separator width="small" alignment="left"></Separator>
          </InformationLayout>
          <AddIconLayout
            onClick={() => addFunction()}
          >
            <AddIconPlus>+</AddIconPlus>
          </AddIconLayout>
        </HeaderLayout>
      </SchoolDetailLayout>
    </>
  );
};
