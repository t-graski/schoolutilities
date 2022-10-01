import React from "react";
import { styled } from "../../stitches.config";
import { Separator } from "../atoms/Separator";
import { GeneralListItem } from "../molecules/GeneralListItem";

type Props = {
  items: {
    title: string;
    href: string;
    buttonText: string;
    description: string;
    icon: any;
  }[];
};

const GeneralListLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "4fr 1fr 4fr 1fr 4fr",
  justifyContent: "space-evenly",
  gap: "30px",
  width: "100vw",
  padding: "10vh 10vw",

  color: "$neutral-500",

  "@mobileOnly": {
    gridTemplateColumns: "1fr",
    gap: "20px",
    padding: "10vh 5vw",
  },
});

const GeneralList: React.FC<Props> = ({ items }) => {
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
              icon={item.icon}
            />
            <Separator
              key={index + items.length}
              visible={index !== items.length - 1}
              width={"big"}
              alignment={"left"}
              orientation={"vertical"}
              hideOnMobile={true}
            />
          </>
        ))}
      </GeneralListLayout>
    </>
  );
};

GeneralList.defaultProps = {
  items: [],
};

export default GeneralList;
