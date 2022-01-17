import React, { useEffect } from "react";
import { styled } from "../stitches.config";
import { InputField } from "./InputField";
import { Button } from "./Button";
import Link from "next/link";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { logout } from "../misc/authHelper";
import validator from "validator";
import { LENGTHS, PASSWORD } from "../misc/parameterConstants";

type Props = {};

const LoginLayout = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  color: "$fontPrimary",
});

const StyledInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  fontSize: "1.5rem",
  color: "$fontPrimary",
  fontWeight: "bold",
  marginBottom: "20px",
});

const ButtonLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "20px",
});

export const LoginField: React.FC<Props> = ({}) => {
  const [email, setEmail] = React.useState("");
  const [emailValid, setEmailValid] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordValid, setPasswordValid] = React.useState(false);
  const [isDisabled, setDisabled] = React.useState(true);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [signUpInfo, setSignUpInfo] = React.useState("");
  const [loginSuccess, setLoginSuccess] = React.useState(false);
  const router = useRouter();

  checkInputData();

  useEffect(() => {
    if (cookie.get("refreshToken") || cookie.get("accessToken")) {
      setSignUpInfo("You are already logged in!");
      setLoggedIn(true);
      setLoginSuccess(true);
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
    try {
      fetch(`https://backend.schoolutilities.net/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            setSignUpInfo("You are logged in");
            setLoggedIn(true);
            setLoginSuccess(true);
            let redirectRoute: string = Array.isArray(router.query.redirect)
              ? router.query.redirect[0]
              : router.query.redirect;
            if (router.query && router.query.redirect) {
              router.push(decodeURIComponent(redirectRoute));
            }
            return response.json();
          } else {
            setSignUpInfo(
              "Something went wrong, while trying to log in. It can be that you have entered wrong credentials or that you are not registered yet."
            );
          }
        })
        .then((data) => {
          if (data) {
            cookie.set("accessToken", data.access_token, { expires: 1 / 96 });
            cookie.set("refreshToken", data.refresh_token, { expires: 7 });
          }
        });
    } catch (err) {
      setSignUpInfo(
        "Ihre Eingaben konnten nicht verarbeitet werden, versuchen Sie es später erneut"
      );
      console.log(err);
    }
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
            iconName="SvgEmail"
            required={true}
            validatorFunction={validator.isEmail}
            validatorParams={[LENGTHS.EMAIL]}
            setValidInput={setEmailValid}
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
      <StyledInfo>
        <p>{signUpInfo}</p>
        {isLoggedIn && (
          <ButtonLayout>
            <Link href="/profile/settings">
              <a>
                <Button
                  backgroundColor="primary"
                  color="primary"
                  label="See your profile"
                  onClick={() => {}}
                ></Button>
              </a>
            </Link>
            <Button
              backgroundColor="secondary"
              color="primary"
              label="Logout"
              onClick={() => {
                logout();
                setSignUpInfo("");
                setLoggedIn(false);
              }}
            ></Button>
          </ButtonLayout>
        )}
        {!loginSuccess && signUpInfo && (
          <ButtonLayout>
            <Button
              backgroundColor="secondary"
              color="primary"
              label="Try again"
              onClick={() => {
                setSignUpInfo("");
              }}
            ></Button>
          </ButtonLayout>
        )}
      </StyledInfo>
    </>
  );
};
