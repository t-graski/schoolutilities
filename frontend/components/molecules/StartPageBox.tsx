import React from "react";
import { styled } from "../../stitches.config";
import { Button } from "../atoms/Button";
import Link from "next/link";

type Props = {
  title: string[];
  description: string;
  boldDescription?: string;
  highlightedButtonText: string;
  highlightedButtonLink: string;
  buttonText: string;
  buttonLink: string;
};

const StartPageBoxLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "40vw",
  color: "$neutral-500",
  paddingLeft: "8vw",

  "@mobileOnly": {
    width: "90vw",
  },
});

const StartPageBoxTitle = styled("h1", {
  fontSize: "3rem",
  fontWeight: "$bolder",
  margin: "0",
  marginBottom: "20px",
});

const StartPageBoxDescription = styled("p", {
  fontSize: "1.5rem",
  fontWeight: "$medium",
  margin: "0",
  marginBottom: "20px",
});

const BoldDescription = styled("span", {
  fontWeight: "$bold",
});

const StyledLink = styled("a", {
  height: "fit-content",
  lineHeight: "1.5rem",
  fontSize: "1.5rem",
  fontWeight: "$bold",
  margin: "0",
  color: "$neutral-500",
  textDecoration: "none",
  cursor: "pointer",
});

const ButtonLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  alignItems: "center",

  "@mobileOnly": {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

export const StartPageBox: React.FC<Props> = ({
  title,
  description,
  boldDescription,
  highlightedButtonText,
  highlightedButtonLink,
  buttonText,
  buttonLink,
}) => {
  return (
    <>
      <StartPageBoxLayout>
        <StartPageBoxTitle>
          {title.map((text, index) => (
            <>
              <span key={index}>{text}</span>
              <br />
            </>
          ))}
        </StartPageBoxTitle>
        <StartPageBoxDescription>
          {description}
          <br />
          <br />
          {boldDescription && (
            <BoldDescription>{boldDescription}</BoldDescription>
          )}
        </StartPageBoxDescription>
        <ButtonLayout>
          <Link href={highlightedButtonLink} passHref>
            <Button backgroundColor={"primary"} color={"primary"}>
              {highlightedButtonText}
            </Button>
          </Link>
          <Link href={buttonLink} passHref>
            <StyledLink>{buttonText}</StyledLink>
          </Link>
        </ButtonLayout>
      </StartPageBoxLayout>
    </>
  );
};
