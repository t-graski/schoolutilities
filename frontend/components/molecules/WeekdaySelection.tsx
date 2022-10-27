import React, { useCallback, useEffect } from "react";
import { Editor, useEditor } from "@tiptap/react";
import { styled } from "@stitches/react";
import { MenuItem, WeekdaySelector } from "../atoms/WeekdaySelector";

type Props = {
  items: MenuItem[];
  multipleSelection: boolean;
  updateSelection: (items: MenuItem[]) => void;
};

const WeekdaySelectionLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "$1x",
});

export const WeekdaySelection: React.FC<Props> = ({
  items,
  updateSelection,
}) => {
  const [selectedItems, setSelectedItems] = React.useState<MenuItem[]>([]);

  useEffect(() => {
    updateSelection(selectedItems);
  }, [selectedItems]);

  return (
    <>
      <WeekdaySelectionLayout>
        {items.map((item) => (
          <WeekdaySelector
            key={item.value}
            item={item}
            selected={selectedItems.includes(item)}
            onClick={(item) => {
              setSelectedItems((prev) => {
                if (prev.includes(item)) {
                  return prev.filter((i) => i !== item);
                } else {
                  return [...prev, item];
                }
              });
            }}
          ></WeekdaySelector>
        ))}
      </WeekdaySelectionLayout>
    </>
  );
};
