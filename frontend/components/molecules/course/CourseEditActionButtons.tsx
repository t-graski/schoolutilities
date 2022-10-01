import React, { useState } from "react";
import { Item } from "react-nestable";
import * as DialogPrimitive from "@radix-ui/react-dialog";

// this usually goes once
// to the entry point of the whole app
// (e.g. src/index.js)
import "react-nestable/dist/styles/index.css";
import { Cross2Icon } from "@radix-ui/react-icons";
import { styled, keyframes } from "@stitches/react";
import SvgEdit from "../../atoms/svg/SvgEdit";
import SvgDelete from "../../atoms/svg/SvgDelete";

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
  backgroundColor: "$neutral-100",
  color: "$neutral-500",
  borderRadius: "50%",
  transition: "all 0.2s",

  "&:hover": {
    backgroundColor: "$neutral-500",
    color: "$neutral-100",
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
  backgroundColor: "$neutral-400",
  position: "fixed",
  opacity: 0.8,
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const StyledDialogContent = styled(DialogPrimitive.Content, {
  backgroundColor: "$neutral-100",
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
  fontWeight: "$medium",
  color: "$neutral-500",
  fontSize: 17,
  marginBottom: 10,
});

const StyledDescription = styled(DialogPrimitive.Description, {
  margin: "10px 0 20px",
  color: "$neutral-500",
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

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 30,
  width: 30,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$neutral-500",
  position: "absolute",
  top: 10,
  right: 10,
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",

  "&:hover": { backgroundColor: "$neutral-500", color: "$neutral-100" },
  "&:focus": { boxShadow: `0 0 0 2px $warning` },
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
  fontWeight: "$medium",
  cursor: "pointer",
  width: "fit-content",
  transition: "all 0.2s",

  backgroundColor: "$primary-400",
  color: "$neutral-500",
  boxShadow: `0 2px 10px $warning`,
  "&:hover": { backgroundColor: "$neutral-500", color: "$neutral-100" },
  "&:focus": { boxShadow: `0 0 0 2px black` },
  "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
  "&:disabled:hover": {
    backgroundColor: "$primary-400",
    color: "$neutral-500",
  },
});

export const CourseEditActionButtons: React.FC<Props> = ({
  item,
  safeEntry,
  deleteEntry,
}) => {
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
              <SvgEdit />
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
              <SvgDelete />
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
