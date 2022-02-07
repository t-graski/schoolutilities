import React, { useEffect, useState } from "react";
import { styled, keyframes } from "@stitches/react";
import cookie from "js-cookie";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { SvgIcon } from "./SvgIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAccessToken, getUserData, logout } from "../misc/authHelper";
import { useTheme } from "next-themes";

type Props = {courseId: string};

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

const StyledContent = styled(DropdownMenuPrimitive.Content, {
  minWidth: 220,
  backgroundColor: "$backgroundSecondary",
  borderRadius: 15,
  padding: 8,
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
});

const itemStyles = {
  all: "unset",
  lineHeight: 1,
  color: "$fontPrimary",
  borderRadius: 5,
  display: "flex",
  alignItems: "center",
  height: 25,
  fontWeight: "500",
  fontSize: "1.05rem",
  padding: "3px 8px",
  position: "relative",
  paddingLeft: 25,
  userSelect: "none",
  cursor: "pointer",

  "&[data-disabled]": {
    color: "$fontPrimary",
    pointerEvents: "none",
  },

  "&:focus": {
    backgroundColor: "$specialPrimary",
    color: "$fontPrimary",
  },
};

const StyledItem = styled(DropdownMenuPrimitive.Item, {
  ...itemStyles,
  paddingLeft: "10px",
  padding: "7px",
  gap: "15px",
  display: "flex",
});
const StyledCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem, {
  ...itemStyles,
});
const StyledRadioItem = styled(DropdownMenuPrimitive.RadioItem, {
  ...itemStyles,
});
const StyledTriggerItem = styled(DropdownMenuPrimitive.TriggerItem, {
  '&[data-state="open"]': {
    backgroundColor: "$specialPrimary",
    color: "$fontPrimary",
  },
  ...itemStyles,
});

const StyledLabel = styled(DropdownMenuPrimitive.Label, {
  paddingLeft: 25,
  fontSize: 12,
  lineHeight: "25px",
  color: "$fontPrimary",
});

const StyledSeparator = styled(DropdownMenuPrimitive.Separator, {
  height: 1,
  backgroundColor: "$fontPrimary",
  margin: 5,
});

const StyledItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator, {
  position: "absolute",
  left: 0,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledArrow = styled(DropdownMenuPrimitive.Arrow, {
  fill: "$fontPrimary",
  position: "relative",
  right: 0,
});

// Exports
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = StyledContent;
export const DropdownMenuItem = StyledItem;
export const DropdownMenuCheckboxItem = StyledCheckboxItem;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuRadioItem = StyledRadioItem;
export const DropdownMenuItemIndicator = StyledItemIndicator;
export const DropdownMenuTriggerItem = StyledTriggerItem;
export const DropdownMenuLabel = StyledLabel;
export const DropdownMenuSeparator = StyledSeparator;
export const DropdownMenuArrow = StyledArrow;

const Box = styled("div", {});

const IconLayout = styled("div", {
  width: "35px",
  cursor: "pointer",
});

const DropdownMenuItemSvgLayout = styled("div", {
  width: "20px",
});

export const CourseMenu: React.FC<Props> = ({
  courseId,
}) => {
  const router = useRouter();

  return (
    <Box>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconLayout>
            <SvgIcon iconName="SvgHamburger"></SvgIcon>
          </IconLayout>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          sideOffset={5}
          alignOffset={30}
          side="right"
          align="center"
        >
          <DropdownMenuItem onClick={() => {}}>
            <DropdownMenuItemSvgLayout>
              <SvgIcon iconName="SvgFile"></SvgIcon>
            </DropdownMenuItemSvgLayout>
            Upload file
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>
            <DropdownMenuItemSvgLayout>
              <SvgIcon iconName="SvgCheckMark"></SvgIcon>
            </DropdownMenuItemSvgLayout>
            Create Submission
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            router.push(`/school/course/${courseId}/edit`)
          }}>
            <DropdownMenuItemSvgLayout>
              <SvgIcon iconName="SvgEdit"></SvgIcon>
            </DropdownMenuItemSvgLayout>
            Edit course
          </DropdownMenuItem>
          <DropdownMenuArrow />
        </DropdownMenuContent>
      </DropdownMenu>
    </Box>
  );
};

export default CourseMenu;
