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

export const SetupProgressSite: React.FC<Props> = ({ steps }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [statusInfo, setStatusInfo] = useState("");

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

  function saveInputs() {
    const schoolDetails = JSON.parse(localStorage.getItem("schoolDetails"));
    console.log({
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.get("accessToken")}`,
    });
    fetch("http://localhost:8888/api/schooladmin/addschoolconfig", {
      method: "POST",
      body: JSON.stringify({
        name: schoolDetails.schoolName,
        languageId: 2,
        timezone: schoolDetails.schoolTimezone,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.get("accessToken")}`,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          setStatusInfo("School added");
          return response.json();
        } else {
          setStatusInfo("There was an error creating the school");
        }
      })
      .then(async (data) => {
        if (data && data.schoolId) {
          let creationGoneWrong = false;
          const storage = JSON.parse(localStorage.getItem("departments"));
          await storage.departments.forEach(async (department) => {
            await fetch("http://localhost:8888/api/schooladmin/addDepartment", {
              method: "POST",
              body: JSON.stringify({
                name: department,
                schoolId: data.schoolId,
                isVisible: true,
                childsVisible: true,
              }),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookie.get("accessToken")}`,
              },
            }).then((response) => {
              if (response.status != 200) {
                creationGoneWrong = true;
              }
            });
          });
          if (creationGoneWrong) {
            setStatusInfo("There was an error creating the departments");
          } else {
            setStatusInfo("School successfully created");
          }
        }
      });
  }

  return (
    <>
      {!statusInfo ? (
        <ProgressLayout>
          {steps.map((step, index) => {
            if (index == activeStep) {
              return (
                <step.component key={index} setDisabled={setIsButtonDisabled} />
              );
            }
          })}
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
                onClick={() => {
                  if (activeStep + 1 === steps.length) {
                    saveInputs();
                    cookie.remove("activeStep");
                  } else {
                    setActiveStep(activeStep + 1);
                  }
                }}
              ></Button>
            </ButtonLayout>
          </NavigationLayout>
        </ProgressLayout>
      ) : (
        <h2>{statusInfo}</h2>
      )}
    </>
  );
};
