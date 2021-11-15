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

export const SetupProgressSite: React.FC<Props> = ({ steps }) => {
  const [progressbarContent, setProgressbarContent] = useState([]);
  let tempProgressbarContent = [];

  useEffect(() => {
    steps.forEach((step) => {
      tempProgressbarContent.push({
        label: step.label,
        isDone: step.isDone,
        isActive: step.isActive,
      });
    });
    setProgressbarContent(tempProgressbarContent);
  }, [steps]);

  return (
    <>
      <ProgressLayout>
        {steps.map((step, index) => {
            <step.component />
        })}
        <Progressbar steps={progressbarContent} />
      </ProgressLayout>
    </>
  );
};
