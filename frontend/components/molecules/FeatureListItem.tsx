import React from "react";
import { styled } from "../../stitches.config";
import { Button } from "../atoms/Button";

export type FeatureListItemProps = {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    textPosition?: "left" | "right";
};

const FeatureListItemLayout = styled("div", {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    justifyContent: "center",
    alignItems: "center",
});

const FeatureArtworkLayout = styled("div", {
    width: "100%",
    minHeight: "25vh",
    backgroundColor: "$backgroundTertiary",
    gridRow: "1 / 2",
    borderRadius: "40px",

    variants: {
        artworkPosition: {
            left: {
                gridColumn: "2 / 3",
            },
            right: {
                gridColumn: "1 / 2",
            },
        },
    }
});

const FeatureDescriptionLayout = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    gridRow: "1 / 2",

    variants: {
        textPosition: {
            left: {
                gridColumn: "1 / 2",
                paddingRight: "100px",
            },
            right: {
                gridColumn: "2 / 3",
                paddingLeft: "100px",
            },
        },
    }
});

const FeatureTitle = styled("h2", {
    fontSize: "2.5rem",
});

const FeatureDescription = styled("p", {});

export const FeatureListItem: React.FC<FeatureListItemProps> = ({
    title,
    description,
    buttonText,
    buttonLink,
    textPosition = "left",
}) => {
    return (
        <>
            <FeatureListItemLayout>
                <FeatureArtworkLayout artworkPosition={textPosition} />
                <FeatureDescriptionLayout textPosition={textPosition} >
                    <FeatureTitle>{title}</FeatureTitle>
                    <FeatureDescription>{description}</FeatureDescription>
                    <Button
                        backgroundColor="primary"
                        color="primary"
                    >
                        {buttonText}
                    </Button>
                </FeatureDescriptionLayout>
            </FeatureListItemLayout>
        </>
    );
};
