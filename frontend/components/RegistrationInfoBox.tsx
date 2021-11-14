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

type Props = {};

const RegistrationLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const StyledText = styled("p", {
  marginTop: "$small",
  fontSize: "1.3rem",
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

export const RegistrationInfoBox: React.FC<Props> = ({}) => {
  return (
    <>
      <RegistrationLayout>
        <StyledHeadline
          label="Sign Up"
          alignment="left"
          fontWeight="extraBold"
        ></StyledHeadline>
        <StyledText>
        Join the world's most advanced community and manage all of your school-activities in the easiest possible way - let’s get a comfortable routine into our daily lives!
        </StyledText>
        <ImageLayout>
          <Image
            src="/images/auth/Sign-Up-Mockup.png"
            alt="Sign Up Mockup"
            layout="fill"
          ></Image>
        </ImageLayout>
      </RegistrationLayout>
    </>
  );
};

// create reges for a course description
let regex = /(?<=\s|^)([A-Z]{4}[0-9]{4})(?=\s|$)/g;
