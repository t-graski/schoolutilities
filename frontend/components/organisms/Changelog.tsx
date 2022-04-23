import React from "react";
import { styled } from "../../stitches.config";
import Link from "next/link";
import { Separator } from "../atoms/Separator";
import Skeleton from "react-loading-skeleton";

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
      name: "new-course-elements-bug-fixes",
      date: "April 23, 2022",
      headline: "April 23, 2022 - Patch Notes",
      text: "Today  we are releasing a new course element, bug fixes and many changes.\n\nClick the box to read more!",
    },
    {
      name: "courses-element-creation",
      date: "March 6, 2022",
      headline: "March 6, 2022 - Patch Notes",
      text: "In this release we add the ability to create elements in courses.\n\nClick the box to read more!",
    },
    {
      name: "courses-bug-fixes",
      date: "January 16, 2022",
      headline: "January 16, 2022 - Patch Notes",
      text: "This is our second release. In this release we fix bugs and add more features.\n\nClick the box to read more!",
    },
    {
      name: "login-registration-school-create",
      date: "December 20, 2021",
      headline: "December 20, 2021 - Patch Notes",
      text: "This is our very first release. In this release we present login, registration, school creation and much more.\n\nClick the box to read more!",
    },
  ];

  return (
    <>
      <BoxLayout>
        <ChangeLogsLayout>
          {entries.length > 0 ? entries.map((entry) => (
            <Link href={`/change-logs/${entry.name}`} passHref>
              <StyledLink>
                <ChangeLogLayout>
                  {/* <StyledDate>{entry.date}</StyledDate> */}
                  <StyledHeadline>{entry.headline}</StyledHeadline>
                  <Separator width="small" alignment="left"></Separator>
                  <StyledText>{entry.text}</StyledText>
                </ChangeLogLayout>
              </StyledLink>
            </Link>
          )) : (
            <>
              <Skeleton width="100%" height={200}></Skeleton>
              <Skeleton width="100%" height={200}></Skeleton>
              <Skeleton width="100%" height={200}></Skeleton>
              <Skeleton width="100%" height={200}></Skeleton>
            </>
          )}
        </ChangeLogsLayout>
      </BoxLayout>
    </>
  );
};
