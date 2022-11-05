import React, { useState } from "react";
import { styled } from "../../../stitches.config";
import { Button } from "../../atoms/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { Progressbar } from "../../molecules/Progressbar";
import { Spacer } from "../../atoms/Spacer";
import { getAccessToken } from "../../../utils/authHelper";

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
  color: "$neutral-500",
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
        color: "$warning",
      },
      error: {
        color: "$error",
      },
    },
  },
});

const SuccessDescription = styled("p", {
  fontSize: "1.5rem",
});

const StyledLink = styled("a", {
  color: "$onPrimaryContainer",
  backgroundColor: "$primaryContainer",
  fontSize: "1.2rem",
  fontWeight: "bold",
  padding: "20px",
  borderRadius: "25px",
  textDecoration: "none",
  cursor: "pointer",
  transition: "all 0.2s",

  "&:hover": {
    opacity: 0.8,
  },
});

export const CourseCreateProgressSite: React.FC<Props> = ({ steps }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [activeStep, setActiveStep] = useState(-1);
  const [statusInfo, setStatusInfo] = useState(null);
  const router = useRouter();

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
    console.log({
      courseName: inputData.courseName,
      schoolUUID: router.query.schoolUUID as string,
      courseDescription: inputData.courseDescription,
      courseClasses: inputData.classes.map((schoolClass) => schoolClass.value),
      users: inputData.members.map((person) => person.value),
    });
    const schoolResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course`,
      {
        method: "POST",
        body: JSON.stringify({
          courseName: inputData.courseName,
          schoolUUID: router.query.schoolUUID as string,
          courseDescription: inputData.courseDescription,
          courseClasses: inputData.classes.map((schoolClass) => schoolClass.value),
          users: inputData.members.map((person) => person.value),
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (schoolResponse) {
      if (schoolResponse.status == 201) {
        setStatusInfo({
          statusHeadline: "Your Course was successfully created",
          statusDescription:
            "You can now manage your course, create classes and add users to your course.",
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
              <step.component
                key={index}
                setDisabled={setIsButtonDisabled}
                inputData={inputData}
                setInputData={setInputData}
              />
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
                {/* <SvgIcon iconName={statusInfo.statusIcon}></SvgIcon> */}
              </SuccessImageLayout>
              <SuccessDescription>
                {statusInfo && statusInfo.statusDescription}
              </SuccessDescription>
              {statusInfo && statusInfo.linkVisibility && (
                <Link href="/school/course" passHref>
                  <StyledLink>Manage course now</StyledLink>
                </Link>
              )}
            </SuccessLayout>
          </>
        )}
        <Spacer size="small"></Spacer>
        <NavigationLayout>
          <Button
            isDisabled={activeStep === 0 || isButtonDisabled}
            buttonType="filled"
            onClick={() => {
              setActiveStep(activeStep - 1);
            }}
            isVisible={!statusInfo}
          >
            BACK
          </Button>
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
            >
              {activeStep + 1 === steps.length ? "FINISH" : "NEXT"}
            </Button>
          </ButtonLayout>
        </NavigationLayout>
      </ProgressLayout>
    </>
  );
};
