import Image from "next/image";
import Link from "next/link";
import React from "react";
import { styled } from "../../stitches.config";

export type TutorialListItemProps = {
  title: string;
  previewImageSrc: string;
  previewImageAlt: string;
  tutorialHref: string;
};

const TutorialListItemLayout = styled("a", {
  display: "flex",
  flexDirection: "column",
  textDecoration: "none",
  color: "inherit",
  backgroundColor: "$neutral-300",
  borderRadius: "40px",
  width: "100%",
  padding: "50px",
  gap: "30px",
});

const PreviewImageLayout = styled("div", {
  position: "relative",
  display: "flex",
  width: "100%",
  height: "10vh",
});

const TitleLayout = styled("span", {
  fontSize: "2rem",
});
const LearnMore = styled("span", {});

export const TutorialListItem: React.FC<TutorialListItemProps> = ({
  title,
  previewImageSrc,
  previewImageAlt,
  tutorialHref,
}) => {
  return (
    <>
      <Link href={tutorialHref} passHref>
        <TutorialListItemLayout>
          <PreviewImageLayout>
            <Image src={previewImageSrc} alt={previewImageAlt} fill />
          </PreviewImageLayout>
          <TitleLayout>{title}</TitleLayout>
          <LearnMore>Learn More ›</LearnMore>
        </TutorialListItemLayout>
      </Link>
    </>
  );
};
