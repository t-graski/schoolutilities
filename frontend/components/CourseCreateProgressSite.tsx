import React, { useEffect, useState } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";
import { InputField } from "./InputField";
import { Button } from "./Button";
import Link from "next/link";
import { regex } from "../misc/regex";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { Progressbar } from "./Progressbar";
import { Spacer } from "./Spacer";
import { SvgIcon } from "./SvgIcon";
import { Headline } from "./Headline";
import { getAccessToken } from "../misc/authHelper";

type Props = {
  steps: {
    label: string;
    component: any;
  }[];
};

const ProgressLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const NavigationLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 6fr 1fr",
  gap: "30px",
  justifyContent: "space-between",
});

const ProgressbarLayout = styled("div", {
  display: "flex",
});

const ButtonLayout = styled("div", {
  justifySelf: "flex-end",
});

const SuccessLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "0 10vw",
  gap: "40px",
  color: "$fontPrimary",
});

const StyledHeadline = styled("h1", {
  fontSize: "2.5rem",
  fontWeight: "bold",
  textAlign: "center",
});

const SuccessImageLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100px",
  height: "100px",

  variants: {
    color: {
      success: {
        color: "$specialPrimary",
      },
      error: {
        color: "$specialTertiary",
      },
    },
  },
});

const SuccessDescription = styled("p", {
  fontSize: "1.5rem",
});

const StyledLink = styled("a", {
  color: "$specialPrimary",
  fontSize: "1.2rem",
  fontWeight: "bold",
  padding: "20px",
  border: "2px solid $specialPrimary",
  borderRadius: "25px",
  textDecoration: "none",
  cursor: "pointer",
  transition: "all 0.2s",

  "&:hover": {
    backgroundColor: "$specialPrimary",
    color: "$fontPrimary",
  },
});

export const CourseCreateProgressSite: React.FC<Props> = ({ steps }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [activeStep, setActiveStep] = useState(-1);
  const [statusInfo, setStatusInfo] = useState(null);

  const [inputData, setInputData] = useState({
    courseName: "",
    courseDescription: "",
    classes: [],
    members: [],
  });

  if (cookie.get("activeStep")) {
    if (activeStep == -1) {
      setActiveStep(0);
    } else if (activeStep != parseInt(cookie.get("activeStep"))) {
      cookie.set("activeStep", activeStep);
    }
  } else if (activeStep == -1) {
    setActiveStep(0);
    cookie.set("activeStep", activeStep);
  }

  async function saveInputs() {
    let accessToken = await getAccessToken();
    const schoolDetails = JSON.parse(localStorage.getItem("schoolDetails"));
    console.log({
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    });
    const schoolResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/addschoolconfig`,
      {
        method: "POST",
        body: JSON.stringify({
          name: schoolDetails.schoolName,
          languageId: 2,
          timezone: schoolDetails.schoolTimezone,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (schoolResponse) {
      if (schoolResponse.status == 200) {
        setStatusInfo({
          statusHeadline: "Your Course was successfully created",
          statusDescription:
            "You can now manage your couirse, create classes and add users to your course.",
          statusIcon: "SvgQuality",
          statusColor: "success",
          linkVisibility: true,
        });
      } else {
        setStatusInfo({
          statusHeadline: "There was an error creating the course",
          statusDescription: "Please try again later",
          statusIcon: "SvgWarning",
          statusColor: "error",
          linkVisibility: false,
        });
      }
    }
  }

  return (
    <>
      <ProgressLayout>
        {steps.map((step, index) => {
          if (index == activeStep) {
            return (
              <step.component key={index} setDisabled={setIsButtonDisabled} inputData={inputData} setInputData={setInputData} />
            );
          }
        })}
        {steps.length == activeStep && statusInfo && (
          <>
            <SuccessLayout>
              <StyledHeadline>
                {statusInfo && statusInfo.statusHeadline}
              </StyledHeadline>
              <SuccessImageLayout color={statusInfo && statusInfo.statusColor}>
                <SvgIcon iconName={statusInfo.statusIcon}></SvgIcon>
              </SuccessImageLayout>
              <SuccessDescription>
                {statusInfo && statusInfo.statusDescription}
              </SuccessDescription>
              {statusInfo && statusInfo.linkVisibility && (
                <Link href="/school/admin/settings">
                  <StyledLink>Manage course now</StyledLink>
                </Link>
              )}
            </SuccessLayout>
          </>
        )}
        <Spacer size="small"></Spacer>
        <NavigationLayout>
          <Button
            disabled={activeStep === 0 || isButtonDisabled}
            backgroundColor="primary"
            color="primary"
            label="BACK"
            onClick={() => {
              setActiveStep(activeStep - 1);
            }}
            isVisible={!statusInfo}
          ></Button>
          <ProgressbarLayout>
            <Progressbar
              steps={steps}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </ProgressbarLayout>
          <ButtonLayout>
            <Button
              disabled={
                (activeStep + 1 === steps.length && isButtonDisabled) ||
                isButtonDisabled
              }
              backgroundColor="primary"
              color="primary"
              label={activeStep + 1 === steps.length ? "FINISH" : "NEXT"}
              onClick={async () => {
                if (activeStep + 1 === steps.length) {
                  await saveInputs();
                  cookie.remove("activeStep");
                  setActiveStep(activeStep + 1);
                } else {
                  setActiveStep(activeStep + 1);
                }
              }}
              isVisible={!statusInfo}
            ></Button>
          </ButtonLayout>
        </NavigationLayout>
      </ProgressLayout>
    </>
  );
};
