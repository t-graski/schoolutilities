import React, { useState } from "react";
import { Item } from "react-nestable";

// this usually goes once
// to the entry point of the whole app
// (e.g. src/index.js)
import "react-nestable/dist/styles/index.css";
import { styled } from "@stitches/react";
import SvgEdit from "../../atoms/svg/SvgEdit";
import SvgDelete from "../../atoms/svg/SvgDelete";
import { PopUp } from "../PopUp";
import { Button } from "../../atoms/Button";

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

const IconLayout = styled("button", {
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  width: 50,
  height: 50,
  padding: "12px",
  color: "$neutral-500",
  borderRadius: "50%",
  transition: "all 0.2s",

  "&:hover": {
    backgroundColor: "$neutral-500",
    color: "$neutral-100",
  },
});

const StyledTitle = styled("span", {
  margin: 0,
  fontWeight: "$medium",
  color: "$neutral-500",
  fontSize: 17,
  marginBottom: 10,
});

const DialogTitle = StyledTitle;

const SelectedLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridGap: "10px",
  height: "fit-content",
});

const ButtonPosition = styled("div", {
  justifySelf: "end",
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
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);

  return (
    <>
      <ButtonLayout>
        <IconLayout onClick={() => setEditIsOpen(!editIsOpen)}>
          <SvgEdit />
        </IconLayout>
        {editIsOpen && (
          <PopUp openButton={<></>} defaultOpen={true}>
            <DialogTitle>Edit element</DialogTitle>
            <SelectedLayout>
              {Component && (
                <>
                  <Component
                    setDetailsConfig={setElementConfig}
                    setButtonDisabled={setButtonDisabled}
                    config={additionalProps}
                  ></Component>
                  <ButtonPosition>
                    <Button
                      buttonType="filled"
                      onClick={() => {
                        setEditIsOpen(false);
                        safeEntry(choosenElement, elementConfig);
                      }}
                      disabled={buttonDisabled}
                    >
                      Save
                    </Button>
                  </ButtonPosition>
                </>
              )}
            </SelectedLayout>
          </PopUp>
        )}
        <IconLayout onClick={() => setDeleteIsOpen(!deleteIsOpen)}>
          <SvgDelete />
        </IconLayout>
        {deleteIsOpen && (
          <PopUp openButton={<></>} defaultOpen={true}>
            <DialogTitle>Delete element</DialogTitle>
            <SelectedLayout>
              {Component && (
                <>
                  <ButtonPosition>
                    <Button
                      buttonType="filled"
                      onClick={() => {
                        setDeleteIsOpen(false);
                        deleteEntry();
                      }}
                      disabled={false}
                    >
                      Delete entry
                    </Button>
                  </ButtonPosition>
                </>
              )}
            </SelectedLayout>
          </PopUp>
        )}
      </ButtonLayout>
    </>
  );
};

export default CourseEditActionButtons;
