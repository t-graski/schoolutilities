import Link from "next/link";
import React from "react";
import { styled } from "../../stitches.config";

type Props = {
  items: {
    name: string;
    iconName: string;
    href: string;
  }[];
  active?: string;
};

const SideDashboardBarLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifySelf: "center",
  width: "30vw",
  minWidth: "200px",
  maxWidth: "400px",
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
  textDecoration: "none",
  color: "$fontPrimary",
  padding: "15px 0",
  transition: "all 0.2s ease-in-out",
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
  fontWeight: "700",
  color: "$fontPrimary",
});

export const SideDashboardBar: React.FC<Props> = ({ items, active = "" }) => {
  return (
    <>
      <SideDashboardBarLayout>
        {items.map((item) => (
          <Link href={item.href} key={item.name} passHref>
            <SideDashboardBarItemLink
              href={item.href}
              highlighted={active.toLowerCase() == item.name.toLowerCase()}
            >
              <IconLayout>
                <SvgIcon iconName={item.iconName} />
              </IconLayout>
              <SideDashboardBarItemName>{item.name}</SideDashboardBarItemName>
            </SideDashboardBarItemLink>
          </Link>
        ))}
      </SideDashboardBarLayout>
    </>
  );
};
