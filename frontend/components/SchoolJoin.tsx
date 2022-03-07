import React, { useEffect, useState } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import Link from "next/link";
import { SvgIcon } from "./SvgIcon";
import { getAccessToken } from "../misc/authHelper";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { InputField } from "./InputField";
import { regex } from "../misc/regex";
import { Button } from "./Button";
import validator from "validator";
import { LENGTHS, PASSWORD } from "../misc/parameterConstants";

export type SideDashboardProps = {};

const SchoolInputLayout = styled("div", {
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

export const SchoolJoin: React.FC<SideDashboardProps> = ({}) => {
  const [joinCode, setJoinCode] = useState("");
  const [joinCodeValid, setJoinCodeValid] = useState(false);
  const router = useRouter();

  if (router.query.joinCode && router.query.joinCode != joinCode) {
    setJoinCode(router.query.joinCode as string);
    setJoinCodeValid(true);
  }

  async function joinSchool() {
    const token = await getAccessToken();
    if (joinCodeValid && token) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/joinSchool`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            joinCode,
          }),
        }
      );
      if (res.ok) {
        let responseJson = await res.json();
        router.push(`/school/${responseJson.schoolUUID}`);
      } else {
        console.log("Error: ", res.status);
      }
    } else if (joinCodeValid) {
      router.push("/auth/login");
    }
  }

  return (
    <>
      <SchoolInputLayout>
        <StyledContentLayout>
          <InputField
            inputType={"text"}
            onChange={setJoinCode}
            iconName={""}
            validatorFunction={validator.isStrongPassword}
            validatorParams={[LENGTHS.JOIN_CODE_NAME]}
            setValidInput={setJoinCodeValid}
            errorMessage="Please enter a valid join code"
            label="Join Code"
            value={joinCode}
          ></InputField>
          <Button
            onClick={() => {
              if (joinCodeValid) {
                joinSchool();
              }
            }}
            disabled={!joinCodeValid}
            backgroundColor={"primary"}
            color={"primary"}
            label={"Join School"}
          ></Button>
        </StyledContentLayout>
      </SchoolInputLayout>
    </>
  );
};
