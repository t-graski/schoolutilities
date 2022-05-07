import React from "react";
import { styled } from "../../stitches.config";

export type FeatureOverviewProps = {
  icon: any;
  title: string;
  description: string;
  imagePosition?: "left" | "right";
};

const FeatureLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  width: "100%",
  gridGap: "2vw",
  padding: "3vw",
  alignItems: "center",
  color: "$fontPrimary",
});

const IconBackground = styled("div", {
  padding: "3.2vw",
  borderRadius: "50%",
  backgroundColor: "$specialSecondary",
  margin: "3vw",
  gridColumn: "1 / span 1",
  gridRow: 1,
  position: "relative",
  width: "fit-content",
  variants: {
    imagePosition: {
      left: {
        gridColumn: "1 / span 1",
      },
      right: {
        gridColumn: "3 / span 1",
      },
    },
  },
});

const FeatureDescriptionLayout = styled("div", {
  gridColumn: "2 / span 2",
  gridRow: 1,
  variants: {
    imagePosition: {
      left: {
        gridColumn: "2 / span 2",
      },
      right: {
        gridColumn: "1 / span 2",
      },
    },
  },
});

const StyledHeadline = styled("h2", {
  fontSize: "3rem",
  fontWeight: "700",
});

const StyledDescription = styled("p", {
  fontSize: "1.5rem",
});

export const FeatureOverview: React.FC<FeatureOverviewProps> = ({
  icon,
  title,
  description,
  imagePosition = "left",
}) => {
  const Icon = icon;
  return (
    <>
      <FeatureLayout>
        <IconBackground imagePosition={imagePosition}>
          <Icon />
        </IconBackground>
        <FeatureDescriptionLayout imagePosition={imagePosition}>
          <StyledHeadline>{title}</StyledHeadline>
          <StyledDescription>{description}</StyledDescription>
          {/* <button>Read more...</button>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p> */}
        </FeatureDescriptionLayout>
      </FeatureLayout>
    </>
  );
};
