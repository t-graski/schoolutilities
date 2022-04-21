import React from "react";
import { styled, styles } from "../../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";
import { SvgIcon } from "./SvgIcon";
import Select from "react-select";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { InfoHoverCard } from "./InfoHoverCard";
import { calculatePasswordStrengthIndex } from "../../misc/authHelper";
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
  inputType:
    | "text"
    | "password"
    | "date"
    | "email"
    | "checkbox"
    | "select"
    | "search-select"
    | "textfield"
    | "number"
    | "datetime-local";
  selectOptions?: {
    value: string;
    label: string;
  }[];
  selectValue?: any;
  selectMultiValues?: boolean;
  value?: string;
  onChange: Function;
  iconName: string;
  editable?: boolean;
  required?: boolean;
  label?: string;
  size?: Stitches.VariantProps<typeof StyledInputField>["size"];
  regex?: RegExp;
  setValidInput?: Function;
  errorMessage?: string;
  validationOptions?: {
    regex: RegExp;
    errorMessage: string;
    validIconName: string;
    invalidIconName: string;
  }[];
  isHoverCardVisible?: boolean;
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
      select: {},
      "search-select": {},
      textfield: {},
      number: {},
      "datetime-local": {},
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
    size: {
      big: {
        fontSize: "1.5rem",
      },
      normal: {
        fontSize: "1.2rem",
      },
      small: {
        fontSize: "1rem",
        padding: "0",
        lineHeight: "1.2rem",
      },
    },
  },
});

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

  variants: {
    cursor: {
      pointer: {
        cursor: "pointer",
      },
    },
  },
});

const StyledOption = styled("option", {});

const FieldLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "20px",
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

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: "unset",
  backgroundColor: "$backgroundTertiary",
  width: 25,
  height: 25,
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: `0 2px 10px $backgroundSecondary`,
  "&:hover": { backgroundColor: "$backgroundTertiary" },
  "&:focus": { boxShadow: `0 0 0 2px $fontPrimary` },
});

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  color: "$fontPrimary",
});

// Exports
const Checkbox = StyledCheckbox;
const CheckboxIndicator = StyledIndicator;

// Your app...
const Flex = styled("div", { display: "flex" });
const Label = styled("label", {
  color: "white",
  fontSize: 15,
  lineHeight: 1,
  userSelect: "none",
});

const StyledTextArea = styled("textarea", {
  width: "100%",
  color: "$fontPrimary",
  background: "transparent",
  fontSize: "1.2rem",
  lineHeight: "1.5rem",
  border: "none",
  outline: "none",
  padding: "0.5rem 0",
  minHeight: "50px",
  maxHeight: "50vh",
  borderBottom: "solid 1px transparent",
  fontWeight: "bold",
  resize: "vertical",
  ["&:focus"]: {
    borderBottom: "solid 1px $colors$fontPrimary",
  },
});

const InfoHoverCardLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  gap: "20px",
});

const InfoHoverCardItem = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "25px",
  alignItems: "center",
});

const InfoHoverCardIcon = styled("div", {
  width: "30px",
  height: "30px",

  variants: {
    isValid: {
      true: {
        color: "green",
      },
      false: {
        color: "red",
      },
    },
  },
});

const InfoHoverCardText = styled("div", {});

const InputFieldLabel = styled("div", {});

