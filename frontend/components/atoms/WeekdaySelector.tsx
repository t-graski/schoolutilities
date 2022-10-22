import React from "react";
import { styled } from "@stitches/react";

export type MenuItem = {
  name: string;
  shortcut: string;
  value: string;
};

type Props = {
  item: MenuItem;
  onClick?: (item: MenuItem) => void;
  selected?: boolean;
};

const SelectorLayout = styled("button", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 40,
  width: 40,
  borderRadius: "1000px",
  border: "1px solid $outline",
  userSelect: "none",
  cursor: "pointer",
  transition: "all 0.2s",
  backgroundColor: "$surface",

  variants: {
    selected: {
      true: {
        backgroundColor: "$surfaceVariant",
        color: "$onSurfaceVariant",
        border: "1px solid $surfaceVariant",

        "&:hover": {
          backgroundColor: "$surface4",
          color: "$onSurface",
          border: "1px solid $surface4",
        },
      },
      false: {
        backgroundColor: "$surface",
        color: "$onSurface",
        border: "1px solid $outline",

        "&:hover": {
          backgroundColor: "$surface2",
          color: "$onSurface",
        },
      },
    },
  },
});

export const WeekdaySelector: React.FC<Props> = ({
  item,
  onClick,
  selected = false,
}) => {
  return (
    <>
      <SelectorLayout
        onClick={() => {
          onClick(item);
        }}
        selected={selected}
        title={item.name}
      >
        {item.shortcut}
      </SelectorLayout>
    </>
  );
};
