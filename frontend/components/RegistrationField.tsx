import React from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";
import fetch from "node-fetch";
import { InputField } from "./InputField";
import { Button } from "./Button";
import Link from "next/link";
import { regex } from "../misc/regex";
import { useRouter } from "next/router";

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
});

const StyledLInk = styled("a", {
  color: "$fontPrimary",
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
    fetch(`https://backend.schoolutilities.net:3333/api/auth/register`, {
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
            iconName="SvgUser"
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
            iconName="SvgUser"
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
            iconName="SvgUser"
            required={true}
            min="1900-01-01"
            max={new Date().toJSON().split("T")[0]}
          ></InputField>
          <InputField
            label="Email"
            inputType="email"
            value={email}
            onChange={setEmail}
            iconName="SvgUser"
            required={true}
            regex={regex.email}
            setValidInput={setEmailValid}
            errorMessage="Please enter a valid email"
          ></InputField>
          <InputField
            label="Password"
            inputType="password"
            value={password}
            onChange={setPassword}
            iconName="SvgUser"
            required={true}
            regex={regex.password}
            setValidInput={setPasswordValid}
            errorMessage="Please enter a valid password"
          ></InputField>
          <InputField
            label="Password Confirmation"
            inputType="password"
            value={passwordConfirmation}
            onChange={setPasswordConfirmation}
            iconName="SvgUser"
            required={true}
            regex={regex.password}
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
        </RegistrationLayout>
      )}
      {signUpInfo && (
        <>
          <p>{signUpInfo}</p>
          <Link href="/auth/login">
            <a>
              <Button
                backgroundColor="primary"
                color="primary"
                label="Login"
                onClick={() => {
                  handleSubmit();
                }}
              ></Button>
            </a>
          </Link>
        </>
      )}
    </>
  );
};
