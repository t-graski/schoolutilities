import React from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";
import fetch from "node-fetch";
import { InputField } from "./InputField";
import { Button } from "./Button";
import Link from "next/link";

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
  const [lastName, setLastName] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const [termsAccepted, setTermsAccepted] = React.useState(false);
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
        ></InputField>
        <InputField
          label="Lastname"
          inputType="text"
          value={lastName}
          onChange={setLastName}
          iconSrc="/images/user.svg"
          iconAlt=""
        ></InputField>
        <InputField
          label="Date Of Birth (DD.MM.YYYY)"
          inputType="date"
          value={birthDate}
          onChange={setBirthDate}
          iconSrc="/images/user.svg"
          iconAlt=""
        ></InputField>
        <InputField
          label="Email"
          inputType="email"
          value={email}
          onChange={setEmail}
          iconSrc="/images/user.svg"
          iconAlt=""
        ></InputField>
        <InputField
          label="Password"
          inputType="password"
          value={password}
          onChange={setPassword}
          iconSrc="/images/user.svg"
          iconAlt=""
        ></InputField>
        <InputField
          label="Password Confirmation"
          inputType="password"
          value={passwordConfirmation}
          onChange={setPasswordConfirmation}
          iconSrc="/images/user.svg"
          iconAlt=""
        ></InputField>
        <InputField
          inputType="checkbox"
          onChange={() => {}}
          iconSrc=""
          iconAlt=""
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
        >
          Register
        </Button>
      </RegistrationLayout>
    </>
  );
};
