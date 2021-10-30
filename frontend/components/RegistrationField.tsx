import React from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";
import fetch from "node-fetch";
import { InputField } from "./InputField";
import { Button } from "./Button";
import Link from "next/link";
import { regex } from "../misc/regex";

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
  const [passwordConfirmationValid, setPasswordConfirmationValid] = React.useState(false);
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [isDisabled, setDisabled] = React.useState(true);

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(
      JSON.stringify({
        firstName,
        lastName,
        birthDate,
        email,
        password,
      })
    );
    // Send post request to the url with data of the form
    fetch("http://localhost:8888/api/auth/register", {
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
          console.log("Success");
        } else {
          console.log("Error");
        }
      });
  }

  return (
    <>
      <RegistrationLayout onSubmit={handleSubmit}>
        <InputField
          label="Firstname"
          inputType="text"
          value={firstName}
          onChange={setFirstName}
          iconSrc="/images/user.svg"
          iconAlt=""
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
          iconSrc="/images/user.svg"
          iconAlt=""
          required={true}
          regex={regex.name}
          setValidInput={setLastNameValid}
          errorMessage="Please enter a valid name"
        ></InputField>
        <InputField
          label="Date Of Birth (DD.MM.YYYY)"
          inputType="date"
          value={birthDate}
          onChange={setBirthDate}
          iconSrc="/images/user.svg"
          iconAlt=""
          required={true}
        ></InputField>
        <InputField
          label="Email"
          inputType="email"
          value={email}
          onChange={setEmail}
          iconSrc="/images/user.svg"
          iconAlt=""
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
          iconSrc="/images/user.svg"
          iconAlt=""
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
          iconSrc="/images/user.svg"
          iconAlt=""
          required={true}
          regex={regex.password}
          setValidInput={setPasswordConfirmationValid}
          errorMessage="Please enter a valid password"
        ></InputField>
        <InputField
          inputType="checkbox"
          onChange={setTermsAccepted}
          iconSrc=""
          iconAlt=""
          required={true}
        >
          I agree to all{" "}
          <a href="/data-policy" target="_blank">
            Terms & Conditions
          </a>
        </InputField>
        <Button
          backgroundColor="primary"
          color="primary"
          label="Sign up"
          onClick={() => {}}
          disabled={isDisabled}
        >
          Register
        </Button>
      </RegistrationLayout>
    </>
  );
};
