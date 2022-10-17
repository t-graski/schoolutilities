import React from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/input/InputField";
import { Button } from "../../atoms/Button";
import Link from "next/link";
import { regex } from "../../../utils/regex";
import { PasswordInput } from "../../atoms/input/PasswordInput";
import { CheckBox } from "../../atoms/input/CheckBox";
import { PASSWORD_VALIDATION_MESSAGES } from "../../../utils/parameterConstants";
import SvgQuality from "../../atoms/svg/SvgQuality";
import SvgWarning from "../../atoms/svg/SvgWarning";
import SvgName from "../../atoms/svg/SvgName";
import SvgBirthDate from "../../atoms/svg/SvgBirthDate";
import SvgEmail from "../../atoms/svg/SvgEmail";
import SvgPassword from "../../atoms/svg/SvgPassword";

type Props = {};

const RegistrationLayout = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const StyledAreement = styled("div", {
  color: "$neutral-500",
  width: "fit-content",
});

const StyledLInk = styled("a", {
  color: "$neutral-500",
});

const SuccessLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  gap: "40px",
  color: "$neutral-500",
});

const StyledHeadline = styled("h1", {
  fontSize: "2.5rem",
  fontWeight: "bold",
  textAlign: "center",
});

const SuccessImageLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100px",
  height: "100px",

  variants: {
    color: {
      success: {
        color: "$warning",
      },
      error: {
        color: "$error",
      },
    },
  },
});

const SuccessDescription = styled("p", {
  fontSize: "1.5rem",
});

const StyledLink = styled("a", {
  color: "$warning",
  fontSize: "1.2rem",
  fontWeight: "bold",
  padding: "20px",
  border: "2px solid $warning",
  borderRadius: "25px",
  textDecoration: "none",
  cursor: "pointer",
  transition: "all 0.2s",

  "&:hover": {
    backgroundColor: "$warning",
    color: "$neutral-500",
  },
});

export const RegistrationField: React.FC<Props> = ({}) => {
  const [firstName, setFirstName] = React.useState("");
  const [firstNameValid, setFirstNameValid] = React.useState(false);
  const [lastName, setLastName] = React.useState("");
  const [lastNameValid, setLastNameValid] = React.useState(false);
  const [birthDate, setBirthDate] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailValid, setEmailValid] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordValid, setPasswordValid] = React.useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const [passwordConfirmationValid, setPasswordConfirmationValid] =
    React.useState(false);
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [isDisabled, setDisabled] = React.useState(true);
  const [signUpInfo, setSignUpInfo] = React.useState("");
  const [signUpWorking, setSignUpWorking] = React.useState(false);

  checkInputData();

  function checkInputData() {
    if (
      firstNameValid &&
      lastNameValid &&
      birthDate &&
      emailValid &&
      passwordValid &&
      passwordConfirmationValid &&
      termsAccepted &&
      password === passwordConfirmation
    ) {
      if (isDisabled) {
        setDisabled(false);
      }
    } else if (!isDisabled) {
      setDisabled(true);
    }
  }

  async function handleSubmit(event?: React.FormEvent<HTMLFormElement>) {
    if (event) {
      event.preventDefault();
    }
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        birthDate,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.status)
      .then((statusCode) => {
        console.log(statusCode);
        if (statusCode == 200) {
          setSignUpInfo("Your account has been created");
          setSignUpWorking(true);
        } else {
          setSignUpInfo("Your account could not be created");
        }
      });
  }

  return (
    <>
      {!signUpInfo && (
        <RegistrationLayout onSubmit={handleSubmit}>
          <InputField
            label="Firstname"
            inputType="text"
            value={firstName}
            onChange={setFirstName}
            icon={SvgName}
            required={true}
            regex={regex.name}
            setValidInput={setFirstNameValid}
            errorMessage="Please enter a valid firstname"
          ></InputField>
          <InputField
            label="Lastname"
            inputType="text"
            value={lastName}
            onChange={setLastName}
            icon={SvgName}
            required={true}
            regex={regex.name}
            setValidInput={setLastNameValid}
            errorMessage="Please enter a valid lastname"
          ></InputField>
          <InputField
            label="Date Of Birth (DD.MM.YYYY)"
            inputType="date"
            value={birthDate}
            onChange={setBirthDate}
            icon={SvgBirthDate}
            required={true}
            min="1900-01-01"
            max={new Date().toJSON().split("T")[0]}
          ></InputField>
          <InputField
            label="Email"
            inputType="email"
            value={email}
            onChange={setEmail}
            icon={SvgEmail}
            required={true}
            regex={regex.email}
            setValidInput={setEmailValid}
            errorMessage="Please enter a valid email"
          ></InputField>
          <PasswordInput
            label="Password"
            value={password}
            onChange={setPassword}
            icon={SvgPassword}
            required={true}
            validationOptions={PASSWORD_VALIDATION_MESSAGES}
            setValidInput={setPasswordValid}
            errorMessage="Please enter a valid password"
          ></PasswordInput>
          <PasswordInput
            label="Password Confirmation"
            value={passwordConfirmation}
            onChange={setPasswordConfirmation}
            icon={SvgPassword}
            required={true}
            validationOptions={PASSWORD_VALIDATION_MESSAGES}
            setValidInput={setPasswordConfirmationValid}
            errorMessage="Please enter a valid password"
          ></PasswordInput>
          <CheckBox onChange={setTermsAccepted}>
            <StyledAreement>
              I agree to all{" "}
              <StyledLInk href="/data-policy" target="_blank">
                Terms & Conditions
              </StyledLInk>
            </StyledAreement>
          </CheckBox>
          <Button
            backgroundColor="primary"
            color="primary"
            onClick={() => {
              handleSubmit();
            }}
            disabled={isDisabled}
          >
            Sign up
          </Button>
          <Link href="/auth?tab=login">
            <a>
              <Button
                buttonType={"text"}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Log in instead
              </Button>
            </a>
          </Link>
        </RegistrationLayout>
      )}
      {signUpInfo && (
        <>
          <SuccessLayout>
            <StyledHeadline>{signUpInfo}</StyledHeadline>
            <SuccessImageLayout color={signUpWorking ? "success" : "error"}>
              {signUpWorking ? <SvgQuality /> : <SvgWarning />}
            </SuccessImageLayout>
            <SuccessDescription>
              {signUpWorking
                ? "You can now join a school, or create a school"
                : ""}
            </SuccessDescription>
            <Link
              href={signUpWorking ? "/profile/settings" : "/auth?tab=register"}
              passHref
            >
              <StyledLink
                onClick={() => {
                  setSignUpInfo("");
                  setSignUpWorking(false);
                }}
              >
                {signUpWorking ? "Manage your Account now" : "Try again"}
              </StyledLink>
            </Link>
          </SuccessLayout>
        </>
      )}
    </>
  );
};
