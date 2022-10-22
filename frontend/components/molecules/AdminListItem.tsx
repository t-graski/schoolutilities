import React from "react";
import { styled } from "../../stitches.config";
import { CheckBox } from "../atoms/input/CheckBox";

type Props = {
  data: any;
  selected?: boolean;
  onSelectionChange?: (selected: boolean) => void;
  actions?: {
    title: string;
    onClick: (item: any) => void;
    Icon: React.FC;
  }[];
  columns: {
    title: string;
    key: string;
    link?: (item: any) => string;
    sortFunction?: (a: any, b: any) => number;
  }[];
  uuidKey: string;
};

const ListItemLayout = styled("tr", {
  transition: "all 0.2s",

  "&:hover": {
    backgroundColor: "$surface2",
  },
});

const StyledItem = styled("td", {
  textAlign: "left",
  padding: "$2x $1x",
  borderTop: "1px solid $outline",

  variants: {
    size: {
      small: {
        width: 30,
      },
      normal: {},
    },
  },
});

const ActionsLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  width: "100%",
  gap: "$2x",
});

const ActionIconLayout = styled("div", {
  display: "flex",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  width: 16,
  height: 16,
});

export const AdminListItem: React.FC<Props> = ({
  data,
  selected,
  onSelectionChange,
  actions,
  columns,
  uuidKey,
}) => {
  return (
    <ListItemLayout>
      <StyledItem size={"small"}>
        <CheckBox
          selected={selected}
          onChange={onSelectionChange}
          size={"small"}
        ></CheckBox>
      </StyledItem>
      {columns.map((column) => (
        <StyledItem key={data[uuidKey] + column.key}>
          {data[column.key]}
        </StyledItem>
      ))}
      <StyledItem key={data[uuidKey] + "actions"}>
        <ActionsLayout>
          {actions?.map((action, index) => (
            <ActionIconLayout key={index} onClick={() => action.onClick(data)}>
              <action.Icon></action.Icon>
            </ActionIconLayout>
          ))}
        </ActionsLayout>
      </StyledItem>
    </ListItemLayout>
  );
};
