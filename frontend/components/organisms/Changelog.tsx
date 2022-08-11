import React from "react";
import { styled } from "../../stitches.config";
import Link from "next/link";
import Separator from "../atoms/Separator";

type Props = {
  entries: {
    name: string;
    date: string;
    headline: string;
    text: string;
  }[];
};

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

export const Changelog: React.FC<Props> = ({ entries }) => {
  return (
    <>
      <BoxLayout>
        <ChangeLogsLayout>
          {entries.map((entry, index) => (
            <Link href={`/change-logs/${entry.name}`} passHref key={index}>
              <StyledLink>
                <ChangeLogLayout>
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
