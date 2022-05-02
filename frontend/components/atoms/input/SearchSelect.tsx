import React from "react";
import { styled, styles } from "../../../stitches.config";
import { SvgIcon } from "../SvgIcon";
import Select from "react-select";
import { blackA } from "@radix-ui/colors";
import * as ProgressPrimitive from "@radix-ui/react-progress";

const StyledProgress = styled(ProgressPrimitive.Root, {
  position: "relative",
  overflow: "hidden",
  background: blackA.blackA9,
  borderRadius: "99999px",
  width: "100%",
  height: 15,
});

const StyledProgressIndicator = styled(ProgressPrimitive.Indicator, {
  backgroundColor: "$specialSecondary",
  height: "100%",
  transition: "width 660ms cubic-bezier(0.65, 0, 0.35, 1)",

  variants: {
    color: {
      weak: {
        backgroundColor: "red",
      },
      good: {
        backgroundColor: "orange",
      },
      strong: {
        backgroundColor: "lightgreen",
      },
      "very-strong": {
        backgroundColor: "green",
      },
      overkill: {
        // add background color with linear gradient in rainbows
        background:
          "linear-gradient(to right, #ff0080, #ff8c00, #ffe100, #00ff80, #0080ff, #8c00ff, #ff0080)",
      },
    },
  },
});

// Exports
export const Progress = StyledProgress;
export const ProgressIndicator = StyledProgressIndicator;

type Props = {
  selectOptions?: {
    value: string | number;
    label: string;
  }[];
  selectValue?: any;
  selectMultiValues?: boolean;
  onChange: Function;
  iconName: string;
  editable?: boolean;
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

  variants: {
    cursor: {
      pointer: {
        cursor: "pointer",
      },
    },
  },
});

const StyledSelect = styled(Select, {
  width: "100%",
  color: "$fontPrimary",
  background: "transparent",
  fontSize: "1.2rem",
  lineHeight: "1.5rem",
  border: "none",
  outline: "none",
  padding: "0.5rem 0",
  borderBottom: "solid 1px transparent",
  fontWeight: "bold",
  ["&:focus"]: {
    borderBottom: "solid 1px $colors$fontPrimary",
  },
});

const selectStyled = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "$colors$fontPrimary" : "$fontPrimary",
    backgroundColor: styles.theme.colors.backgroundTertiary,
  }),
  control: (provided, state) => ({
    ...provided,
    border: "none",
    borderBottom: "solid 1px transparent",
    background: "transparent",
    color: styles.theme.colors.fontPrimary,
    fontSize: "1.2rem",
    lineHeight: "1.5rem",
    fontWeight: "bold",
    ["&:focus"]: {
      borderBottom: `solid 1px ${styles.theme.colors.fontPrimary}`,
    },
  }),

  menu: (provided, state) => ({
    ...provided,
    background: styles.theme.colors.backgroundTertiary,
    color: styles.theme.colors.fontPrimary,
    fontSize: "1.2rem",
    lineHeight: "1.5rem",
    fontWeight: "bold",
    padding: "0",
  }),

  singleValue: (provided, state) => ({
    ...provided,
    color: styles.theme.colors.fontPrimary,
    backgroundColor: styles.theme.colors.backgroundTertiary,
  }),

  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: styles.theme.colors.backgroundTertiary,
  }),

  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: styles.theme.colors.fontPrimary,
    backgroundColor: styles.theme.colors.backgroundTertiary,

    "&:hover": {
      backgroundColor: styles.theme.colors.backgroundTertiary,
    },

    "&:active": {
      backgroundColor: styles.theme.colors.backgroundTertiary,
    },

    "&:focus": {
      backgroundColor: styles.theme.colors.backgroundTertiary,
    },
  }),

  clearIndicator: (provided, state) => ({
    ...provided,
    color: styles.theme.colors.fontPrimary,
    backgroundColor: styles.theme.colors.backgroundTertiary,
  }),

  container: (provided, state) => ({
    ...provided,
    background: styles.theme.colors.backgroundTertiary,
    color: styles.theme.colors.fontPrimary,
    fontSize: "1.2rem",
    lineHeight: "1.5rem",
    fontWeight: "bold",

    ["&:focus"]: {
      borderBottom: `solid 1px ${styles.theme.colors.fontPrimary}`,
    },
  }),

  menuList: (provided, state) => ({
    ...provided,
    background: styles.theme.colors.backgroundTertiary,
    color: styles.theme.colors.fontPrimary,
    fontSize: "1.2rem",
    lineHeight: "1.5rem",
    fontWeight: "bold",
  }),

  input: (provided, state) => ({
    ...provided,
    color: "#acadae",
    padding: "10px 0",
  }),

  placeholder: (provided, state) => ({
    ...provided,
    color: "#acadae",
  }),

  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: styles.theme.colors.backgroundTertiary,
    color: styles.theme.colors.fontPrimary,
    fontSize: "1.2rem",
    lineHeight: "1.5rem",
    fontWeight: "bold",
  }),

  multiValueLabel: (provided, state) => ({
    ...provided,
    color: styles.theme.colors.fontPrimary,
    backgroundColor: styles.theme.colors.backgroundTertiary,
    padding: "8px",
    borderRadius: "5px",
    border: `solid 1px ${styles.theme.colors.fontPrimary}`,
  }),

  multiValueRemove: (provided, state) => ({
    ...provided,
    color: styles.theme.colors.fontPrimary,
    backgroundColor: styles.theme.colors.backgroundTertiary,
    cursor: "pointer",
  }),
};

export const SearchSelect: React.FC<Props> = ({
  selectOptions,
  selectValue,
  selectMultiValues,
  onChange,
  iconName,
  editable = true,
}) => {
  
  return (
    <>
      <InputFieldLayout>
        {iconName && (
          <ImageLayout>
            <SvgIcon iconName={iconName} />
          </ImageLayout>
        )}
        <StyledSelect
          styles={selectStyled}
          options={selectOptions}
          isSearchable={true}
          isClearable={true}
          defaultValue={selectValue}
          isDisabled={!editable}
          className={selectMultiValues ? "basic-multi-select" : ""}
          isMulti={selectMultiValues}
          onChange={(value) => {
            onChange(value);
          }}
        ></StyledSelect>
      </InputFieldLayout>
    </>
  );
};
