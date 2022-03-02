import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Nestable, { Item } from "react-nestable";

// this usually goes once
// to the entry point of the whole app
// (e.g. src/index.js)
import "react-nestable/dist/styles/index.css";
import "./CourseContent.module.css";
import { SvgIcon } from "./SvgIcon";
import { styled } from "@stitches/react";

type Props = {
  text: string;
};

export const CourseText: React.FC<Props> = ({
  text
}) => {
  return (
    <>
      <p>{text}</p>
    </>
  );
};

export default CourseText;
