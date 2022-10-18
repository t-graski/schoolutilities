import React from "react";
import { styled } from "../../../stitches.config";
import { Separator } from "../../atoms/Separator";
import Image from "next/image";

type Props = {
  highlight: boolean;
  Icon: React.FC;
  text: string;
  ImageSvg: React.FC;
  onClick?: () => void;
};

const ThemeLayout = styled("button", {
  borderRadius: "$1x",
  width: "100%",
  maxWidth: "350px",
  border: "2px solid transparent",
  transition: "all 0.2s",
  cursor: "pointer",

  "&:hover": {
    border: "2px solid $outline",
  },

  variants: {
    highlight: {
      true: {
        backgroundColor: "$primaryContainer",
        color: "$onPrimaryContainer",
        "& [role='separator']": {
          backgroundColor: "$onPrimaryContainer",
          borderRadius: 0,
          height: 2,
        },
      },
      false: {
        backgroundColor: "$surface2",
        color: "$onSurface",
        "& [role='separator']": {
          backgroundColor: "$onSurface",
          borderRadius: 0,
          height: 2,
        },
      },
    },
  },
});

const IconLayout = styled("div", {
  width: "24px",
  height: "24px",
});

const IconTextLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "$2x",
  padding: "$3x",
});

const ImageLayout = styled("div", {
  position: "relative",
  width: "100%",
  borderRadius: "$1x",
  padding: "$3x",
});

export const BigTheme: React.FC<Props> = ({
  highlight,
  Icon,
  text,
  ImageSvg,
  onClick,
}) => {
  return (
    <ThemeLayout highlight={highlight} onClick={onClick}>
      <IconTextLayout>
        <IconLayout>
          <Icon></Icon>
        </IconLayout>
        {text}
      </IconTextLayout>
      <Separator width={"big"} color={"none"} alignment={"left"}></Separator>
      <ImageLayout>
        <ImageSvg></ImageSvg>
      </ImageLayout>
    </ThemeLayout>
  );
};
