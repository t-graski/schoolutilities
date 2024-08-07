import Head from "next/head";
const Navbar = dynamic(() => import("../../components/organisms/Navbar"));
import { Spacer } from "../../components/atoms/Spacer";
import { Headline } from "../../components/atoms/Headline";
import { Separator } from "../../components/atoms/Separator";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { keyframes, styled } from "@stitches/react";
import Footer from "../../components/organisms/Footer";
import Link from "next/link";

import React from "react";
import dynamic from "next/dynamic";
import { BannerAd } from "../../components/molecules/ads/BannerAd";

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: "var(--radix-accordion-content-height)" },
});

const slideUp = keyframes({
  from: { height: "var(--radix-accordion-content-height)" },
  to: { height: 0 },
});

const StyledAccordion = styled(AccordionPrimitive.Root, {
  borderRadius: 6,
  width: "50%",
  minWidth: "400px",
  backgroundColor: "$neutral-100",
  boxShadow: `0 2px 10px $neutral-100`,
});

const StyledItem = styled(AccordionPrimitive.Item, {
  overflow: "hidden",
  marginTop: 1,

  "&:first-child": {
    marginTop: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },

  "&:last-child": {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },

  "&:focus-within": {
    position: "relative",
    zIndex: 1,
    boxShadow: `0 0 0 2px $neutral-500`,
  },
});

const StyledHeader = styled(AccordionPrimitive.Header, {
  all: "unset",
  display: "flex",
});

const StyledTrigger = styled(AccordionPrimitive.Trigger, {
  all: "unset",
  fontFamily: "inherit",
  backgroundColor: "$surface2",
  padding: "0 20px",
  height: 45,
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: 15,
  lineHeight: 1,
  color: "$onSurface",
  boxShadow: `0 1px 0 $neutral-500`,
  transition: "all 200ms",
  '&[data-state="closed"]': { backgroundColor: "$surface2" },
  '&[data-state="open"]': {
    backgroundColor: "$primaryContainer",
    "&:hover": {
      backgroundColor: "$primaryContainer",
    },
  },
  "&:hover": { backgroundColor: "$surface4" },
});

const StyledContent = styled(AccordionPrimitive.Content, {
  overflow: "hidden",
  fontSize: 15,
  color: "$neutral-500",
  backgroundColor: "$surfaceVariant",

  '&[data-state="open"]': {
    animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
});

const StyledContentText = styled("div", {
  padding: "15px 20px",
});

const StyledChevron = styled(ChevronDownIcon, {
  color: "$neutral-500",
  transition: "transform 300ms cubic-bezier(0.87, 0, 0.13, 1)",
  "[data-state=open] &": { transform: "rotate(180deg)" },
});

const AccordionLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});

const StyledLink = styled(Link, {
  color: "$neutral-500",
});

export const Accordion = StyledAccordion;
export const AccordionItem = StyledItem;
export const AccordionTrigger = React.forwardRef<any>(function Content(
  { children, ...props },
  forwardedRef
) {
  return (
    <StyledHeader>
      <StyledTrigger {...props} ref={forwardedRef}>
        {children}
        <StyledChevron aria-hidden />
      </StyledTrigger>
    </StyledHeader>
  );
});

export const AccordionContent = React.forwardRef<any>(function Content(
  { children, ...props },
  forwardedRef
) {
  return (
    <StyledContent {...props} ref={forwardedRef}>
      <StyledContentText>{children}</StyledContentText>
    </StyledContent>
  );
});

export default function RegisterApproved() {
  const questions = [
    {
      question: "How do I create a new school?",
      answer: (
        <>
          <p>
            You can create a new school by clicking{" "}
              <StyledLink href="/school/create" passHref>here</StyledLink>
            . If you need any further assistance creating your school, you can
            visit our{" "}    <StyledLink href="/help" passHref>Help Center</StyledLink>
            .
          </p>
        </>
      ),
    },
    {
      question: "How do I create a department?",
      answer: (
        <>
          <p>
            If you have already created a school, you can create a new
            department by clicking{" "}
              <StyledLink href="/school/admin/create-department" passHref>here</StyledLink>
            . If you need any further assistance creating your department, you
            can visit our{" "}
              <StyledLink href="/help" passHref>Help Center</StyledLink>
            .
          </p>
        </>
      ),
    },
    {
      question: "Can I only join a single school?",
      answer: (
        <>
          <p>
            No, you can join up to 5 schools at the same time. But don&apos;t
            worry you can always leave schools.
          </p>
        </>
      ),
    },
    {
      question: "What can I do if I forgot my password or E-mail?",
      answer: (
        <>
          <p>
            If you have forgotten your password or E-mail, you can reset either
            of them by clicking{" "}
              <StyledLink href="profile/forgot" passHref>here</StyledLink>
            .
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>FAQ - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="FAQ"></Headline>
      <Separator width="small" alignment="center" />
      <Spacer size="small"></Spacer>
      <AccordionLayout>
        <Accordion type="single" defaultValue="item-1" collapsible>
          {questions.map(({ question, answer }, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              {/*@ts-ignore */}
              <AccordionTrigger>{question}</AccordionTrigger>
              {/*@ts-ignore */}
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </AccordionLayout>
      <Spacer size="small"></Spacer>
      <BannerAd></BannerAd>
      <Footer></Footer>
    </>
  );
}
