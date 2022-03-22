import React, { useEffect } from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/InputField";
import { Button } from "../../atoms/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { getAccessToken, logout } from "../../../misc/authHelper";
import { regex } from "../../../misc/regex";

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
    checkLogin();
  }, []);

  async function checkLogin() {
    const accessToken = await getAccessToken();

    if (accessToken) {
      setSignUpInfo("You are already logged in!");
      setLoggedIn(true);
      setLoginSuccess(true);
    }
  }

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
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
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
              "Something went wrong, while trying to log in. You might have entered wrong credentials or you're not registered yet."
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
            regex={regex.email}
            setValidInput={setEmailValid}
          ></InputField>
          <InputField
            label="Password"
            inputType="password"
            value={password}
            onChange={setPassword}
            iconName="SvgPassword"
            required={true}
            validationOptions={[
              {
                regex: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
                errorMessage: "At least one lowercase and uppercase letter",
                validIconName: "SvgCheckMark",
                invalidIconName: "SvgExclamination",
              },
              {
                regex: /.*[0-9].*/,
                errorMessage: "At least one number",
                validIconName: "SvgCheckMark",
                invalidIconName: "SvgExclamination",
              },
              {
                regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
                errorMessage:
                  "At least one special character (e.g. !@#$%^&*()_+-=[]{};':'|,.<>/)",
                validIconName: "SvgCheckMark",
                invalidIconName: "SvgExclamination",
              },
              {
                regex: /.{8,}/,
                errorMessage: "8 or more letters",
                validIconName: "SvgCheckMark",
                invalidIconName: "SvgExclamination",
              },
            ]}
            isHoverCardVisible={false}
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
