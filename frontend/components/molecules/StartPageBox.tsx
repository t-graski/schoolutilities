import React from "react";
import { styled } from "../../stitches.config";
import { Button } from "../atoms/Button";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
};

const StartPageBoxLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "40vw",
  color: "$fontPrimary",
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

const StartPageBoxDescriptionLine = styled("p", {
  fontSize: "1.5rem",
  fontWeight: "$bold",
  margin: "0",
  marginBottom: "20px",
});

const StyledLink = styled("a", {
  height: "fit-content",
  lineHeight: "1.5rem",
  fontSize: "1.5rem",
  fontWeight: "$bold",
  margin: "0",
  color: "$fontPrimary",
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
}) => {
  const router = useRouter();
  return (
    <>
      <StartPageBoxLayout>
        <StartPageBoxTitle>
          LET’S MAKE
          <br />
          SCHOOL EASY.
        </StartPageBoxTitle>
        <StartPageBoxDescription>
          We think it is extremely important to bring joy into the daily
          School-Routine of students and teachers. With incredible features and
          the right design, we make this possible.
        </StartPageBoxDescription>
        <StartPageBoxDescriptionLine>
          This is SchoolUtilities.
        </StartPageBoxDescriptionLine>
        <ButtonLayout>
          <Button
            backgroundColor={"tertiary"}
            color={"primary"}
            onClick={() => {
              router.push("/auth?tab=register");
            }}
          >
            REGISTER NOW
          </Button>
          <Link href="/learn-more" passHref>
            <StyledLink>SEE FEATURES</StyledLink>
          </Link>
        </ButtonLayout>
      </StartPageBoxLayout>
    </>
  );
};
