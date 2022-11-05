import React from "react";
import { styled } from "../../stitches.config";
import type * as Stitches from "@stitches/react";

export type Props = {
    ratio?: Stitches.VariantProps<typeof ComponentLayout>["ratio"];
};

const ComponentLayout = styled("div", {
    height: "fit-content",
    position: "relative",
    marginTop: "30px",

    ["&:before"]: {
      display: "block",
      content: "",
      width: "100%",
      paddingTop: "calc(9/16 * 100%)",
    },

    variants: {
        ratio: {
            "1/1": {
                paddingTop: "100%",
            },
            "4/3": {
                paddingTop: "75%",
            },
            "16/9": {
                paddingTop: "calc(9/16 * 100%)",
            },
            "9/16": {
                paddingTop: "calc(16/9 * 100%)",
            },
        }
    }
  });

export const ImageLayout: React.FC<Props> = ({ ratio = "16/9", children }) => {
  return (
    <>
      <ComponentLayout ratio={ratio}>{children}</ComponentLayout>
    </>
  );
};
