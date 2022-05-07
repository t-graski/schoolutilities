import React, { useState } from "react";
import { styled } from "../../../stitches.config";
import { Spacer } from "../../atoms/Spacer";
import { useRouter } from "next/router";
import { Headline } from "../../atoms/Headline";
import { Separator } from "../../atoms/Separator";
import { InputField } from "../../atoms/input/InputField";
import { regex } from "../../../utils/regex";
import { Button } from "../../atoms/Button";

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

export const PasswordResetField = () => {
  const [email, setEmail] = React.useState("");
  const [emailValid, setEmailValid] = React.useState(false);
  const router = useRouter();
  const [responseText, setResponseText] = useState("");

  async function requestPasswordChange() {
    if (emailValid) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/requestPasswordReset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      if (res.ok) {
        setResponseText("You just got an email to change your password");
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
            <InputField
              label="Email"
              inputType="email"
              value={email}
              onChange={setEmail}
              iconName="SvgEmail"
              regex={regex.email}
              setValidInput={setEmailValid}
              showLabel={false}
            ></InputField>
            <Button
              onClick={() => {
                if (emailValid) {
                  requestPasswordChange();
                }
              }}
              disabled={!emailValid}
              backgroundColor={"primary"}
              color={"primary"}
            >
              Reset Password
            </Button>
          </StyledContentLayout>
        </PasswordResetLayout>
      )}
      {responseText && (
        <PasswordResetLayout>
          <p>{responseText}</p>
        </PasswordResetLayout>
      )}
    </>
  );
};
