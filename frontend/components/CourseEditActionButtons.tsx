import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Nestable, { Item } from "react-nestable";
import * as DialogPrimitive from "@radix-ui/react-dialog";

// this usually goes once
// to the entry point of the whole app
// (e.g. src/index.js)
import "react-nestable/dist/styles/index.css";
import "./CourseContent.module.css";
import { SvgIcon } from "./SvgIcon";
import { Cross2Icon } from "@radix-ui/react-icons";
import { styled, keyframes } from "@stitches/react";

type Props = {
  item: Item;
  safeEntry: Function;
  deleteEntry: Function;
};

const ButtonLayout = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  gap: "20px",
  flexDirection: "row",
});

const IconLayout = styled("div", {
  width: 50,
  height: 50,
  padding: "12px",
  backgroundColor: "$backgroundPrimary",
  color: "$fontPrimary",
  borderRadius: "50%",
  transition: "all 0.2s",

  "&:hover": {
    backgroundColor: "$fontPrimary",
    color: "$backgroundPrimary",
  },
});

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 0.8 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: "$backgroundSecondary",
  position: "fixed",
  opacity: 0.8,
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const StyledDialogContent = styled(DialogPrimitive.Content, {
  backgroundColor: "$backgroundPrimary",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "600px",
  maxHeight: "85vh",
  padding: 25,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  "&:focus": { outline: "none" },
});

function Content({ children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledDialogContent {...props}>{children}</StyledDialogContent>
    </DialogPrimitive.Portal>
  );
}

const StyledTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: 500,
  color: "$fontPrimary",
  fontSize: 17,
  marginBottom: 10,
});

const StyledDescription = styled(DialogPrimitive.Description, {
  margin: "10px 0 20px",
  color: "$fontPrimary",
  fontSize: 15,
  lineHeight: 1.5,
});

// Exports
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogContent = Content;
const DialogTitle = StyledTitle;
const DialogDescription = StyledDescription;
const DialogClose = DialogPrimitive.Close;

// Your app...
const Flex = styled("div", { display: "flex" });

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 30,
  width: 30,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$fontPrimary",
  position: "absolute",
  top: 10,
  right: 10,
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",

  "&:hover": { backgroundColor: "$fontPrimary", color: "$backgroundPrimary" },
  "&:focus": { boxShadow: `0 0 0 2px $specialPrimary` },
});

const ElementSelectionLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  gridGap: "40px",
  marginBottom: 20,
  width: "100%",
});

const SelectionLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridGap: "10px",
  width: "100%",
  height: "fit-content",
});

const Element = styled("div", {
  fontSize: "1rem",
  padding: "10px 20px",
  cursor: "pointer",
  border: "1px solid $fontPrimary",
  borderRadius: 15,
  transition: "all 0.2s",

  "&:hover": { backgroundColor: "$fontPrimary", color: "$backgroundPrimary" },

  variants: {
    highlighted: {
      true: {
        backgroundColor: "$fontPrimary",
        color: "$backgroundPrimary",
      },
    },
  },
});

const SelectedLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridGap: "10px",
  height: "fit-content",
});

const AddButton = styled("button", {
  border: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  justifySelf: "end",
  borderRadius: 15,
  padding: "10px 20px",
  fontSize: "1rem",
  fontWeight: 500,
  cursor: "pointer",
  width: "fit-content",
  transition: "all 0.2s",

  backgroundColor: "$specialSecondary",
  color: "$fontPrimary",
  boxShadow: `0 2px 10px $specialPrimary`,
  "&:hover": { backgroundColor: "$fontPrimary", color: "$backgroundPrimary" },
  "&:focus": { boxShadow: `0 0 0 2px black` },
  "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
  "&:disabled:hover": {
    backgroundColor: "$specialSecondary",
    color: "$fontPrimary",
  },
});

export const CourseEditActionButtons: React.FC<Props> = ({
  item,
  safeEntry,
  deleteEntry,
}) => {
  console.log(item);
  const { choosenElement, ...additionalProps } = item.config;
  const Component = choosenElement.detailViewComponent;
  const [elementConfig, setElementConfig] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  return (
    <>
      <ButtonLayout>
        <Dialog>
          <DialogTrigger asChild>
            <IconLayout>
              <SvgIcon iconName="SvgEdit" />
            </IconLayout>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Edit element</DialogTitle>
            <SelectedLayout>
              {Component && (
                <>
                  <Component
                    setDetailsConfig={setElementConfig}
                    setButtonDisabled={setButtonDisabled}
                    config={additionalProps}
                  ></Component>
                  <DialogClose asChild>
                    <AddButton
                      aria-label="Close"
                      onClick={() => {
                        console.log(elementConfig, choosenElement);
                        safeEntry(choosenElement, elementConfig);
                      }}
                      disabled={buttonDisabled}
                    >
                      Save
                    </AddButton>
                  </DialogClose>
                </>
              )}
            </SelectedLayout>
            <DialogClose asChild>
              <IconButton>
                <Cross2Icon />
              </IconButton>
            </DialogClose>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <IconLayout>
              <SvgIcon iconName="SvgDelete" />
            </IconLayout>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Delete element</DialogTitle>
            <SelectedLayout>
              {Component && (
                <>
                  <DialogClose asChild>
                    <AddButton
                      aria-label="Close"
                      onClick={() => {
                        deleteEntry();
                      }}
                      disabled={false}
                    >
                      Delete entry
                    </AddButton>
                  </DialogClose>
                </>
              )}
            </SelectedLayout>
            <DialogClose asChild>
              <IconButton>
                <Cross2Icon />
              </IconButton>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </ButtonLayout>
    </>
  );
};

export default CourseEditActionButtons;
