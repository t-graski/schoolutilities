import React from "react";
import { styled, keyframes } from "@stitches/react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import SvgInfo from "./svg/SvgInfo";

type Props = {};

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const StyledContent = styled(HoverCardPrimitive.Content, {
  borderRadius: 6,
  padding: 20,
  width: 400,

  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    animationFillMode: "forwards",
    willChange: "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
  backgroundColor: "$backgroundPrimary",
});

const StyledArrow = styled(HoverCardPrimitive.Arrow, {
  fill: "$backgroundPrimary",
});

// Exports
export const HoverCard = HoverCardPrimitive.Root;
export const HoverCardTrigger = HoverCardPrimitive.Trigger;
export const HoverCardContent = StyledContent;
export const HoverCardArrow = StyledArrow;

const ImageLayout = styled("div", {
  display: "flex",
  width: "30px",
  height: "30px",

  color: "$fontPrimary",
  cursor: "pointer",
});

export const InfoHoverCard: React.FC<Props> = ({ children }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <ImageLayout>
          <SvgInfo />
        </ImageLayout>
      </HoverCardTrigger>
      <HoverCardContent sideOffset={5}>
        {children}
        <HoverCardArrow />
      </HoverCardContent>
    </HoverCard>
  );
};

export default InfoHoverCard;
