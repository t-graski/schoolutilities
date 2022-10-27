import React from "react";
import { styled } from "../../stitches.config";
import { CheckBox } from "../atoms/input/CheckBox";
import { Typography } from "../../utils/styles";
import SvgLongArrow from "../atoms/svg/SvgLongArrow";

type Props = {
  selected?: boolean;
  onSelectionChange?: (selected: boolean) => void;
  columns: {
    title: string;
    key: string;
    link?: (item: any) => string;
    sortFunction?: (a: any, b: any) => number;
  }[];
  order: {
    key: string;
    direction: "asc" | "desc";
  };
  setOrder: (order: { key: string; direction: "asc" | "desc" }) => void;
};

const ListItemLayout = styled("tr", {
  width: "100%",
});

const StyledItem = styled("td", {
  textAlign: "left",
  cursor: "pointer",
  userSelect: "none",
  padding: "$3x $1x",
  borderBottom: "3px solid $outline",

  variants: {
    size: {
      small: {
        width: 30,
      },
      normal: {},
    },
    type: {
      text: {
        cursor: "initial",
        textAlign: "right",
      },
    },
  },
});

const TextIconLayout = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "$1x",
});

const ArrowLayout = styled("div", {
  display: "flex",
  width: 18,
  height: 18,

  variants: {
    direction: {
      desc: {
        transform: "rotate(180deg)",
      },
      asc: {},
      hidden: {
        opacity: 0,
      },
    },
  },
});

export const AdminListHeader: React.FC<Props> = ({
  selected,
  onSelectionChange,
  columns,
  order,
  setOrder,
}) => {
  return (
    <>
      <ListItemLayout>
        <StyledItem size={"small"}>
          <CheckBox
            selected={selected}
            onChange={onSelectionChange}
            size={"small"}
          ></CheckBox>
        </StyledItem>
        {columns.map((column) => (
          <StyledItem
            key={column.key}
            onClick={() => {
              if (order.key == column.key) {
                setOrder({
                  key: order.key,
                  direction: order.direction == "asc" ? "desc" : "asc",
                });
              } else {
                setOrder({
                  key: column.key,
                  direction: "asc",
                });
              }
            }}
          >
            <TextIconLayout>
              <Typography variant={"headline5"}>{column.title}</Typography>
              <ArrowLayout
                direction={order.key == column.key ? order.direction : "hidden"}
              >
                <SvgLongArrow></SvgLongArrow>
              </ArrowLayout>
            </TextIconLayout>
          </StyledItem>
        ))}
        <StyledItem key={"actions"} type={"text"}>
          <Typography variant={"headline5"}>Actions</Typography>
        </StyledItem>
      </ListItemLayout>
    </>
  );
};
