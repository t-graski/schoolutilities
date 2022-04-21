import { useState } from "react";
import Head from "next/head";
import { Navbar } from "../../components/organisms/Navbar";
import { Spacer } from "../../components/atoms/Spacer";
import { Headline } from "../../components/atoms/Headline";
import { Separator } from "../../components/atoms/Separator";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { keyframes, styled } from "@stitches/react";
import Footer from "../../components/organisms/Footer";
import Link from "next/link";
import { CSS } from "@dnd-kit/utilities";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import React from "react";

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
  backgroundColor: "$backgroundPrimary",
  boxShadow: `0 2px 10px $backgroundPrimary`,
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
    boxShadow: `0 0 0 2px $fontPrimary`,
  },
});

const StyledHeader = styled(AccordionPrimitive.Header, {
  all: "unset",
  display: "flex",
});

const StyledTrigger = styled(AccordionPrimitive.Trigger, {
  all: "unset",
  fontFamily: "inherit",
  backgroundColor: "transparent",
  padding: "0 20px",
  height: 45,
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: 15,
  lineHeight: 1,
  color: "$fontPrimary",
  boxShadow: `0 1px 0 $fontPrimary`,
  '&[data-state="closed"]': { backgroundColor: "$backgroundTertiary" },
  '&[data-state="open"]': { backgroundColor: "$backgroundSecondary" },
  "&:hover": { backgroundColor: "$backgroundSecondary" },
});

const StyledContent = styled(AccordionPrimitive.Content, {
  overflow: "hidden",
  fontSize: 15,
  color: "$fontPrimary",
  backgroundColor: "$backgroundPrimary",

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
  color: "$fontPrimary",
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

export const Accordion = StyledAccordion;
export const AccordionItem = StyledItem;
export const AccordionTrigger = React.forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <StyledHeader>
      <StyledTrigger {...props} ref={forwardedRef}>
        {children}
        <StyledChevron aria-hidden />
      </StyledTrigger>
    </StyledHeader>
  )
);
export const AccordionContent = React.forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <StyledContent {...props} ref={forwardedRef}>
      <StyledContentText>{children}</StyledContentText>
    </StyledContent>
  )
);

export default function RegisterApproved() {
  const questions = [
    {
      question: "How do I create a new school?",
      answer: (
        <>
          <p>
            You can create a new school by clicking{" "}
            <Link href="/school/create">
              <a>here</a>
            </Link>
            . If you need any further assistance creating your school, you can
            visit our{" "}
            <Link href="/support/help">
              <a>Help Center</a>
            </Link>
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
            <Link href="/school/admin/create-department">
              <a>here</a>
            </Link>
            . If you need any further assistance creating your department, you
            can visit our{" "}
            <Link href="/support/help">
              <a>Help Center</a>
            </Link>
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
            No, you can join up to 5 schools at the same time. But don't worry
            you can always leave schools.
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
            <Link href="profile/forgot">
              <a>here</a>
            </Link>
            .
          </p>
        </>
      ),
    },
    {
      question:
        "What can I do if I don't have access to my E-mail account anymore?",
      answer: (
        <>
          <p></p>
        </>
      ),
    },
  ];

  const [items, setItems] = useState(["1", "2", "3"]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function SortableItem(props) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: props.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const StyledElement = styled("div", {
      transition,
    });

    return (
      <StyledElement ref={setNodeRef} {...attributes} {...listeners}>
        {/* ... */}
      </StyledElement>
    );
  }
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
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <DndContext>
          <SortableContext items={["A", "B", "C"]}>
            <SortableContext
              items={["1", "2", "3"]}
              children={""}
            ></SortableContext>
          </SortableContext>
        </DndContext>
      </AccordionLayout>
      <Spacer size="small"></Spacer>
      <Footer></Footer>
    </>
  );
}
