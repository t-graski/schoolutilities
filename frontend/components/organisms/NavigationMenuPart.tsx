import React from "react";
import { styled, keyframes } from "@stitches/react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { violet, mauve, indigo, purple } from "@radix-ui/colors";

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
  display: "flex",
  justifyContent: "center",
  width: "60vw",
  zIndex: 1,
});

const StyledList = styled(NavigationMenuPrimitive.List, {
  all: "unset",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "transparent",
  padding: 4,
  borderRadius: 6,
  listStyle: "none",
});

const itemStyles = {
  padding: "8px 12px",
  outline: "none",
  userSelect: "none",
  fontWeight: 500,
  lineHeight: 1,
  borderRadius: 4,
  fontSize: 15,
  color: "$fontPrimary",
  "&:focus": { position: "relative", boxShadow: `0 0 0 2px ${violet.violet7}` },
  "&:hover": { backgroundColor: "$backgroundSecondary" },
};

const StyledTrigger = styled(NavigationMenuPrimitive.Trigger, {
  all: "unset",
  ...itemStyles,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "1.5rem",
  gap: 2,
  cursor: "pointer",
});

const StyledCaret = styled(CaretDownIcon, {
  position: "relative",
  color: "$fontPrimary",
  top: 1,
  "[data-state=open] &": { transform: "rotate(-180deg)" },
  "@media (prefers-reduced-motion: no-preference)": {
    transition: "transform 250ms ease",
  },
});

const StyledTriggerWithCaret = React.forwardRef<any>(
  ({ children, ...props }, forwardedRef) => (
    <StyledTrigger {...props} ref={forwardedRef}>
      {children}
      <StyledCaret aria-hidden />
    </StyledTrigger>
  )
);

const StyledLink = styled(NavigationMenuPrimitive.Link, {
  ...itemStyles,
  display: "block",
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
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  height: 10,
  top: "100%",
  overflow: "hidden",
  zIndex: 1,

  "@media (prefers-reduced-motion: no-preference)": {
    transition: "width, transform 250ms ease",
    '&[data-state="visible"]': { animation: `${fadeIn} 200ms ease` },
    '&[data-state="hidden"]': { animation: `${fadeOut} 200ms ease` },
  },
});

const StyledArrow = styled("div", {
  position: "relative",
  top: "70%",
  backgroundColor: "white",
  width: 10,
  height: 10,
  transform: "rotate(45deg)",
  borderTopLeftRadius: 2,
});

const StyledIndicatorWithArrow = React.forwardRef<any>(
  (props, forwardedRef) => (
    <StyledIndicator {...props} ref={forwardedRef}>
      <StyledArrow />
    </StyledIndicator>
  )
);

const StyledViewport = styled(NavigationMenuPrimitive.Viewport, {
  position: "relative",
  transformOrigin: "top center",
  marginTop: 10,
  width: "100%",
  backgroundColor: "$backgroundPrimary",
  borderRadius: 6,
  overflow: "hidden",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  height: "var(--radix-navigation-menu-viewport-height)",

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
  fontWeight: 700,
  lineHeight: 1.2,
  marginBottom: 5,
  color: "$fontPrimary",
});

const LinkText = styled("p", {
  all: "unset",
  color: "$fontPrimary",
  lineHeight: 1.4,
  fontWeight: "initial",
});

const ContentListItem = React.forwardRef<any, any>(
  ({ children, title, ...props }, forwardedRef) => {
    return (
      <ListItem>
        <NavigationMenuLink
          {...props}
          ref={forwardedRef}
          css={{
            padding: 12,
            borderRadius: 6,
            transition: "background-color 150ms ease",
            "&:hover": { backgroundColor: "$backgroundTertiary" },
          }}
        >
          <LinkTitle>{title}</LinkTitle>
          <LinkText>{children}</LinkText>
        </NavigationMenuLink>
      </ListItem>
    );
  }
);

const ContentListItemCallout = React.forwardRef<any>(
  ({ children, ...props }, forwardedRef) => (
    <ListItem css={{ gridRow: "span 3" }}>
      <NavigationMenuLink
        {...props}
        href="/"
        ref={forwardedRef}
        css={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${purple.purple9} 0%, ${indigo.indigo9} 100%);`,
          borderRadius: 6,
          padding: 25,
        }}
      >
        <svg
          aria-hidden
          width="38"
          height="38"
          viewBox="0 0 25 25"
          fill="white"
        >
          <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>
          <path d="M12 0H4V8H12V0Z"></path>
          <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>
        </svg>
        <LinkTitle
          css={{
            fontSize: 18,
            color: "white",
            marginTop: 16,
            marginBottom: 7,
          }}
        >
          Radix Primitives
        </LinkTitle>
        <LinkText
          css={{
            fontSize: 14,
            color: mauve.mauve4,
            lineHeight: 1.3,
          }}
        >
          Unstyled, accessible components for React.
        </LinkText>
      </NavigationMenuLink>
    </ListItem>
  )
);

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
                href="/school/select?redirect=/course"
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
              <ContentListItem title="Premium" href="/premium">
                Premium is a paid subscription that allows you to use even more of
                our features.
              </ContentListItem>
              {/* <ContentListItem
                title="Releases"
                href="/docs/primitives/overview/releases"
              >
                Radix Primitives releases and their changelogs.
              </ContentListItem> */}
            </ContentList>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          {/*@ts-ignore */}
          <NavigationMenuTrigger>Help</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ContentList layout="two">
              <ContentListItem
                title="Tutorials"
                href="/help"
              >
                Learn how to deal with all the functions of SchoolUtilities.
              </ContentListItem>
              <ContentListItem title="Patch Notes" href="/help">
                See our new incredible innovations for each release.
              </ContentListItem>
              <ContentListItem title="About" href="/help/faq">
                Get acquainted with the whole story about SchoolUtilities.
              </ContentListItem>
              <ContentListItem
                title="FAQ"
                href="/docs/primitives/overview/releases"
              >
                If you have any questions, you'll probably find them here.
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
                Add your school to SchoolUtilities and bring the education to the next level.
              </ContentListItem>
              <ContentListItem
                title="Create course"
                href="/school/select?redirect=/course/create"
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
