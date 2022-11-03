import React, { useCallback, useEffect } from "react";
import { Editor, useEditor } from "@tiptap/react";
import { styled } from "@stitches/react";
import { MenuItem, WeekdaySelector } from "../atoms/WeekdaySelector";

type Props = {
  items: MenuItem[];
  multipleSelection: boolean;
  selection: string[];
  updateSelection: (items: string[]) => void;
};

const WeekdaySelectionLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "$1x",
});

export const WeekdaySelection: React.FC<Props> = ({
  items,
  multipleSelection = false,
  selection,
  updateSelection,
}) => {
  return (
    <>
      <WeekdaySelectionLayout>
        {items.map((item) => (
          <WeekdaySelector
            key={item.value}
            item={item}
            selected={selection.includes(item.value)}
            onClick={(item) => {
              if (selection.includes(item.value)) {
                updateSelection(selection.filter((i) => i !== item.value));
              } else {
                if (multipleSelection) {
                  updateSelection(selection.filter((i) => i !== item.value));
                  [...selection, item.value];
                } else {
                  updateSelection([item.value]);
                }
              }
            }}
          ></WeekdaySelector>
        ))}
      </WeekdaySelectionLayout>
    </>
  );
};