const Required = styled("div", {});

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
  size = "normal",
  regex,
  setValidInput,
  errorMessage = "",
  validationOptions,
  isHoverCardVisible = true,
  min,
  max,
}) => {
  const [isInputValid, setIsInputValid] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [currentValidationResults, setCurrentValidationResults] =
    React.useState([]);

  if (validationOptions && currentValidationResults.length === 0) {
    setCurrentValidationResults(
      validationOptions.map((option) => {
        return { ...option, valid: false };
      })
    );
  }

  let passwordIndex = calculatePasswordStrengthIndex(value);
  let passwordIndexWords;
  // insert a suitable word to passwordIndexWords based on passwordIndex for a range to 100
  if (passwordIndex < 0) {
    passwordIndexWords = "";
  } else if (passwordIndex < 20) {
    passwordIndexWords = "weak";
  } else if (passwordIndex < 40) {
    passwordIndexWords = "good";
  } else if (passwordIndex < 60) {
    passwordIndexWords = "strong";
  } else if (passwordIndex < 100) {
    passwordIndexWords = "very-strong";
  } else {
    passwordIndexWords = "overkill";
  }

  function updateValidation(event) {
    if (regex) {
      let inputValueValid = regex && regex.test(event.target.value);
      if (setValidInput) {
        setValidInput(inputValueValid);
      }
      if (isInputValid == null && !inputValueValid) {
        if (regex && regex.test(event.target.value)) {
          setIsInputValid(false);
        }
      } else {
        setIsInputValid(inputValueValid);
      }
    } else if (validationOptions) {
      const validationResults = [];

      let isValid = true;

      validationOptions.forEach((validationOption) => {
        let validationResult = validationOption.regex.test(event.target.value);
        validationResults.push({
          ...validationOption,
          valid: validationResult,
        });
        if (!validationResult) {
          isValid = false;
        }
      });
      console.log(validationResults);
      if (setValidInput) {
        setValidInput(isValid);
      }
      setIsInputValid(isValid);

      setCurrentValidationResults(validationResults);
    }
    onChange(event.target.value);
  }

  if (inputType === "checkbox") {
    return (
      <>
        <FieldLayout>
          <Checkbox
            id="c1"
            onCheckedChange={(checked) => {
              onChange(checked);
            }}
          >
            <CheckboxIndicator>
              <CheckIcon />
            </CheckboxIndicator>
          </Checkbox>
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
  } else if (inputType === "textfield") {
    return (
      <>
        {label ?? (
          <>
            <InputFieldLabel>{label}</InputFieldLabel>
            {required && <Required>*</Required>}
          </>
        )}
        <InputFieldLayout>
          {iconName && (
            <ImageLayout>
              <SvgIcon iconName={iconName} />
            </ImageLayout>
          )}
          <StyledTextArea
            placeholder={label}
            onChange={(e) => onChange(e.target.value)}
            {...(required && { required: true })}
            value={value}
          ></StyledTextArea>
        </InputFieldLayout>
      </>
    );
  } else {
    return (
      <>
        {label ?? (
          <>
            <InputFieldLabel>{label}</InputFieldLabel>
            {required && <Required>*</Required>}
          </>
        )}
        <InputFieldLayout editable={editable}>
          {iconName && (
            <ImageLayout>
              <SvgIcon iconName={iconName} />
            </ImageLayout>
          )}
          <StyledLabel>
            <StyledInputField
              type={
                inputType != "password"
                  ? inputType
                  : showPassword
                  ? "text"
                  : "password"
              }
              value={value}
              name={label}
              placeholder={label}
              editable={editable}
              readOnly={!editable}
              size={size}
              onChange={updateValidation}
              inputType={inputType}
              {...(required && { required: true })}
              {...(min && { min })}
              {...(max && { max })}
            />
          </StyledLabel>

          {iconName &&
            validationOptions &&
            isHoverCardVisible &&
            !showPassword && (
              <ImageLayout
                cursor="pointer"
                onClick={() => {
                  setShowPassword(true);
                }}
              >
                <SvgIcon iconName="SvgEyeRestricted" />
              </ImageLayout>
            )}
          {iconName && validationOptions && isHoverCardVisible && showPassword && (
            <ImageLayout
              cursor="pointer"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              <SvgIcon iconName="SvgEye" />
            </ImageLayout>
          )}
          {iconName && validationOptions && isHoverCardVisible && (
            <>
              <InfoHoverCard>
                <InfoHoverCardLayout>
                  <p>The password must include:</p>
                  {currentValidationResults.map((validationResult) => (
                    <InfoHoverCardItem key={validationResult.errorMessage}>
                      <InfoHoverCardIcon
                        isValid={
                          validationResult.valid
                            ? validationResult.valid
                            : false
                        }
                      >
                        <SvgIcon
                          iconName={
                            validationResult.valid
                              ? validationResult.validIconName
                              : validationResult.invalidIconName
                          }
                        />
                      </InfoHoverCardIcon>
                      <InfoHoverCardText>
                        {validationResult.errorMessage}
                      </InfoHoverCardText>
                    </InfoHoverCardItem>
                  ))}

                  <p>Your password is {passwordIndexWords}</p>
                  <Progress value={100}>
                    <ProgressIndicator
                      style={{
                        width: `${calculatePasswordStrengthIndex(value)}%`,
                      }}
                      color={passwordIndexWords}
                    />
                  </Progress>
                </InfoHoverCardLayout>
              </InfoHoverCard>
            </>
          )}
        </InputFieldLayout>
        {errorMessage && isInputValid === false && (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
      </>
    );
  }
};
