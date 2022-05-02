import React from "react";
import { styled, styles } from "../../../stitches.config";
import { SvgIcon } from "../SvgIcon";
import Select from "react-select";

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
  border: "none",
  padding: "0.5rem 0",
  borderBottom: "solid 1px transparent",

  fontWeight: "bold",
  color: "$fontPrimary",
  background: "transparent",
  outline: "none",
  fontSize: "1.2rem",
  lineHeight: "1.5rem",

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
