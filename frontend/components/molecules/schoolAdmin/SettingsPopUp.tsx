import React from "react";
import { styled } from "../../../stitches.config";
import { Button } from "../../atoms/Button";
import { Separator } from "../../atoms/Separator";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { keyframes } from "@stitches/react";

type Props = {
  headline: string;
  inputValid: boolean;
  saveLabel: string;
  saveFunction: Function;
  closeFunction: Function;
};

const PopUpButtonLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: "20px",
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
  backgroundColor: "$surfaceVariant",
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
  zIndex: 1,
  padding: 25,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  "&:focus": { outline: "none" },
});

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

function Content({ children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledDialogContent {...props}>{children}</StyledDialogContent>
    </DialogPrimitive.Portal>
  );
}

// Exports
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogContent = Content;
const DialogTitle = StyledTitle;
const DialogDescription = StyledDescription;
const DialogClose = DialogPrimitive.Close;

export const SettingsPopUp: React.FC<Props> = ({
  headline,
  inputValid,
  saveLabel,
  saveFunction,
  closeFunction,
  children,
}) => {
  return (
    <>
      <Dialog
        defaultOpen={true}
        onOpenChange={() => {
          closeFunction();
        }}
      >
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogTitle>{headline}</DialogTitle>
          <DialogDescription>
            {children}
            <PopUpButtonLayout>
              <Button
                onClick={() => {
                  closeFunction();
                }}
                buttonType="text"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  saveFunction();
                }}
                backgroundColor={"primary"}
                color={"primary"}
                disabled={!inputValid}
                type="button"
              >
                {saveLabel}
              </Button>
            </PopUpButtonLayout>
          </DialogDescription>
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
