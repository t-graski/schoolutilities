import { styled } from "@stitches/react";
import Head from "next/head";
import Image from "next/image";
import { PersonalSettingsHeader } from "../../components/molecules/PersonalSettingsHeader";
import { ProfileSettingsNavigation } from "../../components/organisms/profile/ProfileSettingsNavigation";

const ImageLayout = styled("div", {
  position: "relative",
  display: "flex",
  width: "100%",
  marginTop: "$4x",

  "&::before": {
    content: "''",
    display: "block",
    paddingTop: "calc(100% / (1362 / 362))",
  },
});

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
      <ProfileSettingsNavigation active={"public-profile"}>
        <PersonalSettingsHeader title={"Public profile"} />
        <ImageLayout>
          <Image
            src="/images/coming_soon_public_profile.png"
            alt="Coming soon"
            fill
          ></Image>
        </ImageLayout>
      </ProfileSettingsNavigation>
    </>
  );
}
