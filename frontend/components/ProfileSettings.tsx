import React, { useEffect, useState } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";
import { InputField } from "./InputField";
import { Button } from "./Button";
import Link from "next/link";
import { regex } from "../misc/regex";
import { useRouter } from "next/router";
import { Headline } from "./Headline";
import { Separator } from "./Separator";
import { Spacer } from "./Spacer";
import { getAccessToken } from "../misc/authHelper";
import { SettingsHeader } from "./SettingsHeader";
import { SettingsEntry } from "./SettingsEntry";
import { SettingsPopUp } from "./SettingsPopUp";
import cookie from "js-cookie";
import { SvgIcon } from "./SvgIcon";

type Props = {};

const ProfileLayout = styled("div", {
  display: "grid",
  justifyContent: "center",
  padding: "3vh 6vw 10vh",
  gridTemplateColumns: "4fr 1fr 5fr 5fr",
});

const GeneralProfileNavbarLayout = styled("div", {});

const ProfileImageLayout = styled("div", {
  borderRadius: "50%",
  margin: "0 30%",
  marginBottom: "20px",
  border: "$fontPrimary solid 2px",
  padding: "7%",
  color: "$fontPrimary",
});

const ProfileName = styled("div", {});

const ProfileNavigationLinks = styled("div", {});

const LinkArrow = styled("div", {
  width: "20px",
  height: "20px",
});

const IconLayout = styled("div", {
  width: "30px",
  height: "30px",
});

const LinkContentLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "70%",
});

const SpecialLinkLayout = styled("div", {
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  color: "$fontPrimary",
});

const LinkLayout = styled("a", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "20px",
  width: "100%",
  padding: "24px",
  borderRadius: "$normal",
  backgroundColor: "$backgroundTertiary",
  cursor: "pointer",
  "&[data-size='small']": {
    justifyContent: "center",
    width: "fit-content",
  },
  variants: {
    color: {
      primary: {},
      secondary: {
        backgroundColor: "$fontPrimary",
      },
      special: {
        backgroundColor: "$specialPrimary",
      },
    },
  },
});

const LinkLabel = styled("p", {
  fontWeight: "bold",
  variants: {
    color: {
      primary: {
        color: "$fontPrimary",
      },
      secondary: {
        color: "$backgroundTertiary",
      },
      special: {
        fontWeight: "normal",
      },
    },
  },
});

const SettingsSpacer = styled("div", {
  height: "100%",
  width: "3px",
  backgroundColor: "$fontPrimary",
  margin: "0 auto",
  marginBottom: "20px",
});

const ProfileDataColumn = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "10px",
});

const InputLabel = styled("p", {
  fontWeight: "500",
  fontSize: "1.8rem",
  color: "$fontPrimary",
  margin: "0",
  marginBottom: "10px",
  textAlign: "left",
  width: "100%",
});

export const ProfileSettings: React.FC<Props> = ({}) => {
    const [userInfo, setUserInfo] = useState({
        firstName: "Firstname",
        lastName: "Lastname",
        email: "Email",
        creationDate: "",
        birthDate: new Date().toISOString(),
    });
  return (
    <>
      <ProfileLayout>
        <GeneralProfileNavbarLayout>
          <ProfileImageLayout>
            <SvgIcon iconName="SvgUser" />
          </ProfileImageLayout>
          <ProfileName>{cookie.get("username")}</ProfileName>
          <ProfileNavigationLinks>
            <SpecialLinkLayout>
              <Link href="">
                <LinkLayout color="special">
                  <IconLayout>
                    <SvgIcon iconName="SvgHome" />
                  </IconLayout>
                  <LinkContentLayout>
                    <LinkLabel color="special">Account</LinkLabel>

                    <LinkArrow color="special">
                      <SvgIcon iconName="SvgRightArrow" />
                    </LinkArrow>
                  </LinkContentLayout>
                </LinkLayout>
              </Link>
            </SpecialLinkLayout>
          </ProfileNavigationLinks>
        </GeneralProfileNavbarLayout>
        <SettingsSpacer></SettingsSpacer>
        <ProfileDataColumn>
          <InputLabel>Firstname</InputLabel>
          <InputField
            inputType="text"
            label="Firstname"
            value={userInfo.firstName}
            onChange={(e) => {}}
            iconName={""}
          />
          <Spacer size="verySmall"></Spacer>
          <InputLabel>Date of Birth</InputLabel>
          <InputField
            inputType="text"
            label="Date of Birth"
            value={new Date(userInfo.birthDate).toLocaleDateString()}
            onChange={(e) => {}}
            iconName={""}
          />
          <Spacer size="verySmall"></Spacer>
        </ProfileDataColumn>
      </ProfileLayout>
    </>
  );
};
