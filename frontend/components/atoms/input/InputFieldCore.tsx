import React from "react";
import { styled } from "../../../stitches.config";
import { SvgIcon } from "../SvgIcon";

type Props = {
  iconName: string;
  required?: boolean;
  label?: string;
  showLabel?: boolean;
};

const InputFieldLayout = styled("div", {
  display: "flex",
  alignItems: "center",
  background: "$backgroundTertiary",
  width: "100%",
  borderRadius: "15px",
  border: "none",
  padding: "10.3px 20px",
  gap: "20px",

  variants: {
    editable: {
      true: {},
      false: {
        background: "transparent",
        border: "none",
      },
    },
  },
});

const ImageLayout = styled("div", {
  display: "flex",
  width: "30px",
  height: "30px",
  color: "$fontPrimary",
});

const InputFieldLabel = styled("div", {});

const Required = styled("div", {
  display: "inline-block",
});

export const InputFieldCore: React.FC<Props> = ({
  children,
  iconName,
  required = false,
  label = "",
  showLabel = true,
}) => {

  return (
    <>
      {label && showLabel && (
        <>
          <InputFieldLabel>
            {label} {required && <Required>*</Required>}
          </InputFieldLabel>
        </>
      )}
      <InputFieldLayout>
        {iconName && (
          <ImageLayout>
            <SvgIcon iconName={iconName} />
          </ImageLayout>
        )}
        {children}
      </InputFieldLayout>
    </>
  );
};
