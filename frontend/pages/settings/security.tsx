import { styled } from "@stitches/react";
import Head from "next/head";
import { PasswordInput } from "../../components/atoms/input/PasswordInput";
import { Spacer } from "../../components/atoms/Spacer";
import { PersonalSettingsHeader } from "../../components/molecules/PersonalSettingsHeader";
import { ProfileSettingsNavigation } from "../../components/organisms/profile/ProfileSettingsNavigation";
import { SecuritySettings } from "../../components/pages/profile/SecuritySettings";
import { Typography } from "../../utils/styles";

export default function Home() {
  return (
    <>
      <Head>
        <title>SchoolUtilities</title>
        <meta property="og:type" content="SchoolUtilities"></meta>
        <meta property="og:url" content="https://schoolutilities.net/"></meta>
        <meta property="og:title" content="SchoolUtilities"></meta>
        <meta
          property="og:description"
          content="LET’S MAKE SCHOOL EASY."
        ></meta>
        <meta
          property="og:image"
          content="https://i.imgur.com/KJ63K3r.png"
        ></meta>
      </Head>
      <ProfileSettingsNavigation active={"security"}>
        <PersonalSettingsHeader title={"Security"} />
        <Spacer size={"2x"}></Spacer>
        <SecuritySettings></SecuritySettings>
      </ProfileSettingsNavigation>
    </>
  );
}
