import React from "react";
import { styled } from "../../../stitches.config";
import { Button } from "../../atoms/Button";
import { PopUp } from "../PopUp";

type Props = {
  headline: string;
  inputValid: boolean;
  saveLabel: string;
  saveFunction: Function;
  closeFunction: Function;
  open: boolean;
  setOpen: Function;
};

const PopUpButtonLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: "20px",
});

const StyledTitle = styled("span", {
  margin: 0,
  fontWeight: "$medium",
  color: "$neutral-500",
  fontSize: 17,
  marginBottom: 10,
});

const StyledDescription = styled("span", {
  margin: "10px 0 20px",
  color: "$neutral-500",
  fontSize: 15,
  lineHeight: 1.5,
});

export const SettingsPopUp: React.FC<Props> = ({
  headline,
  inputValid,
  saveLabel,
  saveFunction,
  closeFunction,
  children,
  open,
  setOpen,
}) => {

  return (
    <>
      <PopUp
        onOpenChange={() => {
          setOpen(!open);
          closeFunction();
        }}
        open={open}
        openButton={<></>}
      >
        <StyledTitle>{headline}</StyledTitle>
        <StyledDescription>
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
        </StyledDescription>
      </PopUp>
    </>
  );
};
