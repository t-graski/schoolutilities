import React from "react";
import { styled } from "../stitches.config";
import { Button } from "./Button";
import { Headline } from "./Headline";
import { Separator } from "./Separator";

type Props = {
  headline: string;
  inputValid: boolean;
  saveLabel: string;
  saveFunction: Function;
  closeFunction: Function;
};

const PopUpLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.7)",
  position: "absolute",
  top: "0",
  left: "0",
  zIndex: "10",
});

const PopUpContentLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "50%",
  backgroundColor: "$backgroundPrimary",
  padding: "30px",
  borderRadius: "20px",
});

const StyledInputField = styled("div", {
  marginTop: "15px",
  marginBottom: "15px",
});

const StyledPopUpHeadline = styled("h2", {
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "$fontPrimary",
  margin: "0",
});

const PopUpButtonLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: "20px",
});

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
      <PopUpLayout>
        <PopUpContentLayout>
          <StyledPopUpHeadline>{headline}</StyledPopUpHeadline>
          <Separator width="ultraSmall" alignment="left" />
          {children}
          <PopUpButtonLayout>
            <Button
              label="Cancel"
              onClick={() => {
                closeFunction();
              }}
              backgroundColor={"secondary"}
              color={"primary"}
            />
            <Button
              label={saveLabel}
              onClick={() => {
                saveFunction();
              }}
              backgroundColor={"primary"}
              color={"primary"}
              disabled={!inputValid}
              type="submit"
            />
          </PopUpButtonLayout>
        </PopUpContentLayout>
      </PopUpLayout>
    </>
  );
};