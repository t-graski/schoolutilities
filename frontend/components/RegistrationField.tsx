import React from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";
import fetch from "node-fetch";
import { InputField } from "./InputField";
import { Button } from "./Button";

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
          inputType="text"
          value={firstName}
          onChange={setFirstName}
          iconSrc=""
          iconAlt=""
        >
          Firstname
        </InputField>
        <InputField
          inputType="text"
          value={lastName}
          onChange={setLastName}
          iconSrc=""
          iconAlt=""
        >
          Lastname
        </InputField>
        <InputField
          inputType="date"
          value={birthDate}
          onChange={setBirthDate}
          iconSrc=""
          iconAlt=""
        >
          Date Of Birth (DD.MM.YYYY)
        </InputField>
        <InputField
          inputType="email"
          value={email}
          onChange={setEmail}
          iconSrc=""
          iconAlt=""
        >
          Email
        </InputField>
        <InputField
          inputType="password"
          value={password}
          onChange={setPassword}
          iconSrc=""
          iconAlt=""
        >
          Password
        </InputField>
        <InputField
          inputType="password"
          value={passwordConfirmation}
          onChange={setPasswordConfirmation}
          iconSrc=""
          iconAlt=""
        >
          Confirm Password
        </InputField>
        <InputField
          inputType="checkbox"
          value={termsAccepted}
          onChange={() => {}}
          iconSrc=""
          iconAlt=""
        >
          I agree to all
          <Link href="/data-policy" target="_blank">
            <a>Terms & Conditions</a>
          </Link>
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
