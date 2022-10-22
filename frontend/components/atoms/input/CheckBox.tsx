import React from "react";
import { styled } from "../../../stitches.config";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

type Props = {
  onChange: Function;
  disabled?: boolean;
};

const FieldLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "20px",
});

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: "unset",

  width: 25,
  height: 25,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,

  cursor: "pointer",
  boxShadow: `0 2px 10px $neutral-400`,
  backgroundColor: "transparent",
  color: "$onBackground",
  border: "1px solid $outline",

  "&:hover": { backgroundColor: "$surface1" },
  "&:focus": { boxShadow: `0 0 0 2px $neutral-500` },

  "&[data-disabled]": {
    cursor: "not-allowed",
    boxShadow: "none",
    backgroundColor: "$surface",
  },
});

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  color: "$onBackground",
});

// Exports
const Checkbox = StyledCheckbox;
const CheckboxIndicator = StyledIndicator;

export const CheckBox: React.FC<Props> = ({ onChange, disabled, children }) => {
  return (
    <>
      <FieldLayout>
        <Checkbox
          id="c1"
          onCheckedChange={(checked) => {
            onChange(checked);
          }}
          disabled={disabled}
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
