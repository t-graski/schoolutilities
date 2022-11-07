import React from "react";
import { styled } from "@stitches/react";

type Props = {
    icon: string;
    title: string;
    action: Function;
    isActive: Function;
};

const StyledMenuItem = styled("button", {
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "0.4rem",
    color: "#0d0d0d",
    height: "1.75rem",
    marginRight: "0.25rem",
    padding: "0.25rem",
    width: "fit-content",

    "$:hover, &.is-active": {
        backgroundColor: "#0d0d0d",
        color: "#fff",
    },
});

export const MenuItem: React.FC<Props> = ({
  icon,
  title,
  action,
  isActive = null,
}) => {
  return (
    <StyledMenuItem
      className={`menu-item${isActive && isActive() ? " is-active" : ""}`}
      onClick={() => action()}
      title={title}
    >
        {title}
    </StyledMenuItem>
  );
};
