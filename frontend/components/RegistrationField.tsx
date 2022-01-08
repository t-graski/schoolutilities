import React, { useEffect } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";
import fetch from "node-fetch";
import { InputField } from "./InputField";
import { Button } from "./Button";
import Link from "next/link";
import { regex } from "../misc/regex";
import { useRouter } from "next/router";
import validator from "validator";
import { LENGTHS, PASSWORD } from "../misc/parameterConstants";
import { SvgIcon } from "./SvgIcon";

if (!globalThis.fetch) {
  //@ts-ignore
  globalThis.fetch = fetch;
}

type Props = {};

const RegistrationLayout = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const StyledAreement = styled("div", {
  color: "$fontPrimary",
  width: "fit-content",
});

const StyledLInk = styled("a", {
  color: "$fontPrimary",
});

const SuccessLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  gap: "40px",
  color: "$fontPrimary",
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
        color: "$specialPrimary",
      },
      error: {
        color: "$specialTertiary",
      },
    },
  },
});

const SuccessDescription = styled("p", {
  fontSize: "1.5rem",
});

const StyledLink = styled("a", {
  color: "$specialPrimary",
  fontSize: "1.2rem",
  fontWeight: "bold",
  padding: "20px",
  border: "2px solid $specialPrimary",
  borderRadius: "25px",
  textDecoration: "none",
  cursor: "pointer",
  transition: "all 0.2s",

  "&:hover": {
    backgroundColor: "$specialPrimary",
    color: "$fontPrimary",
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
            iconName="SvgName"
            required={true}
            validatorFunction={validator.isLength}
            validatorParams={[LENGTHS.PERSON_NAME]}
            setValidInput={setFirstNameValid}
            errorMessage="Please enter a valid firstname"
          ></InputField>
          <InputField
            label="Lastname"
            inputType="text"
            value={lastName}
            onChange={setLastName}
            iconName="SvgName"
            required={true}
            validatorFunction={validator.isLength}
            validatorParams={[LENGTHS.PERSON_NAME]}
            setValidInput={setLastNameValid}
            errorMessage="Please enter a valid lastname"
          ></InputField>
          <InputField
            label="Date Of Birth (DD.MM.YYYY)"
            inputType="date"
            value={birthDate}
            onChange={setBirthDate}
            iconName="SvgBirthDate"
            required={true}
            min="1900-01-01"
            max={new Date().toJSON().split("T")[0]}
          ></InputField>
          <InputField
            label="Email"
            inputType="email"
            value={email}
            onChange={setEmail}
            iconName="SvgEmail"
            required={true}
            validatorFunction={validator.isEmail}
            validatorParams={[]}
            setValidInput={setEmailValid}
            errorMessage="Please enter a valid email"
          ></InputField>
          <InputField
            label="Password"
            inputType="password"
            value={password}
            onChange={setPassword}
            iconName="SvgPassword"
            required={true}
            validatorFunction={validator.isStrongPassword}
            validatorParams={[PASSWORD]}
            setValidInput={setPasswordValid}
            errorMessage="Please enter a valid password"
          ></InputField>
          <InputField
            label="Password Confirmation"
            inputType="password"
            value={passwordConfirmation}
            onChange={setPasswordConfirmation}
            iconName="SvgPassword"
            required={true}
            validatorFunction={validator.isStrongPassword}
            validatorParams={[PASSWORD]}
            setValidInput={setPasswordConfirmationValid}
            errorMessage="Please enter a valid password"
          ></InputField>
          <InputField
            inputType="checkbox"
            onChange={setTermsAccepted}
            iconName=""
            required={true}
          >
            <StyledAreement>
              I agree to all{" "}
              <StyledLInk href="/data-policy" target="_blank">
                Terms & Conditions
              </StyledLInk>
            </StyledAreement>
          </InputField>
          <Button
            backgroundColor="primary"
            color="primary"
            label="Sign up"
            onClick={() => {
              handleSubmit();
            }}
            disabled={isDisabled}
          ></Button>
          <Link href="/auth/login">
            <a>
              <Button
                backgroundColor="secondary"
                color="primary"
                label="Login instead"
                onClick={() => {
                  handleSubmit();
                }}
              ></Button>
            </a>
          </Link>
        </RegistrationLayout>
      )}
      {signUpInfo && (
        <>
          <SuccessLayout>
            <StyledHeadline>{signUpInfo}</StyledHeadline>
            <SuccessImageLayout color={signUpWorking ? "success" : "error"}>
              <SvgIcon
                iconName={signUpWorking ? "SvgQuality" : "SvgWarning"}
              ></SvgIcon>
            </SuccessImageLayout>
            <SuccessDescription>
              {signUpWorking
                ? "You can now join a school, or create a school"
                : ""}
            </SuccessDescription>
            <Link href={signUpWorking ? "/profile/settings" : "/auth/register"}>
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
