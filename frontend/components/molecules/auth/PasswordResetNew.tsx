import React, { useState } from "react";
import { styled } from "../../../stitches.config";
import { Spacer } from "../../atoms/Spacer";
import { useRouter } from "next/router";
import { Headline } from "../../atoms/Headline";
import { Separator } from "../../atoms/Separator";
import { InputField } from "../../atoms/input/InputField";
import { regex } from "../../../utils/regex";
import { Button } from "../../atoms/Button";
import { PasswordInput } from "../../atoms/input/PasswordInput";

const PasswordResetLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  marginTop: "20px",
  marginBottom: "20px",
  padding: "0 40px",
  borderRadius: "25px",
});

const StyledContentLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  gap: "20px",
  padding: "0 50px",
  paddingBottom: "60px",
  borderRadius: "25px",
  backgroundColor: "transparent",
  transition: "all 100ms ease-in-out",
});

export const PasswordResetNew = () => {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [passwordValid, setPasswordValid] = React.useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const [passwordConfirmationValid, setPasswordConfirmationValid] =
    React.useState(false);
  const [responseText, setResponseText] = useState("");

  async function requestPasswordChange() {
    const { token } = router.query;

    if (passwordValid && passwordConfirmationValid) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/passwordReset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            password,
          }),
        }
      );

      if (res.ok) {
        setResponseText(
          "You just changed your password, you can now go to the login"
        );
      } else {
        console.log("Error: ", res.status);
      }
    }
  }

  return (
    <>
      <Spacer size="medium"></Spacer>
      <Headline label="Password reset"></Headline>
      <Separator width="small" alignment="center" />
      <Spacer size="small"></Spacer>
      {!responseText && (
        <PasswordResetLayout>
          <StyledContentLayout>
            <PasswordInput
              label="Password"
              value={password}
              onChange={setPassword}
              iconName="SvgPassword"
              required={true}
              setValidInput={setPasswordValid}
              errorMessage="Please enter a valid password"
            ></PasswordInput>
            <PasswordInput
              label="Password Confirmation"
              value={passwordConfirmation}
              onChange={setPasswordConfirmation}
              iconName="SvgPassword"
              required={true}
              setValidInput={setPasswordConfirmationValid}
              errorMessage="Please enter a valid password"
            ></PasswordInput>
            <Button
              onClick={() => {
                if (passwordValid && passwordConfirmationValid) {
                  requestPasswordChange();
                }
              }}
              disabled={!passwordValid || !passwordConfirmationValid}
              backgroundColor={"primary"}
              color={"primary"}
            >
              Change password
            </Button>
          </StyledContentLayout>
        </PasswordResetLayout>
      )}
      {responseText && (
        <PasswordResetLayout>
          <p>{responseText}</p>
          <Button
            onClick={() => {
              router.push("/");
            }}
            disabled={!passwordValid || !passwordConfirmationValid}
            backgroundColor={"primary"}
            color={"primary"}
          >
            Login
          </Button>
          <Spacer size={"small"}></Spacer>
        </PasswordResetLayout>
      )}
    </>
  );
};
