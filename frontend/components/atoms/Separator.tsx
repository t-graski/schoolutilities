import React from "react";
import { styled } from "../../stitches.config";
import type * as Stitches from "@stitches/react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

type Props = {
  width: Stitches.VariantProps<typeof StyledSeparator>["width"];
  alignment: Stitches.VariantProps<typeof HrLayout>["alignment"];
  orientation?: "horizontal" | "vertical";
  visible?: Stitches.VariantProps<typeof HrLayout>["visible"];
  hideOnMobile?: Stitches.VariantProps<typeof StyledSeparator>["hideOnMobile"];
  color?: Stitches.VariantProps<typeof StyledSeparator>["color"];
};

const HrLayout = styled("div", {
  display: "flex",
  width: "100%",
  minHeight: "3px",

  variants: {
    alignment: {
      center: {
        justifyContent: "center",
      },
      left: {
        justifyContent: "flex-start",
      },
      right: {
        justifyContent: "flex-end",
      },
    },
    visible: {
      true: {
        display: "flex",
      },
      false: {
        display: "none",
      },
    },
  },
});

const StyledSeparator = styled(SeparatorPrimitive.Root, {
  borderRadius: "10px",

  "&[data-orientation=horizontal]": {
    height: 3,
  },

  "&[data-orientation=vertical]": {
    height: "100%",
    width: 3,
  },

  variants: {
    width: {
      big: {
        width: "100%",
      },
      small: {
        width: "110px",
      },
      ultraSmall: {
        width: "80px",
      },
    },
    hideOnMobile: {
      true: {
        "@mobileOnly": { display: "none" },
      },
      false: {},
    },
    color: {
      primary: {
        backgroundColor: "$outlineVariant",
      },
      secondary: {
        backgroundColor: "$outlineVariant",
      },
      none: {},
    },
  },
});

export const Separator: React.FC<Props> = ({
  width = "small",
  alignment,
  orientation = "horizontal",
  visible = true,
  hideOnMobile = false,
  color = "primary",
}) => {
  return (
    <>
      <HrLayout alignment={alignment} visible={visible}>
        <StyledSeparator
          orientation={orientation}
          width={width}
          hideOnMobile={hideOnMobile}
          color={color}
        />
      </HrLayout>
    </>
  );
};
