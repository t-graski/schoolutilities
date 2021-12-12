import React from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";
import fetch from "node-fetch";
import { InputField } from "./InputField";
import { Headline } from "./Headline";
import { Spacer } from "./Spacer";

if (!globalThis.fetch) {
  //@ts-ignore
  globalThis.fetch = fetch;
}

type Props = {
  headline: string;
  info: string;
  imageSrc: string;
  imageAlt: string;
};

const RegistrationLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const StyledText = styled("p", {
  marginTop: "$small",
  fontSize: "1.3rem",
  color: "$fontPrimary",
});

const StyledHeadline = styled(Headline, {
  fontWeight: "900",
});

const ImageLayout = styled("div", {
  height: "fit-content",
  position: "relative",
  marginTop: "30px",

  ["&:before"]: {
    display: "block",
    content: "",
    width: "100%",
    paddingTop: "calc(100%/1.9)",
  },
});

export const InfoBox: React.FC<Props> = ({
  headline,
  info,
  imageSrc,
  imageAlt,
}) => {
  return (
    <>
      <RegistrationLayout>
        <StyledHeadline
          label={headline}
          alignment="left"
          fontWeight="extraBold"
        ></StyledHeadline>
        <StyledText>{info}</StyledText>
        <ImageLayout>
          <Image src={imageSrc} alt={imageAlt} layout="fill"></Image>
        </ImageLayout>
      </RegistrationLayout>
    </>
  );
};

// create reges for a course description
let regex = /(?<=\s|^)([A-Z]{4}[0-9]{4})(?=\s|$)/g;
