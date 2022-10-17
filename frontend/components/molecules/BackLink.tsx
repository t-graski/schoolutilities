import React from "react";
import { styled } from "../../stitches.config";
import Link from "next/link";
import SvgRightArrow from "../atoms/svg/SvgRightArrow";

type Props = {
  href: string;
  label: string;
};

const BackLinkLayout = styled("a", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "$1x",
  color: "$onBackground",
  textDecoration: "none",
});

const LinkIconLayout = styled("div", {
  display: "flex",
  width: "18px",
  height: "18px",
  transform: "rotate(180deg)",
});

export const BackLink: React.FC<Props> = ({ href, label }) => {
  return (
    <>
      <Link href={href} passHref>
        <BackLinkLayout>
          <LinkIconLayout>
            <SvgRightArrow></SvgRightArrow>
          </LinkIconLayout>
          {label}
        </BackLinkLayout>
      </Link>
    </>
  );
};
