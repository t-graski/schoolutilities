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
  visible: boolean;
};

const PopOverLayout = styled("div", {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "$backgroundTertiary",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "10px",
    gap: "10px",
    zIndex: "20",
    variants: {
        visible: {
            true: {
                display: "flex",
            },
            false: {
                display: "none",
            },
        },
    },
});

export const NavbarPopOver: React.FC<Props> = ({
    visible,
}) => {
  return (
    <>
        <PopOverLayout visible={visible}>

        </PopOverLayout>
    </>
  );
};

export default NavbarPopOver;
