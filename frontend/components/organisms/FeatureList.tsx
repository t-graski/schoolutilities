import { styled } from "@stitches/react";
import React from "react";
import { FeatureListItem, FeatureListItemProps } from "../molecules/FeatureListItem";

type Props = {
    features: FeatureListItemProps[];
};

const FeatureListLayout = styled("div", {
    display: 'flex',
    flexDirection: 'column',
    gap: '100px',
});

export const FeatureList: React.FC<Props> = ({ features }) => {
    return (
        <>
            <FeatureListLayout>
                {features.map((feature, index) => (
                    <FeatureListItem key={index} {...feature} />
                ))}
            </FeatureListLayout>
        </>
    );
};
