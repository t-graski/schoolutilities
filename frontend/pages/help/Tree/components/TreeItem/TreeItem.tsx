import React, { forwardRef, HTMLAttributes } from "react";
import classNames from "classnames";

import { Action, Handle, Remove } from "../../../../components";
import styles from "./TreeItem.module.css";
import { styled } from "@stitches/react";

export interface Props extends HTMLAttributes<HTMLLIElement> {
  childCount?: number;
  clone?: boolean;
  collapsed?: boolean;
  depth: number;
  disableInteraction?: boolean;
  disableSelection?: boolean;
  ghost?: boolean;
  handleProps?: any;
  indicator?: boolean;
  indentationWidth: number;
  value: string;
  onCollapse?(): void;
  onRemove?(): void;
  wrapperRef?(node: HTMLLIElement): void;
}

const StyledCount = styled("span", {
  position: "absolute",
  top: "-10px",
  right: "-10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  backgroundColor: "#2389ff",
  fontSize: "0.8rem",
  fontWeight: "600",
  color: "#fff",
});

const StyledText = styled("span", {
  flexGrow: 1,
  paddingLeft: "0.5rem",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
});

const StyledCollapse = styled(Action, {
  "&svg": {
    transition: "transform 250ms ease",
  },
  "&.collapsed &svg": {
    transform: "rotate(-90deg)",
  },
});

const StyledTreeItem = styled("div", {
  position: "relative",
  display: "flex",
  alignItems: "center",
  padding: `10px`,
  backgroundColor: "#fff",
  border: "1px solid #dedede",
  color: "#222",
  boxSizing: "border-box",
});

const StyledWrapper = styled("li", {
  listStyle: "none",
  boxSizing: "border-box",
  paddingLeft: "$small",
  marginBottom: "-1px",

  "&.clone": {
    display: "inline-block",
    pointerEvents: "none",
    padding: "0",
    marginLeft: "10px",
    marginTop: "5px",

    "&.TreeItem": {
      paddingRight: "24px",
      borderRadius: "4px",
      boxShadow: "0px 15px 15px 0 rgba(34, 33, 81, 0.1)",
    },
  },

  "&.ghost": {
    "&.indicator": {
      opacity: 1,
      position: "relative",
      zIndex: 1,
      marginBottom: "-1px",

      "&.TreeItem": {
        position: "relative",
        padding: "0",
        height: "8px",
        borderColor: "#2389ff",
        backgroundColor: "#56a1f8",

        "&:before": {
          position: "absolute",
          left: "-8px",
          top: "-4px",
          display: "block",
          content: "''",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          border: "1px solid #2389ff",
          backgroundColor: "#ffffff",
        },

        "> *": {
          opacity: 0,
          height: "0",
        },
      },
    },

    "&:not(.indicator)": {
      opacity: 0.5,
    },

    "&.TreeItem > *": {
      boxShadow: "none",
      backgroundColor: "transparent",
    },
  },
});

export const TreeItem = forwardRef<HTMLDivElement, Props>(
  (
    {
      childCount,
      clone,
      depth,
      disableSelection,
      disableInteraction,
      ghost,
      handleProps,
      indentationWidth,
      indicator,
      collapsed,
      onCollapse,
      onRemove,
      style,
      value,
      wrapperRef,
      ...props
    },
    ref
  ) => {
    return (
      <StyledWrapper
        className={classNames(
          styles.Wrapper,
          clone && styles.clone,
          ghost && styles.ghost,
          indicator && styles.indicator,
          disableSelection && styles.disableSelection,
          disableInteraction && styles.disableInteraction
        )}
        ref={wrapperRef}
        style={
          {
            "--spacing": `${indentationWidth * depth}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        <StyledTreeItem ref={ref} style={style}>
          <Handle {...handleProps} />
          {onCollapse && (
            <StyledCollapse
              onClick={onCollapse}
              className={classNames(collapsed && styles.collapsed)}
            >
              {collapseIcon}
            </StyledCollapse>
          )}
          <StyledText>{value}</StyledText>
          {!clone && onRemove && <Remove onClick={onRemove} />}
          {clone && childCount && childCount > 1 ? (
            <StyledCount>{childCount}</StyledCount>
          ) : null}
        </StyledTreeItem>
      </StyledWrapper>
    );
  }
);

const collapseIcon = (
  <svg width="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 41">
    <path d="M30.76 39.2402C31.885 40.3638 33.41 40.995 35 40.995C36.59 40.995 38.115 40.3638 39.24 39.2402L68.24 10.2402C69.2998 9.10284 69.8768 7.59846 69.8494 6.04406C69.822 4.48965 69.1923 3.00657 68.093 1.90726C66.9937 0.807959 65.5106 0.178263 63.9562 0.150837C62.4018 0.123411 60.8974 0.700397 59.76 1.76024L35 26.5102L10.24 1.76024C9.10259 0.700397 7.59822 0.123411 6.04381 0.150837C4.4894 0.178263 3.00632 0.807959 1.90702 1.90726C0.807714 3.00657 0.178019 4.48965 0.150593 6.04406C0.123167 7.59846 0.700153 9.10284 1.75999 10.2402L30.76 39.2402Z" />
  </svg>
);
