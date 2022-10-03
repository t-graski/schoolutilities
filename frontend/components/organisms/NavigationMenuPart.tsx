import React from "react";
import { styled, keyframes } from "@stitches/react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { violet } from "@radix-ui/colors";
import Link from "next/link";
import { getSelectedSchool } from "../../utils/authHelper";

const enterFromRight = keyframes({
  from: { transform: "translateX(200px)", opacity: 0 },
  to: { transform: "translateX(0)", opacity: 1 },
});

const enterFromLeft = keyframes({
  from: { transform: "translateX(-200px)", opacity: 0 },
  to: { transform: "translateX(0)", opacity: 1 },
});

const exitToRight = keyframes({
  from: { transform: "translateX(0)", opacity: 1 },
  to: { transform: "translateX(200px)", opacity: 0 },
});

const exitToLeft = keyframes({
  from: { transform: "translateX(0)", opacity: 1 },
  to: { transform: "translateX(-200px)", opacity: 0 },
});

const scaleIn = keyframes({
  from: { transform: "rotateX(-30deg) scale(0.9)", opacity: 0 },
  to: { transform: "rotateX(0deg) scale(1)", opacity: 1 },
});

const scaleOut = keyframes({
  from: { transform: "rotateX(0deg) scale(1)", opacity: 1 },
  to: { transform: "rotateX(-10deg) scale(0.95)", opacity: 0 },
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const StyledMenu = styled(NavigationMenuPrimitive.Root, {
  position: "relative",
  zIndex: 1,

  display: "flex",
  justifyContent: "center",
  width: "60vw",
});

const StyledList = styled(NavigationMenuPrimitive.List, {
  all: "unset",

  display: "flex",
  justifyContent: "center",
  padding: 4,
  borderRadius: 6,

  listStyle: "none",
  backgroundColor: "transparent",
});

const itemStyles = {
  padding: "8px 12px",
  borderRadius: 4,

  fontSize: 15,
  color: "$neutral-500",
  lineHeight: 1,
  fontWeight: "$medium",
  outline: "none",
  userSelect: "none",

  "&:focus": { position: "relative", boxShadow: `0 0 0 2px ${violet.violet7}` },
  "&:hover": { backgroundColor: "$neutral-400" },
};

const StyledTrigger = styled(NavigationMenuPrimitive.Trigger, {
  all: "unset",

  ...itemStyles,

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,

  fontSize: "1.5rem",
  cursor: "pointer",
});

const StyledCaret = styled(CaretDownIcon, {
  position: "relative",
  top: 1,

  color: "$neutral-500",

  "[data-state=open] &": { transform: "rotate(-180deg)" },
  "@media (prefers-reduced-motion: no-preference)": {
    transition: "transform 250ms ease",
  },
});

const StyledTriggerWithCaret = React.forwardRef<any>(function Content(
  { children, ...props },
  forwardedRef
) {
  return (
    <StyledTrigger {...props} ref={forwardedRef}>
      {children}
      <StyledCaret aria-hidden />
    </StyledTrigger>
  );
});

const StyledLink = styled(Link, {
  ...itemStyles,

  display: "block",
  width: "100%",
  height: "100%",

  textDecoration: "none",
  fontSize: 15,
  lineHeight: 1,
});

const StyledContent = styled(NavigationMenuPrimitive.Content, {
  position: "absolute",
  top: 0,
  left: 0,

  width: "100%",

  "@media only screen and (min-width: 600px)": { width: "auto" },
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "250ms",
    animationTimingFunction: "ease",
    '&[data-motion="from-start"]': { animationName: enterFromLeft },
    '&[data-motion="from-end"]': { animationName: enterFromRight },
    '&[data-motion="to-start"]': { animationName: exitToLeft },
    '&[data-motion="to-end"]': { animationName: exitToRight },
  },
});

const StyledIndicator = styled(NavigationMenuPrimitive.Indicator, {
  zIndex: 1,
  top: "100%",

  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  height: 10,
  overflow: "hidden",

  "@media (prefers-reduced-motion: no-preference)": {
    transition: "width, transform 250ms ease",
    '&[data-state="visible"]': { animation: `${fadeIn} 200ms ease` },
    '&[data-state="hidden"]': { animation: `${fadeOut} 200ms ease` },
  },
});

const StyledArrow = styled("div", {
  position: "relative",
  top: "70%",
  transform: "rotate(45deg)",

  width: 10,
  height: 10,
  borderTopLeftRadius: 2,

  backgroundColor: "white",
});

const StyledIndicatorWithArrow = React.forwardRef<any>(function Content(
  props,
  forwardedRef
) {
  return (
    <StyledIndicator {...props} ref={forwardedRef}>
      <StyledArrow />
    </StyledIndicator>
  );
});

const StyledViewport = styled(NavigationMenuPrimitive.Viewport, {
  position: "relative",
  transformOrigin: "top center",

  marginTop: 10,
  width: "100%",
  borderRadius: 6,
  overflow: "hidden",
  height: "var(--radix-navigation-menu-viewport-height)",

  backgroundColor: "$neutral-100",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",

  "@media only screen and (min-width: 600px)": {
    width: "var(--radix-navigation-menu-viewport-width)",
  },
  "@media (prefers-reduced-motion: no-preference)": {
    transition: "width, height, 300ms ease",
    '&[data-state="open"]': { animation: `${scaleIn} 200ms ease` },
    '&[data-state="closed"]': { animation: `${scaleOut} 200ms ease` },
  },
});

// Exports
const NavigationMenu = StyledMenu;
const NavigationMenuList = StyledList;
const NavigationMenuItem = NavigationMenuPrimitive.Item;
const NavigationMenuTrigger = StyledTriggerWithCaret;
const NavigationMenuLink = StyledLink;
const NavigationMenuContent = StyledContent;
const NavigationMenuViewport = StyledViewport;
const NavigationMenuIndicator = StyledIndicatorWithArrow;

// Your app...
const ContentList = styled("ul", {
  display: "grid",
  padding: 22,
  margin: 0,
  columnGap: 10,
  listStyle: "none",

  variants: {
    layout: {
      one: {
        "@media only screen and (min-width: 600px)": {
          width: 500,
          gridTemplateColumns: ".75fr 1fr",
        },
      },
      two: {
        "@media only screen and (min-width: 600px)": {
          width: 600,
          gridAutoFlow: "column",
          gridTemplateRows: "repeat(2, 1fr)",
        },
      },
    },
  },
});

const ListItem = styled("li", {});

const LinkTitle = styled("div", {
  marginBottom: 5,

  fontWeight: "$bold",
  lineHeight: 1.2,
  color: "$neutral-500",
});

const LinkText = styled("p", {
  color: "$neutral-500",
  lineHeight: 1.4,
  fontWeight: "initial",
});

const StyledA = styled("a", {
  width: "100%",
  height: "100%",
  padding: "8px",
  display: "block",
  borderRadius: 5,

  transition: "background-color 250ms ease",
  color: "$neutral-500",
  textDecoration: "none",

  "&:hover": {
    backgroundColor: "$neutral-300",
  },
});

const ContentListItem = React.forwardRef<any, any>(function Content(
  { children, title, ...props },
  forwardedRef
) {
  return (
    <ListItem>
      <NavigationMenuLink
        {...props}
        ref={forwardedRef}
        css={{
          padding: 12,
          borderRadius: 6,
          transition: "background-color 150ms ease",
          "&:hover": { backgroundColor: "$neutral-300" },
        }}
        passHref
      >
        <StyledA>
          <LinkTitle>{title}</LinkTitle>
          <LinkText>{children}</LinkText>
        </StyledA>
      </NavigationMenuLink>
    </ListItem>
  );
});

const ViewportPosition = styled("div", {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  width: "100%",
  top: "100%",
  left: 0,
  perspective: "2000px",
});

export const NavigationMenuPart = () => {
  const schoolUUID = getSelectedSchool();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {/*@ts-ignore */}
          <NavigationMenuTrigger>Dropdown</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ContentList layout="two">
              <ContentListItem
                title="Courses"
                href={
                  schoolUUID
                    ? `/school/${schoolUUID}/course`
                    : "/school/select?redirect=/course"
                }
              >
                This is where everything happens.
              </ContentListItem>
              <ContentListItem
                title="Dashboard"
                href="/school/select?redirect=/dashboard"
              >
                Maintain a clean and organized environment for managing
                everything you can imagine.
              </ContentListItem>
              <ContentListItem title="Discord Bot" href="/bot">
                If you fell like you are not receiving enough notifications you
                can add our discord bot to your personal server.
              </ContentListItem>
              <ContentListItem title="Premium" href="/premium/plans">
                With SchoolUtilities&apos; premium features, your school can
                unleash it&apos;s full potential.
              </ContentListItem>
            </ContentList>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          {/*@ts-ignore */}
          <NavigationMenuTrigger>Help</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ContentList layout="two">
              <ContentListItem title="Tutorials" href="/help">
                Learn how to deal with all of our features.
              </ContentListItem>
              <ContentListItem title="Patch Notes" href="/help">
                See our incredible innovations for each release and also what we
                have messed up in earlier releases.
              </ContentListItem>
              <ContentListItem title="About" href="/about-us">
                Get acquainted with the whole story about SchoolUtilities.
              </ContentListItem>
              <ContentListItem title="FAQ" href="/help/faq">
                If you have any questions, you&apos;ll probably find them here.
              </ContentListItem>
            </ContentList>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          {/*@ts-ignore */}
          <NavigationMenuTrigger>+</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ContentList layout="two">
              <ContentListItem title="New school" href="/school/create">
                Add your school to SchoolUtilities and bring the education to
                the next level.
              </ContentListItem>
              <ContentListItem
                title="Create course"
                href={schoolUUID ? `/school/${schoolUUID}/course/create` : "/school/select?redirect=/course/create"}
              >
                Create a course and start teaching your students.
              </ContentListItem>
              <ContentListItem
                title="Create timetable item"
                href={schoolUUID ? `/school/${schoolUUID}/timetable/create` : "/school/select?redirect=/timetable/create"}
              >
                Create a course and start teaching your students.
              </ContentListItem>
            </ContentList>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuIndicator />
      </NavigationMenuList>

      <ViewportPosition>
        <NavigationMenuViewport />
      </ViewportPosition>
    </NavigationMenu>
  );
};

export default NavigationMenuPart;
