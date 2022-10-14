import React, { useState } from "react";
import { styled } from "../../../stitches.config";
import { Spacer } from "../../atoms/Spacer";
import { useRouter } from "next/router";
import { Headline } from "../../atoms/Headline";
import { Separator } from "../../atoms/Separator";
import { Button } from "../../atoms/Button";
import { PasswordInput } from "../../atoms/input/PasswordInput";
import SvgPassword from "../../atoms/svg/SvgPassword";
import SvgChangePasswordArtwork from "../../atoms/svg/SvgChangePasswordArtwork";
import { PASSWORD_VALIDATION_MESSAGES } from "../../../utils/parameterConstants";

const PasswordResetLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginTop: "20px",
  marginBottom: "20px",
  borderRadius: "25px",
});

const StyledContentLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "20px",
  paddingBottom: "60px",
  borderRadius: "25px",
  backgroundColor: "transparent",
  transition: "all 100ms ease-in-out",
});

const PasswordResetLayoutOverview = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20vw",
  padding: "$2x 8vw",
});

const StyledInputLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
});

const SvgLayout = styled("div", {
  display: "flex",
  width: "100%",
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
      <PasswordResetLayoutOverview>
        <StyledInputLayout>
          <Headline label="RESET YOUR PASSWORD" alignment={"left"}></Headline>
          <Spacer size="small"></Spacer>
          {!responseText && (
            <PasswordResetLayout>
              <StyledContentLayout>
                <PasswordInput
                  label="Password"
                  value={password}
                  onChange={setPassword}
                  icon={SvgPassword}
                  required={true}
                  setValidInput={setPasswordValid}
                  errorMessage="Please enter a valid password"
                  validationOptions={PASSWORD_VALIDATION_MESSAGES}
                ></PasswordInput>
                <PasswordInput
                  label="Password Confirmation"
                  value={passwordConfirmation}
                  onChange={setPasswordConfirmation}
                  icon={SvgPassword}
                  required={true}
                  setValidInput={setPasswordConfirmationValid}
                  errorMessage="Please enter a valid password"
                  validationOptions={PASSWORD_VALIDATION_MESSAGES}
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
                  Change Password
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
        </StyledInputLayout>
        <SvgLayout>
          <SvgChangePasswordArtwork></SvgChangePasswordArtwork>
        </SvgLayout>
      </PasswordResetLayoutOverview>
    </>
  );
};
