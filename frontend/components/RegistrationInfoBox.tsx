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
  fontSize: "1.2rem",
});

export const RegistrationInfoBox: React.FC<Props> = ({}) => {
  return (
    <>
      <RegistrationLayout>
        <Headline label="Sign Up" alignment="left"></Headline>
        <StyledText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          euismod, nisl eget consectetur sagittis, nisl nunc egestas
        </StyledText>
      </RegistrationLayout>
    </>
  );
};

// create reges for a course description
let regex = /(?<=\s|^)([A-Z]{4}[0-9]{4})(?=\s|$)/g;