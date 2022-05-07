import React, { useEffect } from "react";
import { styled } from "../../../stitches.config";
import { InfoHoverCard } from "../InfoHoverCard";
import { calculatePasswordStrengthIndex } from "../../../utils/authHelper";
import { blackA } from "@radix-ui/colors";
import * as ProgressPrimitive from "@radix-ui/react-progress";

const StyledProgress = styled(ProgressPrimitive.Root, {
  position: "relative",

  overflow: "hidden",
  borderRadius: "99999px",
  width: "100%",
  height: 15,

  background: blackA.blackA9,
});

const StyledProgressIndicator = styled(ProgressPrimitive.Indicator, {
  height: "100%",

  transition: "width 660ms cubic-bezier(0.65, 0, 0.35, 1)",  
  backgroundColor: "$specialSecondary",

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
  setValidInput?: Function;
  validationOptions?: {
    regex: RegExp;
    errorMessage: string;
    validIconName: string;
    invalidIconName: string;
  }[];
  password: string;
};

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

export const PasswordStrengthPopOver: React.FC<Props> = ({
  setValidInput,
  validationOptions,
  password,
}) => {
  const [currentValidationResults, setCurrentValidationResults] =
    React.useState([]);

  if (validationOptions && currentValidationResults.length === 0) {
    setCurrentValidationResults(
      validationOptions.map((option) => {
        return { ...option, valid: false };
      })
    );
  }

  let passwordIndex = calculatePasswordStrengthIndex(password);
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

  useEffect(() => {
    updateValidation();

    function updateValidation() {
      if (validationOptions) {
        const validationResults = [];

        let isValid = true;

        validationOptions.forEach((validationOption) => {
          let validationResult = validationOption.regex.test(password);
          validationResults.push({
            ...validationOption,
            valid: validationResult,
          });
          if (!validationResult) {
            isValid = false;
          }
        });
        if (setValidInput) {
          setValidInput(isValid);
        }

        setCurrentValidationResults(validationResults);
      }
    }
  }, [password, setValidInput, validationOptions]);

  return (
    <>
      <InfoHoverCard>
        <InfoHoverCardLayout>
          <p>The password must include:</p>
          {currentValidationResults.map((validationResult) => (
            <InfoHoverCardItem key={validationResult.errorMessage}>
              <InfoHoverCardIcon
                isValid={
                  validationResult.valid ? validationResult.valid : false
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
                width: `${passwordIndex}%`,
              }}
              color={passwordIndexWords}
            />
          </Progress>
        </InfoHoverCardLayout>
      </InfoHoverCard>
    </>
  );
};
