import React from "react";
import { styled } from "../stitches.config";
import type * as Stitches from "@stitches/react";
import { Button } from "./Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { GeneralListItem } from "./GeneralListItem";

type Props = {
  items: {
    title: string;
    href: string;
    buttonText: string;
    description: string;
    iconName: string;
  }[];
};

const GeneralListLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "4fr 1fr 4fr 1fr 4fr",
  justifyContent: "center",
  gap: "30px",
  width: "100vw",
  color: "$fontPrimary",
  padding: "10vh 10vw",
});

const Divider = styled("div", {
  height: "100%",
  width: "3px",
  borderRadius: "10px",
  backgroundColor: "$fontPrimary",
  margin: "0 10px",
  variants: {
    visible: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0,
      },
    },
  },
});

export const GeneralList: React.FC<Props> = ({ items }) => {
  const router = useRouter();
  return (
    <>
      <GeneralListLayout>
        {items.map((item, index) => (
          <>
            <GeneralListItem
              key={index}
              title={item.title}
              href={item.href}
              buttonText={item.buttonText}
              description={item.description}
              iconName={item.iconName}
            />
            <Divider key={index} visible={index !== items.length - 1} />
          </>
        ))}
      </GeneralListLayout>
    </>
  );
};
