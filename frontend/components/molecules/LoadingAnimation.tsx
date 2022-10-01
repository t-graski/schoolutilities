import React from "react";
import { styled } from "../../stitches.config";
import { keyframes } from "@stitches/react";

type Props = {
  isVisible?: boolean;
};

const loadingAnimation = keyframes({
  "0%": {
    transform: "translate(0,0)",
  },
  "50%": {
    transform: "translate(0,15px)",
  },
  "100%": {
    transform: "translate(0,0)",
  },
});

const LoadWrapp = styled("div", {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
  backgroundColor: "none",
  variants: {
    isVisible: {
      true: {},
      false: {
        display: "none",
      },
    },
  },
});

const LoadLayout = styled("div", {
  display: "flex",
  gap: "10px",
});

const LoadLine = styled("div", {
  display: "inline-block",
  width: "15px",
  height: "15px",
  borderRadius: "15px",
  backgroundColor: "$warning",

  "&:nth-child(1)": {
    animation: `${loadingAnimation} 0.6s 0.1s infinite ease-in-out`,
  },
  "&:nth-child(2)": {
    animation: `${loadingAnimation} 0.6s 0.2s infinite ease-in-out`,
  },
  "&:nth-child(3)": {
    animation: `${loadingAnimation} 0.6s 0.3s infinite ease-in-out`,
  },
});

export const LoadingAnimation: React.FC<Props> = ({ isVisible = true }) => {
  return (
    <>
      <LoadWrapp isVisible={isVisible}>
        <LoadLayout>
          <LoadLine></LoadLine>
          <LoadLine></LoadLine>
          <LoadLine></LoadLine>
        </LoadLayout>
      </LoadWrapp>
    </>
  );
};
