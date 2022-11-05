import React from "react";
import { styled } from "../../../stitches.config";
import { PASSWORD_VALIDATION_MESSAGES } from "../../../utils/parameterConstants";
import {
  changePassword,
  requestEmailChange,
} from "../../../utils/requests/settings";
import { Typography } from "../../../utils/styles";
import { Button } from "../../atoms/Button";
import { CheckBox } from "../../atoms/input/CheckBox";
import { InputField } from "../../atoms/input/InputField";
import { PasswordInput } from "../../atoms/input/PasswordInput";
import { Spacer } from "../../atoms/Spacer";

type Props = {};

const InputLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "$5x",
});

const InputFieldLayout = styled("div", {
  display: "flex",
  width: 320,
});

export const SecuritySettings: React.FC<Props> = () => {
  const [passwordData, setPasswordData] = React.useState({
    oldPassword: "",
    newPassword: "",
  });
  const [newEmail, setNewEmail] = React.useState("");
  const [statusText, setStatusText] = React.useState("");

  return (
    <>
      <Typography variant={"headline6"}>Password</Typography>
      <Spacer size={"1x"}></Spacer>
      <InputLayout>
        <InputFieldLayout>
          <PasswordInput
            label={"Current Password"}
            value={passwordData.oldPassword}
            onChange={(value) =>
              setPasswordData({ ...passwordData, oldPassword: value })
            }
            required={true}
            editable={true}
            showLabel={false}
            errorMessage={"Password does not match requirements"}
            validationOptions={PASSWORD_VALIDATION_MESSAGES}
            showPasswordStrength={false}
          ></PasswordInput>
        </InputFieldLayout>
        <InputFieldLayout>
          <PasswordInput
            label={"New Password"}
            value={passwordData.newPassword}
            onChange={(value) =>
              setPasswordData({ ...passwordData, newPassword: value })
            }
            required={true}
            editable={true}
            showLabel={false}
            errorMessage={"Password does not match requirements"}
            validationOptions={PASSWORD_VALIDATION_MESSAGES}
            showPasswordStrength={true}
          ></PasswordInput>
        </InputFieldLayout>
        <Button
          buttonType={"filled"}
          onClick={async () => {
            try {
              const passwordChangeResponse = await changePassword(passwordData);
              setStatusText("Password changed successfully");
            } catch (error) {
              setStatusText("Password change failed");
            }
          }}
        >
          Change password
        </Button>
      </InputLayout>
      <Spacer size={"5x"}></Spacer>
      <Typography variant={"headline6"}>Email</Typography>
      <Spacer size={"1x"}></Spacer>
      <InputLayout>
        <InputFieldLayout>
          <InputField
            label={"New email"}
            value={newEmail}
            onChange={(value) => setNewEmail(value)}
            required={true}
            editable={true}
            showLabel={false}
            size={"normal"}
            inputType={"email"}
          ></InputField>
        </InputFieldLayout>
        <Button
          buttonType={"filled"}
          onClick={async () => {
            try {
              const emailChangeResponse = await requestEmailChange(newEmail);
              setStatusText("You just got an verification email");
            } catch (error) {
              setStatusText("Email change failed");
            }
          }}
        >
          Change email
        </Button>
      </InputLayout>
      <Spacer size={"5x"}></Spacer>
      <Typography variant={"body1"}>{statusText}</Typography>
      <Spacer size={"8x"}></Spacer>
      <Typography variant={"headline5"}>Preferences</Typography>
      <Spacer size={"1x"}></Spacer>
      <CheckBox onChange={() => {}} disabled={true}>
        Enable 2-factor authentication (coming soon)
      </CheckBox>
    </>
  );
};
