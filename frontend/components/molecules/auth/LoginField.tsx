import React, { useEffect } from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/input/InputField";
import { Button } from "../../atoms/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { getAccessToken } from "../../../utils/authHelper";
import { regex } from "../../../utils/regex";
import { PasswordInput } from "../../atoms/input/PasswordInput";
import { PASSWORD_VALIDATION_MESSAGES } from "../../../utils/parameterConstants";
import SvgEmail from "../../atoms/svg/SvgEmail";
import SvgPassword from "../../atoms/svg/SvgPassword";

type Props = {};

const LoginLayout = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  color: "$neutral-500",
});

const StyledInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  marginBottom: "20px",

  fontSize: "1.5rem",
  color: "$neutral-500",
  fontWeight: "bold",
});

const ButtonLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "20px",
});

const LoginButtonLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  alignItems: "center",
});

export const LoginField: React.FC<Props> = ({}) => {
  const [email, setEmail] = React.useState("");
  const [emailValid, setEmailValid] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordValid, setPasswordValid] = React.useState(false);
  const [isDisabled, setDisabled] = React.useState(true);
  const [signUpInfo, setSignUpInfo] = React.useState("");
  const router = useRouter();

  checkInputData();

  useEffect(() => {
    checkLogin();

    async function checkLogin() {
      const accessToken = await getAccessToken();

      if (accessToken) {
        router.push("/settings/account");
      }
    }
  }, [router]);

  function checkInputData() {
    console.log(emailValid, passwordValid);
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
      }).then(async (response) => {
        if (response.status == 200) {
          const data = await response.json();
          let redirectRoute: string = Array.isArray(router.query.redirect)
            ? router.query.redirect[0]
            : router.query.redirect;
          cookie.set("accessToken", data.access_token, { expires: 1 / 96 });
          cookie.set("refreshToken", data.refresh_token, { expires: 7 });
          if (router.query && router.query.redirect) {
            router.push(decodeURIComponent(redirectRoute));
          } else {
            router.push("/");
          }
        } else {
          setSignUpInfo(
            "Something went wrong, while trying to log in. You might have entered wrong credentials or you're not registered yet."
          );
        }
      });
    } catch (err) {
      setSignUpInfo(
        "Ihre Eingaben konnten nicht verarbeitet werden, versuchen Sie es später erneut"
      );
    }
  }

  const StyledSubmitButton = styled("input", {
    borderRadius: "8px",
    width: "fit-content",
    border: "none",
    padding: "10px 20px",

    fontSize: "1rem",
    cursor: "pointer",
    color: "$onPrimary",
    fontWeight: "bold",
    backgroundColor: "$primary",

    ":hover": {
      backgroundColor: "$backgroundColor",
      color: "$color",
    },
    ":active": {
      backgroundColor: "$backgroundColor",
      color: "$color",
    },
  });

  return (
    <>
      {!signUpInfo && (
        <LoginLayout onSubmit={handleSubmit}>
          <InputField
            label="Email"
            inputType="email"
            value={email}
            onChange={setEmail}
            icon={SvgEmail}
            required={true}
            regex={regex.email}
            setValidInput={setEmailValid}
          ></InputField>
          <PasswordInput
            label="Password"
            value={password}
            onChange={setPassword}
            icon={SvgPassword}
            required={true}
            validationOptions={PASSWORD_VALIDATION_MESSAGES}
            setValidInput={setPasswordValid}
            showPasswordStrength={false}
          ></PasswordInput>
          <LoginButtonLayout>
            <StyledSubmitButton
              type="submit"
              value="Sign in"
            ></StyledSubmitButton>
            <Link href="/auth/password-reset" passHref>
              <Button buttonType={"text"}>Reset Password</Button>
            </Link>
          </LoginButtonLayout>
        </LoginLayout>
      )}
      <StyledInfo>
        <p>{signUpInfo}</p>
        {signUpInfo && (
          <ButtonLayout>
            <Button
              buttonType={"filled"}
              onClick={() => {
                setSignUpInfo("");
              }}
            >
              Try again
            </Button>
          </ButtonLayout>
        )}
      </StyledInfo>
    </>
  );
};
