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
    isDone: boolean;
    isActive: boolean;
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
  const [progressbarContent, setProgressbarContent] = useState([]);
  let tempProgressbarContent = [];
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  steps.forEach((step, index) => {
    tempProgressbarContent.push({
      label: step.label,
      isDone: step.isDone,
      isActive: step.isActive,
    });
  });

  useEffect(() => {
    steps.forEach((step, index) => {
      if (step.isActive) {
        setActiveStep(index);
      }
    });
    setProgressbarContent(tempProgressbarContent);
  }, [steps]);

  function changePage(stepLength: number) {
    if (
      activeStep + stepLength >= 0 &&
      activeStep + stepLength < progressbarContent.length
    ) {
      setActiveStep(activeStep + stepLength);

      tempProgressbarContent = tempProgressbarContent.map((step, index) => {
        if (index === activeStep + stepLength) {
          step.isActive = true;
        } else {
          step.isActive = false;
        }
        if (index < activeStep + stepLength) {
          step.isDone = true;
        } else {
          step.isDone = false;
        }
        return step;
      });
      setProgressbarContent(tempProgressbarContent);
    }
  }

  return (
    <>
      <ProgressLayout>
        {steps.map((step, index) => {
          if (step.isActive) {
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
              changePage(-1);
            }}
          ></Button>
          <ProgressbarLayout>
            <Progressbar steps={progressbarContent} />
          </ProgressbarLayout>
          <ButtonLayout>
            <Button
              disabled={
                activeStep + 1 === progressbarContent.length || isButtonDisabled
              }
              backgroundColor="primary"
              color="primary"
              label="NEXT"
              onClick={() => {
                console.log(localStorage.getItem("schoolDetails"))
                changePage(1);
              }}
            ></Button>
          </ButtonLayout>
        </NavigationLayout>
      </ProgressLayout>
    </>
  );
};
