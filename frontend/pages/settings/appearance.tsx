import Head from "next/head";
import { Spacer } from "../../components/atoms/Spacer";
import { PersonalSettingsHeader } from "../../components/molecules/PersonalSettingsHeader";
import { BigThemeSelection } from "../../components/organisms/profile/BigThemeSelection";
import { ProfileSettingsNavigation } from "../../components/organisms/profile/ProfileSettingsNavigation";
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
      <ProfileSettingsNavigation active={"appearance"}>
        <PersonalSettingsHeader title={"Appearance"} />
        <Spacer size={"6x"}></Spacer>
        <Typography variant={"body1"}>Choose your desired theme of SchoolUtilities.</Typography>
        <Spacer size={"6x"}></Spacer>
        <BigThemeSelection></BigThemeSelection>
      </ProfileSettingsNavigation>
    </>
  );
}
