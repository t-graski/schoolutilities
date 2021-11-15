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

type Props = {
  steps: {
    label: string;
    isDone: boolean;
    isActive: boolean;
  }[];
};

const ProgressbarLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "40px",
  position: "relative",
});

const StyledProgressbar = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "0%",
  height: "10px",
  position: "absolute",
  top: "15px",
  left: "0",
  backgroundColor: "#759F81",
  borderRadius: "5px",
  overflow: "hidden",
  transition: "width 0.5s ease",
});

const StyledProgressbarBackground = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "10px",
  position: "absolute",
  top: "15px",
  left: "0",
  backgroundColor: "rgba(0,0,0,0.2)",
  borderRadius: "5px",
  overflow: "hidden",
});

const ProgressPoint = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "40px",
  height: "40px",
  position: "absolute",
  top: "0",
  left: "50%",
  backgroundColor: "#3c413e",
  borderRadius: "20px",
  overflow: "hidden",
  variants: {
    state: {
      done: {
        backgroundColor: "#759F81",
      },
      active: {
        backgroundColor: "#c9cc08",
      },
      default: {},
    },
  },
});

export const Progressbar: React.FC<Props> = ({ steps }) => {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    for (let i = steps.length; i > 0; i--) {
      if (steps[i - 1].isDone) {
        setProgress((i * 100) / steps.length + 1);
        break;
      }
    }
  });

  return (
    <>
      <ProgressbarLayout>
        <StyledProgressbar
          css={{
            width: `${progress}%`,
          }}
        ></StyledProgressbar>
        <StyledProgressbarBackground></StyledProgressbarBackground>
        {steps.map((step, index) => {
          const stepProgress = (index * 100) / steps.length;
          return (
            <ProgressPoint
              key={index}
              css={{
                left: `${stepProgress + 100 / steps.length}%`,
              }}
              state={
                step.isDone ? "done" : step.isActive ? "active" : "default"
              }
            ></ProgressPoint>
          );
        })}
      </ProgressbarLayout>
    </>
  );
};