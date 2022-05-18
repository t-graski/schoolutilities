import React from "react";
import { styled } from "../../../stitches.config";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

type Props = {
  onChange: Function;
};

const FieldLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "20px",
});

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  width: 25,
  height: 25,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,

  cursor: "pointer",
  boxShadow: `0 2px 10px $backgroundSecondary`,
  backgroundColor: "$backgroundTertiary",
  all: "unset",

  "&:hover": { backgroundColor: "$backgroundTertiary" },
  "&:focus": { boxShadow: `0 0 0 2px $fontPrimary` },
});

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  color: "$fontPrimary",
});

// Exports
const Checkbox = StyledCheckbox;
const CheckboxIndicator = StyledIndicator;

export const CheckBox: React.FC<Props> = ({ onChange, children }) => {
  return (
    <>
      <FieldLayout>
        <Checkbox
          id="c1"
          onCheckedChange={(checked) => {
            onChange(checked);
          }}
        >
          <CheckboxIndicator>
            <CheckIcon />
          </CheckboxIndicator>
        </Checkbox>
        <span>{children}</span>
      </FieldLayout>
    </>
  );
};