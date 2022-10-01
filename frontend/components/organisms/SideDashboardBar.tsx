import Link from "next/link";
import React from "react";
import { styled } from "../../stitches.config";

type Props = {
  items: {
    name: string;
    value: string;
    icon?: any;
    href: string;
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
  padding: "20px",
  overflowY: "scroll",
  height: "auto",
  position: "sticky",
  top: "0",
  left: "0",
  backgroundColor: "$backgroundSecondary",
  scrollbarWidth: "none",

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
  gap: "20px",
  padding: "15px 0",

  transition: "all 0.2s ease-in-out",
  color: "$fontPrimary",
  textDecoration: "none",

  "&:hover": {
    opacity: "1",
  },

  variants: {
    highlighted: {
      true: {
        opacity: "1",
        cursor: "initial",
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
  color: "$fontPrimary",
});

export const SideDashboardBar: React.FC<Props> = ({ items, active = "" }) => {
  return (
    <>
      <SideDashboardBarLayout>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link href={item.href} key={item.name} passHref>
              <SideDashboardBarItemLink
                href={item.href}
                highlighted={active.toLowerCase() == item.value.toLowerCase()}
              >
                <IconLayout>
                  <Icon />
                </IconLayout>
                <SideDashboardBarItemName>{item.name}</SideDashboardBarItemName>
              </SideDashboardBarItemLink>
            </Link>
          );
        })}
      </SideDashboardBarLayout>
    </>
  );
};
