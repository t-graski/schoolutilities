import React, { useEffect } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";
import { InputField } from "./InputField";
import { Button } from "./Button";
import Link from "next/link";
import { regex } from "../misc/regex";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { logout } from "../misc/authHelper";
import validator from "validator";
import { LENGTHS, PASSWORD } from "../misc/parameterConstants";
import { Separator } from "./Separator";

type Props = {};

const ChangeLogsLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "1",
  width: "100vw",
  maxWidth: "1000px",
  padding: "6vh 7vw",
  gap: "60px",

  "@mobileOnly": {
    gridTemplateColumns: "1fr",
    gap: "30px",
  },
});

const ChangeLogLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "3vh 3vw",
  backgroundColor: "$backgroundTertiary",
  borderRadius: "15px",
  cursor: "pointer",
});

const StyledLink = styled("a", {
  color: "$fontPrimary",
  textDecoration: "none",
});

const StyledDate = styled("p", {
  fontSize: "0.9rem",
});

const StyledHeadline = styled("h2", {
  margin: "5px 0",
});

const StyledText = styled("p", {
  marginTop: "10px",
});

const BoxLayout = styled("div", {
  display: "flex",
  width: "100vw",
  justifyContent: "center",
});

export const Changelog: React.FC<Props> = ({ }) => {
  const entries = [
    {
      name: "0.1.2-courses-element-creation",
      date: "March 6, 2022",
      headline: "Version 0.1.2",
      text: "In this release we add the ability to create elements in courses.\n\nClick the box to read more!",
    },
    {
      name: "0.1.1-courses-bug-fixes",
      date: "January 16, 2022",
      headline: "Version 0.1.1",
      text: "This is our second release. In this release we fix bugs and add more features.\n\nClick the box to read more!",
    },
    {
      name: "0.1-login-registration-school-create",
      date: "December 20, 2021",
      headline: "Version 0.1",
      text: "This is our very first release. In this release we present login, registration, school creation and much more.\n\nClick the box to read more!",
    },
  ];

  return (
    <>
      <BoxLayout>
        <ChangeLogsLayout>
          {entries.map((entry) => (
            <Link href={`/change-logs/${entry.name}`}>
              <StyledLink>
                <ChangeLogLayout>
                  <StyledDate>{entry.date}</StyledDate>
                  <StyledHeadline>{entry.headline}</StyledHeadline>
                  <Separator width="small" alignment="left"></Separator>
                  <StyledText>{entry.text}</StyledText>
                </ChangeLogLayout>
              </StyledLink>
            </Link>
          ))}
        </ChangeLogsLayout>
      </BoxLayout>
    </>
  );
};
