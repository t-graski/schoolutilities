import React from "react";
import { Headline } from "../../atoms/Headline";
import { Separator } from "../../atoms/Separator";
import { styled } from "@stitches/react";
import { Spacer } from "../../atoms/Spacer";
import SvgLogoPencilOnly from "../../atoms/svg/SvgLogoPencilOnly";

type Props = {
  title: string;
  description: string;
};

const BrandStartPageFieldLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "4fr 1fr",
  gap: "30px",
  alignItems: "center",
});

const Description = styled("p", {
  fontSize: "1.5rem",
  fontWeight: "$medium",
  margin: "0",
  marginBottom: "20px",
});

const IconLayout = styled("div", {
  width: "180px",
  height: "180px",
  padding: "50px",
  paddingTop: "30px",
  borderRadius: "50%",
  backgroundColor: "$neutral-300",
  margin: "0 auto",
});

export const BrandStartPageField: React.FC<Props> = ({
  title,
  description,
}) => {
  return (
    <>
      <BrandStartPageFieldLayout>
        <div>
          <Headline label={title} alignment="left"></Headline>
          <Separator width="small" alignment="left" />
          <Spacer size="verySmall" />
          <Description>{description}</Description>
        </div>
        <IconLayout>
          <SvgLogoPencilOnly />
        </IconLayout>
      </BrandStartPageFieldLayout>
    </>
  );
};
