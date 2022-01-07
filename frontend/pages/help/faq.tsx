import React from "react";
import { RegisterAuth } from "../../components/RegisterAuth";
import Head from "next/head";
import { Navbar } from "../../components/OldNavbar";
import { Spacer } from "../../components/Spacer";
import { Headline } from "../../components/Headline";
import { Separator } from "../../components/Separator";
import { SchoolSelectionList } from "../../components/SchoolSelectionList";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { keyframes, styled } from "@stitches/react";
import { blackA, mauve, violet } from "@radix-ui/colors";
import { Footer } from "../../components/Footer";


const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
});

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
});

const StyledAccordion = styled(AccordionPrimitive.Root, {
  borderRadius: 6,
  width: 300,
  backgroundColor: mauve.mauve6,
  boxShadow: `0 2px 10px ${blackA.blackA4}`,
});

const StyledItem = styled(AccordionPrimitive.Item, {
  overflow: 'hidden',
  marginTop: 1,

  '&:first-child': {
    marginTop: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },

  '&:last-child': {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },

  '&:focus-within': {
    position: 'relative',
    zIndex: 1,
    boxShadow: `0 0 0 2px ${mauve.mauve12}`,
  },
});

const StyledHeader = styled(AccordionPrimitive.Header, {
  all: 'unset',
  display: 'flex',
});

const StyledTrigger = styled(AccordionPrimitive.Trigger, {
  all: 'unset',
  fontFamily: 'inherit',
  backgroundColor: 'transparent',
  padding: '0 20px',
  height: 45,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: 15,
  lineHeight: 1,
  color: violet.violet11,
  boxShadow: `0 1px 0 ${mauve.mauve6}`,
  '&[data-state="closed"]': { backgroundColor: 'white' },
  '&[data-state="open"]': { backgroundColor: 'white' },
  '&:hover': { backgroundColor: mauve.mauve2 },
});

const StyledContent = styled(AccordionPrimitive.Content, {
  overflow: 'hidden',
  fontSize: 15,
  color: mauve.mauve11,
  backgroundColor: mauve.mauve2,

  '&[data-state="open"]': {
    animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
});

const StyledContentText = styled('div', {
  padding: '15px 20px',
});

const StyledChevron = styled(ChevronDownIcon, {
  color: violet.violet10,
  transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
  '[data-state=open] &': { transform: 'rotate(180deg)' },
});



export const Accordion = StyledAccordion;
export const AccordionItem = StyledItem;
export const AccordionTrigger = React.forwardRef(({ children, ...props }, forwardedRef) => (
  <StyledHeader>
    <StyledTrigger {...props} ref={forwardedRef}>
      {children}
      <StyledChevron aria-hidden />
    </StyledTrigger>
  </StyledHeader>
));
export const AccordionContent = React.forwardRef(({ children, ...props }, forwardedRef) => (
  <StyledContent {...props} ref={forwardedRef}>
    <StyledContentText>{children}</StyledContentText>
  </StyledContent>
));


export default function RegisterApproved() {
  const questions = [
    {
      question: 'What is the purpose of this website?',
      answer: (
        <>
          <p>
            This website is a tool for students to find tutors and help them with their studies.
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
      <Navbar
        links={[
          {
            href: "/",
            label: "Home",
          },
          {
            href: "/features",
            label: "Features",
          },
        ]}
      ></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="FAQ"></Headline>
      <Separator width="small" alignment="center" />
      <Spacer size="small"></Spacer>
      <Accordion type="single" defaultValue="item-1" collapsible>
        {questions.map(({ question, answer }, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Footer></Footer>
    </>
  );
}
