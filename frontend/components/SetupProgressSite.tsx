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

  if (cookie.get("activeStep")) {
    if (activeStep == -1) {
      // setActiveStep(parseInt(cookie.get("activeStep")));
      setActiveStep(0);
    } else if (activeStep != parseInt(cookie.get("activeStep"))) {
      cookie.set("activeStep", activeStep);
    }
  } else if (activeStep == -1) {
    setActiveStep(0);
    cookie.set("activeStep", activeStep);
  }

  function saveInputs() {
    // fetch("http://localhost:8888/api/schooladmin/addschoolconfig", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     name: ,
    //     languageId: 1,
    //     timezone: ""
    //   }),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((response) => {
    //     if (response.status == 200) {
    //       setSignUpInfo("You are logged in");
    //       return response.json();
    //     } else {
    //       setSignUpInfo("You are not logged in");
    //     }
    //   })
    //   .then((data) => {
    //     if (data) {
    //       cookie.set("accessToken", data.access_token, { expires: 1 / 96 });
    //       cookie.set("refreshToken", data.refresh_token, { expires: 7 });
    //     }
    //   });
  }

  return (
    <>
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
    </>
  );
};
