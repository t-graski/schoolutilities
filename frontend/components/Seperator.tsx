import React from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from '@stitches/react';

type Props = {
  width: Stitches.VariantProps<typeof StyledHr>['width'];
  alignment: Stitches.VariantProps<typeof HrLayout>['alignment'];
};

const StyledHr = styled("hr", {
    borderTop: "3px solid $fontPrimary",
    margin: "20px 0",
    variants: {
        width: {
            big: {
                width: "100%"
            },
            small: {
                width: "110px"
            },
        },
    }
});

const HrLayout = styled("div", {
    display: "flex",
    width: "100%",
    variants: {
        alignment: {
            center: {
                justifyContent: "center"
            },
            left: {
                justifyContent: "flex-start"
            },
            right: {
                justifyContent: "flex-end"
            }
        }
    }
});

export const Seperator: React.FC<Props> = ({ width, alignment }) => {
  return (
    <>
        <HrLayout alignment={alignment}>
            <StyledHr width={width} />
        </HrLayout>
    </>
  );
};
