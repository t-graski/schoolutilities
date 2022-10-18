import Link from "next/link";
import React from "react";
import { styled } from "../../stitches.config";
import { Separator } from "../atoms/Separator";

type Props = {
  items: {
    name: string;
    children: {
      name: string;
      value: string;
      icon?: any;
      href: string;
    }[];
  }[];
  active?: string;
};

const SideDashboardBarLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifySelf: "center",
  width: "100%",
  minWidth: "100px",
  maxWidth: "300px",
  overflowY: "scroll",
  height: "auto",
  position: "sticky",
  top: "0",
  left: "0",
  scrollbarWidth: "none",
  gap: "$6x",

  "&::-webkit-scrollbar": {
    display: "none",
  },

  "&::-webkit-scrollbar-track": {
    display: "none",
  },

  "&::-webkit-scrollbar-thumb": {
    display: "none",
  },
});

const SideDashboardBarItemLink = styled("a", {
  display: "flex",
  flexDirection: "row",
  gap: "$3x",
  padding: "$2x",

  transition: "all 0.2s ease-in-out",
  color: "$onBackground",
  textDecoration: "none",
  borderRadius: "$small",

  "&:hover": {
    opacity: "1",
    backgroundColor: "$surface4",
    color: "$onSurface",
  },

  variants: {
    highlighted: {
      true: {
        opacity: "1",
        backgroundColor: "$surface4",
        color: "$onSurface",
      },
      false: {
        opacity: "0.7",
      },
    },
  },
});

const IconLayout = styled("div", {
  width: "24px",
  height: "24px",
  justifySelf: "center",
  alignSelf: "center",
});

const SideDashboardBarItemName = styled("p", {
  fontSize: "1rem",
  fontWeight: "$bold",
  color: "$neutral-500",
});

const ElementLayout = styled("div", {});

const ColumnName = styled("p", {
  marginBottom: "$1x",

  fontSize: "1.5rem",
  color: "$neutral-200",
  fontWeight: "$bold",
});

const ChildrenColumn = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$1x",
  marginTop: "$2x",
});

export const SideDashboardChildrenBar: React.FC<Props> = ({
  items,
  active = "",
}) => {
  return (
    <>
      <SideDashboardBarLayout>
        {items.map((column, index) => (
          <ElementLayout key={index}>
            <ColumnName>{column.name}</ColumnName>
            <Separator
              width={"big"}
              alignment={"left"}
              color={"secondary"}
            ></Separator>
            <ChildrenColumn>
              {column.children.map((item) => {
                return (
                  <Link href={item.href} key={item.name} passHref>
                    <SideDashboardBarItemLink
                      href={item.href}
                      highlighted={
                        active.toLowerCase() == item.value.toLowerCase()
                      }
                    >
                      <IconLayout>
                        <item.icon></item.icon>
                      </IconLayout>
                      <SideDashboardBarItemName>
                        {item.name}
                      </SideDashboardBarItemName>
                    </SideDashboardBarItemLink>
                  </Link>
                );
              })}
            </ChildrenColumn>
          </ElementLayout>
        ))}
      </SideDashboardBarLayout>
    </>
  );
};
