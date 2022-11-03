import React, { useState } from "react";
import { styled, keyframes } from "@stitches/react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { elementsToChoose } from "./CourseComponentDetailViews";
import { AddIcon } from "../AddIcon";
import { PopUp } from "../../molecules/PopUp";

type Props = { addNewEntry?: Function };

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
  borderRadius: 15,
  padding: 8,

  backgroundColor: "$neutral-400",
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
  position: "relative",

  paddingLeft: 25,
  padding: "3px 8px",
  height: 25,
  borderRadius: 5,
  display: "flex",
  alignItems: "center",

  userSelect: "none",
  cursor: "pointer",
  fontWeight: "$medium",
  fontSize: "1.05rem",
  all: "unset",
  lineHeight: 1,
  color: "$neutral-500",

  "&[data-disabled]": {
    color: "$neutral-500",
    pointerEvents: "none",
  },

  "&:focus": {
    backgroundColor: "$warning",
    color: "$neutral-500",
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
const StyledTriggerItem = styled(DropdownMenuPrimitive.SubTrigger, {
  ...itemStyles,

  '&[data-state="open"]': {
    backgroundColor: "$warning",
    color: "$neutral-500",
  },
});

const StyledLabel = styled(DropdownMenuPrimitive.Label, {
  paddingLeft: 25,

  fontSize: 12,
  lineHeight: "25px",
  color: "$neutral-500",
});

const StyledSeparator = styled(DropdownMenuPrimitive.Separator, {
  height: 1,
  margin: 5,

  backgroundColor: "$neutral-500",
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
  position: "relative",

  right: 0,

  fill: "$neutral-500",
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

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 0.8 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  position: "fixed",

  backgroundColor: "$surface1",
  opacity: 0.8,
  inset: 0,

  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const StyledDialogContent = styled(DialogPrimitive.Content, {
  position: "fixed",
  top: "50%",
  left: "50%",

  borderRadius: 6,
  width: "90vw",
  maxWidth: "600px",
  maxHeight: "85vh",
  padding: 25,

  backgroundColor: "$surface2",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  transform: "translate(-50%, -50%)",

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
  position: "absolute",
  top: 10,
  right: 10,

  borderRadius: "100%",
  height: 30,
  width: 30,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",

  color: "$neutral-500",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  fontFamily: "inherit",
  border: "none",
  backgroundColor: "transparent",

  "&:hover": { backgroundColor: "$primaryContainer", color: "$neutral-100" },
  "&:focus": { boxShadow: `0 0 0 2px $warning` },
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
  padding: "10px 20px",
  border: "1px solid $neutral-500",
  borderRadius: 15,

  transition: "all 0.2s",
  cursor: "pointer",
  fontSize: "1rem",

  "&:hover": {
    backgroundColor: "$primaryContainer",
    color: "$onPrimaryContainer",
  },

  variants: {
    highlighted: {
      true: {
        backgroundColor: "$primaryContainer",
        color: "$onPrimaryContainer",
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
  width: "fit-content",

  fontSize: "1rem",
  fontWeight: "$medium",
  cursor: "pointer",
  transition: "all 0.2s",
  backgroundColor: "$primary",
  color: "$onPrimary",
  boxShadow: `0 2px 10px $warning`,

  "&:hover": { opacity: 0.8 },

  "&:focus": { boxShadow: `0 0 0 2px black` },

  "&:disabled": { opacity: 0.5, cursor: "not-allowed" },

  "&:disabled:hover": {
    backgroundColor: "$primary-400",
    color: "$neutral-500",
  },
});

export const AddCourseElement: React.FC<Props> = ({ addNewEntry }) => {
  const [choosenElementId, setChoosenElementId] = useState(-1);
  const [detailsConfig, setDetailsConfig] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [open, setOpen] = useState(false);

  const choosenElement = elementsToChoose.find(
    (element) => element.id === choosenElementId
  );
  const ChoosenElementDetailView: React.FC<{
    setDetailsConfig: Function;
    setButtonDisabled: Function;
  }> = choosenElement?.detailViewComponent;

  return (
    <>
      <AddIcon
        addFunction={() => {
          setOpen(true);
        }}
      ></AddIcon>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogClose asChild>
            <IconButton>
              <Cross2Icon />
            </IconButton>
          </DialogClose>
          <DialogTitle>Choose element to add</DialogTitle>
          <DialogDescription>
            Click on the element at the right side and then enter the details
            for the element
          </DialogDescription>
          <ElementSelectionLayout>
            <SelectionLayout>
              {elementsToChoose.map((element) => (
                <Element
                  key={element.id}
                  highlighted={element.id === choosenElementId}
                  onClick={() => {
                    setChoosenElementId(element.id);
                    setDetailsConfig({});
                  }}
                >
                  {element.name}
                </Element>
              ))}
            </SelectionLayout>
            <SelectedLayout>
              {ChoosenElementDetailView && (
                <>
                  <ChoosenElementDetailView
                    setDetailsConfig={setDetailsConfig}
                    setButtonDisabled={setButtonDisabled}
                  ></ChoosenElementDetailView>
                  <DialogClose asChild>
                    <AddButton
                      aria-label="Close"
                      onClick={() => {
                        addNewEntry(choosenElement, detailsConfig);
                      }}
                      disabled={buttonDisabled}
                    >
                      Add element
                    </AddButton>
                  </DialogClose>
                </>
              )}
            </SelectedLayout>
          </ElementSelectionLayout>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCourseElement;
