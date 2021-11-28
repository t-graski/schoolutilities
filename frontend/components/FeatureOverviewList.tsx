import React from "react";
import { styled } from "../stitches.config";
import { FeatureOverview, FeatureOverviewProps } from "./FeatureOverview";
import { Separator } from "./Separator";

type Props = {
  features: FeatureOverviewProps[];
};

const FeatureOverviewListLayout = styled("div", {
  width: "100%",
  padding: "0 15vw",
});

export const FeatureOverviewList: React.FC<Props> = ({ features }) => {
  return (
    <>
      <FeatureOverviewListLayout>
        {features.map((feature, index) => (
            <>
          <FeatureOverview
            imageSrc={feature.imageSrc}
            imageAlt={feature.imageAlt}
            title={feature.title}
            description={feature.description}
            imagePosition={
              feature.imagePosition
                ? feature.imagePosition
                : index % 2 == 0
                ? "left"
                : "right"
            }
            key={index}
          />
          {index < features.length - 1 && <Separator width="big" alignment="center"/>}
            </>
        ))}
      </FeatureOverviewListLayout>
    </>
  );
};
