import React from "react";
import { styled } from "../../../stitches.config";

type Props = {
  icon?: any;
  required?: boolean;
  label?: string;
  showLabel?: boolean;
  isSmall?: boolean;
  theme?: "surface" | "surfaceVariant";
  width?: "100%" | "fit-content";
};

const InputFieldLayout = styled("div", {
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: "15px",
  border: "none",
  padding: "10.3px 20px",
  gap: "20px",

  background: "$surface",

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
    theme: {
      surface: {
        background: "$surface",
      },
      surfaceVariant: {
        background: "$surfaceVariant",
      },
    },
    width: {
      "100%": {
        width: "100%",
      },
      "fit-content": {
        width: "fit-content",
      },
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
  theme = "surfaceVariant",
  width = "100%",
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
      <InputFieldLayout isSmall={isSmall} theme={theme} width={width}>
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
