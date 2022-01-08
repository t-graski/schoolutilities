import React from "react";
import { styled } from "../stitches.config";
import type * as Stitches from "@stitches/react";
import { Button } from "./Button";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  title: string;
  title2?: string;
  description: string;
  descriptionLine: string;
  buttonText: string;
  buttonLink: string;
  linkText: string;
  linkUrl: string;
};

const StartPageBoxLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "40vw",
  color: "$fontPrimary",
  paddingLeft: "8vw",
});

const StartPageBoxTitle = styled("h1", {
  fontSize: "3rem",
  fontWeight: "900",
  margin: "0",
  marginBottom: "20px",
});

const StartPageBoxDescription = styled("p", {
  fontSize: "1.5rem",
  fontWeight: "500",
  margin: "0",
  marginBottom: "20px",
});

const StartPageBoxDescriptionLine = styled("p", {
  fontSize: "1.5rem",
  fontWeight: "700",
  margin: "0",
  marginBottom: "20px",
});

const StyledLink = styled("a", {
  fontSize: "1.5rem",
  fontWeight: "700",
  margin: "0",
  marginBottom: "20px",
  color: "$fontPrimary",
  textDecoration: "none",
  marginLeft: "50px",
  cursor: "pointer",
});

export const StartPageBox: React.FC<Props> = ({
  title,
  title2,
  description,
  descriptionLine,
  buttonText,
  buttonLink,
  linkText,
  linkUrl,
}) => {
  const router = useRouter();
  return (
    <>
      <StartPageBoxLayout>
        <StartPageBoxTitle>{title}<br/>{title2}</StartPageBoxTitle>
        <StartPageBoxDescription>{description}</StartPageBoxDescription>
        <StartPageBoxDescriptionLine>
          {descriptionLine}
        </StartPageBoxDescriptionLine>
        <div>
          <Button
            backgroundColor={"tertiary"}
            color={"primary"}
            label={buttonText}
            onClick={() => {
              router.push(buttonLink);
            }}
          ></Button>
          <Link href={linkUrl}>
            <StyledLink>{linkText}</StyledLink>
          </Link>
        </div>
      </StartPageBoxLayout>
    </>
  );
};
