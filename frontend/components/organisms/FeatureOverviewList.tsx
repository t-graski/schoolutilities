import React from "react";
import { styled } from "../../stitches.config";
import { FeatureOverview, FeatureOverviewProps } from "../molecules/FeatureOverview";
import { Separator } from "../atoms/Separator";

type Props = {
  features: FeatureOverviewProps[];
};

const FeatureOverviewListLayout = styled("div", {
  width: "100%",
  padding: "0 15vw",
});

const FeatureOverviewListItem = styled("div", {});

export const FeatureOverviewList: React.FC<Props> = ({ features }) => {
  return (
    <>
      <FeatureOverviewListLayout>
        {features.map((feature, index) => (
            <FeatureOverviewListItem key={index}>
          <FeatureOverview
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            imagePosition={
              feature.imagePosition
                ? feature.imagePosition
                : index % 2 == 0
                ? "left"
                : "right"
            }
          />
          {index < features.length - 1 && <Separator width="big" alignment="center"/>}
            </FeatureOverviewListItem>
        ))}
      </FeatureOverviewListLayout>
    </>
  );
};
