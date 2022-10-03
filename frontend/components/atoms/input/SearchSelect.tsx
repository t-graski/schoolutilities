import React from "react";
import { styled, styles } from "../../../stitches.config";
import Select from "react-select";
import { InputFieldCore } from "./InputFieldCore";

type Props = {
  selectOptions?: {
    value: string | number;
    label: string;
  }[];
  selectValue?: any;
  selectMultiValues?: boolean;
  onChange: Function;
  icon?: any;
  editable?: boolean;
  isSmall?: boolean;
};

const InputFieldLayout = styled("div", {
  display: "flex",
  alignItems: "center",
  background: "$neutral-300",
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

  color: "$neutral-500",

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
  border: "none",
  padding: "0.5rem 0",
  borderBottom: "solid 1px transparent",
  borderRadius: "15px",

  fontWeight: "bold",
  color: "$neutral-500",
  background: "transparent",
  outline: "none",
  fontSize: "1.2rem",
  lineHeight: "1.5rem",

  ["&:focus"]: {
    borderBottom: "solid 1px $colors$neutral-500",
  },

  variants: {
    isSmall: {
      true: {
        fontSize: "1rem",
        lineHeight: "1.2rem",
        width: "fit-content",
        minWidth: "200px",
        padding: "0",
      },
    },
  },
});

const selectStyled = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "$colors$neutral-500" : "$neutral-500",
    backgroundColor: styles.theme.colors["neutral-300"],
  }), 
  control: (provided, state) => ({
    ...provided,
    border: "none",
    borderBottom: "solid 1px transparent",
    background: "transparent",
    color: styles.theme.colors["neutral-500"],
    fontSize: "1.2rem",
    lineHeight: "1.5rem",
    fontWeight: "bold",
    ["&:focus"]: {
      borderBottom: `solid 1px ${styles.theme.colors["neutral-500"]}`,
    },
  }),

  menu: (provided, state) => ({
    ...provided,
    background: styles.theme.colors["neutral-300"],
    color: styles.theme.colors["neutral-500"],
    fontSize: "1.2rem",
    lineHeight: "1.5rem",
    fontWeight: "bold",
    padding: "0",
  }),

  singleValue: (provided, state) => ({
    ...provided,
    color: styles.theme.colors["neutral-500"],
    backgroundColor: styles.theme.colors["neutral-300"],
  }),

  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: styles.theme.colors["neutral-300"],
  }),

  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: styles.theme.colors["neutral-500"],
    backgroundColor: styles.theme.colors["neutral-300"],

    "&:hover": {
      backgroundColor: styles.theme.colors["neutral-300"],
    },

    "&:active": {
      backgroundColor: styles.theme.colors["neutral-300"],
    },

    "&:focus": {
      backgroundColor: styles.theme.colors["neutral-300"],
    },
  }),

  clearIndicator: (provided, state) => ({
    ...provided,
    color: styles.theme.colors["neutral-500"],
    backgroundColor: styles.theme.colors["neutral-300"],
  }),

  container: (provided, state) => ({
    ...provided,
    background: styles.theme.colors["neutral-300"],
    color: styles.theme.colors["neutral-500"],
    fontSize: "1.2rem",
    lineHeight: "1.5rem",
    fontWeight: "bold",

    ["&:focus"]: {
      borderBottom: `solid 1px ${styles.theme.colors["neutral-500"]}`,
    },
  }),

  menuList: (provided, state) => ({
    ...provided,
    background: styles.theme.colors["neutral-300"],
    color: styles.theme.colors["neutral-500"],
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
    backgroundColor: styles.theme.colors["neutral-300"],
    color: styles.theme.colors["neutral-500"],
    fontSize: "1.2rem",
    lineHeight: "1.5rem",
    fontWeight: "bold",
  }),

  multiValueLabel: (provided, state) => ({
    ...provided,
    color: styles.theme.colors["neutral-500"],
    backgroundColor: styles.theme.colors["neutral-300"],
    padding: "8px",
    borderRadius: "5px",
    border: `solid 1px ${styles.theme.colors["neutral-500"]}`,
  }),

  multiValueRemove: (provided, state) => ({
    ...provided,
    color: styles.theme.colors["neutral-500"],
    backgroundColor: styles.theme.colors["neutral-300"],
    cursor: "pointer",
  }),
};

export const SearchSelect: React.FC<Props> = ({
  selectOptions,
  selectValue,
  selectMultiValues,
  onChange,
  icon,
  editable = true,
  isSmall = false,
}) => {
  return (
    <>
      <InputFieldCore icon={icon} showLabel={false} isSmall={isSmall}>
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
          isSmall={isSmall}
        ></StyledSelect>
      </InputFieldCore>
    </>
  );
};
