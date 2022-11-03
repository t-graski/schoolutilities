import Head from "next/head";
import { PersonalSettingsHeader } from "../../components/molecules/PersonalSettingsHeader";
import { ProfileSettingsNavigation } from "../../components/organisms/profile/ProfileSettingsNavigation";

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
      <ProfileSettingsNavigation active={"account"}>
        <PersonalSettingsHeader title={"Account"} />
      </ProfileSettingsNavigation>
    </>
  );
}
