import React, { useState } from "react";
import { styled, keyframes } from "@stitches/react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { SvgIcon } from "./SvgIcon";
import { useRouter } from "next/router";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  elementsToChoose,
} from "./CourseComponentDetailViews";

type Props = { courseId: string; addNewEntry?: Function };

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

const Button = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,
  cursor: "pointer",

  variants: {
    variant: {
      violet: {
        backgroundColor: "white",
        color: "$specialPrimary",
        boxShadow: `0 2px 10px $specialPrimary`,
        "&:hover": { backgroundColor: "$specialPrimary" },
        "&:focus": { boxShadow: `0 0 0 2px black` },
      },
      blue: {
        backgroundColor: "$specialSecondary",
        color: "$fontPrimary",
        "&:hover": { backgroundColor: "$specialPrimary" },
        "&:focus": { boxShadow: `0 0 0 2px $specialPrimary` },
      },
      mauve: {
        backgroundColor: "$specialPrimary",
        color: "$specialPrimary",
        "&:hover": { backgroundColor: "$specialPrimary" },
        "&:focus": { boxShadow: `0 0 0 2px $specialPrimary` },
      },
    },
  },

  defaultVariants: {
    variant: "violet",
  },
});

const Box = styled("div", {});

const IconLayout = styled("div", {
  width: "35px",
  cursor: "pointer",
});

const DropdownMenuItemSvgLayout = styled("div", {
  width: "20px",
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

export const CourseMenu: React.FC<Props> = ({ courseId, addNewEntry }) => {
  const [open, setOpen] = useState(false);
  const [choosenElementId, setChoosenElementId] = useState("");
  const [detailsConfig, setDetailsConfig] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const router = useRouter();

  const choosenElement = elementsToChoose.find(
    (element) => element.id === choosenElementId
  );
  const ChoosenElementDetailView: React.FC<{
    setDetailsConfig: Function;
    setButtonDisabled: Function;
  }> = choosenElement?.detailViewComponent;

  return (
    <>
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
            {addNewEntry && (
              <DropdownMenuItem
                onClick={() => {
                  setOpen(true);
                }}
              >
                <DropdownMenuItemSvgLayout>
                  <SvgIcon iconName="SvgCheckMark"></SvgIcon>
                </DropdownMenuItemSvgLayout>
                Add new entry
              </DropdownMenuItem>
            )}
            {!addNewEntry && (
              <DropdownMenuItem
                onClick={() => {
                  router.push(
                    `/school/${
                      router.query.schoolUUID as string
                    }/course/${courseId}/elements`
                  );
                }}
              >
                <DropdownMenuItemSvgLayout>
                  <SvgIcon iconName="SvgEdit"></SvgIcon>
                </DropdownMenuItemSvgLayout>
                Edit elements
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              onClick={() => {
                router.push(
                  `/school/${
                    router.query.schoolUUID as string
                  }/course/${courseId}/edit`
                );
              }}
            >
              <DropdownMenuItemSvgLayout>
                <SvgIcon iconName="SvgEdit"></SvgIcon>
              </DropdownMenuItemSvgLayout>
              Edit course
            </DropdownMenuItem>
            <DropdownMenuArrow />
          </DropdownMenuContent>
        </DropdownMenu>
      </Box>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
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
          <DialogClose asChild>
            <IconButton>
              <Cross2Icon />
            </IconButton>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CourseMenu;
