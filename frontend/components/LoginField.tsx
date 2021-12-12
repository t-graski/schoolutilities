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
import { logout } from "../misc/authHelper";

type Props = {};

const LoginLayout = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  color: "$fontPrimary",
});

const StyledInfo = styled("div", {
  fontSize: "1.5rem",
  color: "$fontPrimary",
  fontWeight: "bold",
  marginBottom: "20px",
});

export const LoginField: React.FC<Props> = ({}) => {
  const [email, setEmail] = React.useState("");
  const [emailValid, setEmailValid] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordValid, setPasswordValid] = React.useState(false);
  const [isDisabled, setDisabled] = React.useState(true);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [signUpInfo, setSignUpInfo] = React.useState("");

  checkInputData();

  useEffect(() => {
    if (cookie.get("refreshToken") || cookie.get("accessToken")) {
      setSignUpInfo("You are already logged in!");
      setLoggedIn(true);
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

  async function handleSubmit(event?: React.FormEvent<HTMLFormElement>) {
    if (event) {
      event.preventDefault();
    }
    fetch(`http://localhost:8888/api/auth/login`, {
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
          setLoggedIn(true);
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
            iconName="SvgUser"
            required={true}
            regex={regex.email}
            setValidInput={setEmailValid}
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
          ></InputField>
          <Button
            backgroundColor="primary"
            color="primary"
            label="Sign in"
            onClick={() => {
              handleSubmit();
            }}
            disabled={isDisabled}
          ></Button>
        </LoginLayout>
      )}
      <StyledInfo>{signUpInfo}</StyledInfo>
      {isLoggedIn && (
        <Button
          backgroundColor="primary"
          color="primary"
          label="Logout"
          onClick={() => {
            logout();
            setSignUpInfo("");
            setLoggedIn(false);
          }}
        ></Button>
      )}
    </>
  );
};
