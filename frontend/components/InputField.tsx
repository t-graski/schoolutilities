import React from "react";
import { styled, styles } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";
import { SvgIcon } from "./SvgIcon";
import Select from "react-select";

type Props = {
  inputType:
    | "text"
    | "password"
    | "date"
    | "email"
    | "checkbox"
    | "select"
    | "search-select";
  selectOptions?: {
    value: string;
    label: string;
  }[];
  selectValue?: string;
  selectMultiValues?: boolean;
  value?: string;
  onChange: Function;
  iconName: string;
  editable?: boolean;
  required?: boolean;
  label?: string;
  validatorFunction?: Function;
  validatorParams?: [any?];
  setValidInput?: Function;
  errorMessage?: string;
  min?: string;
  max?: string;
};

const StyledInputField = styled("input", {
  background: "$backgroundTertiary",
  display: "inline-block",
  width: "100%",
  color: "$fontPrimary",
  fontSize: "1.2rem",
  lineHeight: "1.5rem",
  border: "none",
  outline: "none",
  padding: "0.5rem 0",
  borderBottom: "solid 1px transparent",
  fontFamily: "$fontPrimary",
  fontWeight: "bold",
  ["&:focus"]: {
    borderBottom: "solid 1px $colors$fontPrimary",
  },
  variants: {
    inputType: {
      text: {},
      password: {},
      date: {},
      email: {},
      checkbox: {
        width: "fit-content",
        margin: "0 20px 0 0",
      },
    },
    editable: {
      true: {},
      false: {
        background: "transparent",
        border: "none",
        ["&:focus"]: {
          borderBottom: "none",
        },
      },
    },
  },
});

const InputFieldLayout = styled("div", {
  display: "flex",
  alignItems: "center",
  background: "$backgroundTertiary",
  width: "100%",
  borderRadius: "20px",
  border: "none",
  padding: "15px 20px",
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

const StyledLabel = styled("label", {
  height: "fit-content",
  width: "100%",
});

const ErrorMessage = styled("span", {
  color: "red",
  paddingLeft: "10px",
});

const StyledImage = styled(Image, {
  filter: "invert(100%)",
});

const StyledSelectField = styled("select", {
  background: "$backgroundTertiary",
  width: "100%",
  color: "$fontPrimary",
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

const ImageLayout = styled("div", {
  display: "flex",
  width: "30px",
  height: "30px",
  color: "$fontPrimary",
});

const StyledOption = styled("option", {});

const FieldLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
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
  }),

  multiValueRemove: (provided, state) => ({
    ...provided,
    color: styles.theme.colors.fontPrimary,
    backgroundColor: styles.theme.colors.backgroundTertiary,
  }),
};

export const InputField: React.FC<Props> = ({
  inputType,
  selectOptions,
  selectValue,
  selectMultiValues,
  value,
  onChange,
  children,
  iconName,
  editable = true,
  required = false,
  label = "",
  validatorFunction,
  validatorParams,
  setValidInput,
  errorMessage = "",
  min,
  max,
}) => {
  if (inputType === "checkbox") {
    return (
      <>
        <FieldLayout>
          <StyledInputField
            type={inputType}
            name={label}
            placeholder={label}
            onChange={(e) => onChange(e.target.checked)}
            inputType={inputType}
            {...(required && { required: true })}
            readOnly={!editable}
          />
          <span>{children}</span>
        </FieldLayout>
      </>
    );
  } else if (inputType === "search-select") {
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
            isDisabled={!editable}
            className={selectMultiValues ? "basic-multi-select" : ""}
            isMulti={selectMultiValues}
            onChange={(e: {value: string, label: string}) => {
              console.log(e);
              if(e && e.value){
                onChange(e.value);
              } else {
                onChange("");
              }
            }}
          ></StyledSelect>
        </InputFieldLayout>
      </>
    );
  } else if (inputType === "select") {
    return (
      <>
        <InputFieldLayout>
          {iconName && (
            <ImageLayout>
              <SvgIcon iconName={iconName} />
            </ImageLayout>
          )}
          <StyledSelectField
            placeholder={label}
            onChange={(e) => onChange(e.target.value)}
            {...(required && { required: true })}
            value={selectValue}
          >
            {selectOptions.map((option) => (
              <StyledOption key={option.value} value={option.value}>
                {option.label}
              </StyledOption>
            ))}
          </StyledSelectField>
        </InputFieldLayout>
      </>
    );
  } else {
    const [isInputValid, setIsInputValid] = React.useState(null);
    return (
      <>
        <InputFieldLayout editable={editable}>
          {iconName && (
            <ImageLayout>
              <SvgIcon iconName={iconName} />
            </ImageLayout>
          )}
          <StyledLabel>
            <StyledInputField
              type={inputType}
              value={value}
              name={label}
              placeholder={label}
              editable={editable}
              readOnly={!editable}
              onChange={(e) => {
                let inputValueValid =
                  validatorFunction &&
                  validatorFunction(e.target.value, ...validatorParams);
                if (setValidInput) {
                  setValidInput(inputValueValid);
                }
                if (isInputValid == null && !inputValueValid) {
                  setTimeout(() => {
                    if (
                      validatorFunction &&
                      validatorFunction(e.target.value, ...validatorParams)
                    ) {
                      setIsInputValid(false);
                    }
                  }, 2000);
                } else {
                  setIsInputValid(inputValueValid);
                }
                onChange(e.target.value);
              }}
              inputType={inputType}
              {...(required && { required: true })}
              {...(min && { min })}
              {...(max && { max })}
            />
          </StyledLabel>
        </InputFieldLayout>
        {errorMessage && isInputValid === false && (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
      </>
    );
  }
};
