import React from "react";
import { styled } from "../../stitches.config";
import Link from "next/link";
import { Separator } from "../atoms/Separator";

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
  backgroundColor: "$surface2",
  borderRadius: "15px",
  cursor: "pointer",
  transition: "all 200ms",

  "&:hover": {
    backgroundColor: "$surface4",
  },
});

const StyledLink = styled(Link, {
  color: "$onSurface",
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
            <StyledLink
              href={`/change-logs/${entry.name}`}
              passHref
              key={index}
            >
              <ChangeLogLayout>
                <StyledHeadline>{entry.headline}</StyledHeadline>
                <Separator width="small" alignment="left"></Separator>
                <StyledText>{entry.text}</StyledText>
              </ChangeLogLayout>
            </StyledLink>
          ))}
        </ChangeLogsLayout>
      </BoxLayout>
    </>
  );
};
