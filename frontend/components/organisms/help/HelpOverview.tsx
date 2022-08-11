import React from "react";
import { styled } from "../../../stitches.config";
import Separator from "../../atoms/Separator";
import SvgAlert from "../../atoms/svg/SvgAlert";
import { HelpOverviewItem } from "../../molecules/help/HelpOverviewItem";

type Props = {
  items: {
    title: string;
    href: string;
    description: string;
  }[];
};

const HelpOverviewLayout = styled("div", {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "center",
  gap: "50px",
  width: "100vw",
  color: "$fontPrimary",
  padding: "10vh 10vw",
});

const HelpOverview: React.FC<Props> = ({ items }) => {
  return (
    <>
      <HelpOverviewLayout>
        {items.map((item, index) => (
          <HelpOverviewItem
            title={item.title}
            href={item.href}
            description={item.description}
            icon={SvgAlert}
            key={index}
          />
        ))}
      </HelpOverviewLayout>
    </>
  );
};

export default HelpOverview;
