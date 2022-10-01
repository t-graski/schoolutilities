import React from "react";
import { styled } from "../../../stitches.config";

type Props = {
  icon?: any;
  required?: boolean;
  label?: string;
  showLabel?: boolean;
  isSmall?: boolean;
};

const InputFieldLayout = styled("div", {
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: "15px",
  border: "none",
  padding: "10.3px 20px",
  gap: "20px",

  background: "$neutral-300",

  variants: {
    editable: {
      true: {},
      false: {
        border: "none",

        background: "transparent",
      },
    },
    isSmall: {
      true: {
        padding: "0",
        width: "fit-content",
      },
      false: {},
    },
  },
});

const ImageLayout = styled("div", {
  display: "flex",
  width: "30px",
  height: "30px",

  color: "$neutral-500",
});

const InputFieldLabel = styled("div", {});

const Required = styled("div", {
  display: "inline-block",
});

export const InputFieldCore: React.FC<Props> = ({
  children,
  icon,
  required = false,
  label = "",
  showLabel = true,
  isSmall = false,
}) => {
  const Icon = icon;

  return (
    <>
      {label && showLabel && (
        <>
          <InputFieldLabel>
            {label} {required && <Required>*</Required>}
          </InputFieldLabel>
        </>
      )}
      <InputFieldLayout isSmall={isSmall}>
        {icon && (
          <ImageLayout>
            <Icon />
          </ImageLayout>
        )}
        {children}
      </InputFieldLayout>
    </>
  );
};
