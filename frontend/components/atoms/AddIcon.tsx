import React from "react";
import { styled } from "../../stitches.config";

type Props = {
  addFunction?: Function;
};

const AddIconLayout = styled("div", {
  display: "flex",
  width: "80px",
  height: "80px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  backgroundColor: "$primaryContainer",
  cursor: "pointer",

  "@mobileOnly": {
    width: "60px",
    height: "60px",
  },
});

const AddIconPlus = styled("p", {
  fontSize: "80px",
  color: "$onPrimaryContainer",

  "@mobileOnly": {
    fontSize: "60px",
  },
});

export const AddIcon: React.FC<Props> = ({ addFunction = () => {} }) => {
  return (
    <>
      <AddIconLayout onClick={() => addFunction()}>
        <AddIconPlus>+</AddIconPlus>
      </AddIconLayout>
    </>
  );
};
