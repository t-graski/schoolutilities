import React, { useEffect } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";
import { InputField } from "./InputField";
import { Button } from "./Button";
import Link from "next/link";
import { regex } from "../misc/regex";
import { useRouter } from "next/router";
import cookie from "js-cookie";

type Props = {};

const LoginLayout = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

export const LoginField: React.FC<Props> = ({}) => {
  const [email, setEmail] = React.useState("");
  const [emailValid, setEmailValid] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordValid, setPasswordValid] = React.useState(false);
  const [isDisabled, setDisabled] = React.useState(true);

  const [signUpInfo, setSignUpInfo] = React.useState("");

  checkInputData();

  useEffect(() => {
    if (cookie.get("refreshToken") || cookie.get("accessToken")) {
      setSignUpInfo("You are already logged in!");
    }
  }, []);

  function checkInputData() {
    if (emailValid && passwordValid) {
      if (isDisabled) {
        setDisabled(false);
      }
    } else if (!isDisabled) {
      setDisabled(true);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch("https://www.schoolutilities.net:3333/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.status == 200) {
          setSignUpInfo("You are logged in");
          return response.json();
        } else {
          setSignUpInfo("You are not logged in");
        }
      })
      .then((data) => {
        if (data) {
          cookie.set("accessToken", data.access_token, { expires: 1 / 96 });
          cookie.set("refreshToken", data.refresh_token, { expires: 7 });
        }
      });
  }

  return (
    <>
      {!signUpInfo && (
        <LoginLayout onSubmit={handleSubmit}>
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
          ></InputField>
          <Button
            backgroundColor="primary"
            color="primary"
            label="Sign up"
            onClick={() => {}}
            disabled={isDisabled}
          >
            Register
          </Button>
        </LoginLayout>
      )}
      <h3>{signUpInfo}</h3>
      {signUpInfo && (
        <Button
          backgroundColor="primary"
          color="primary"
          label="Logout"
          onClick={() => {
            cookie.remove("accessToken");
            cookie.remove("refreshToken");
            setSignUpInfo("");
          }}
        >
          Register
        </Button>
      )}
    </>
  );
};
