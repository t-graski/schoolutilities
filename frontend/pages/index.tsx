import { styled } from "../stitches.config";
import Head from "next/head";
import { StartPageBox } from "../components/molecules/StartPageBox";
import dynamic from "next/dynamic";
import SvgDiscordLogo from "../components/atoms/svg/SvgDiscordLogo";
import SvgSchool from "../components/atoms/svg/SvgSchool";
import SvgPremium from "../components/atoms/svg/SvgPremium";
import SvgStartpageArtwork from "../components/atoms/svg/SvgStartpageArtwork";

const Footer = dynamic(() => import("../components/organisms/Footer"));
const GeneralList = dynamic(
  () => import("../components/organisms/GeneralList")
);
const Navbar = dynamic(() => import("../components/organisms/Navbar"));

const FirstBoxLayout = styled("div", {
  display: "flex",
  width: "100vw",
  marginTop: "100px",
  paddingBottom: "13vw",
});

const ArtworkLayout = styled("div", {
  display: "block",
  width: "55vw",
  height: "calc(55vw/731*526)",
  position: "absolute",
  top: "0",
  right: "0",
});

export default function Home() {
  return (
    <>
      <Head>
        <title>SchoolUtilities</title>
        <meta property="og:type" content="SchoolUtilities"></meta>
        <meta property="og:url" content="https://schoolutilities.net/"></meta>
        <meta property="og:title" content="SchoolUtilities"></meta>
        <meta name="description" content="LET’S MAKE SCHOOL EASY."></meta>
        <meta
          property="og:description"
          content="LET’S MAKE SCHOOL EASY."
        ></meta>
        <meta
          property="og:image"
          content="https://i.imgur.com/KJ63K3r.png"
        ></meta>
      </Head>
      <Navbar />
      <ArtworkLayout>
        <SvgStartpageArtwork></SvgStartpageArtwork>
      </ArtworkLayout>
      <FirstBoxLayout>
        <StartPageBox></StartPageBox>
      </FirstBoxLayout>
      <GeneralList
        items={[
          {
            title: "Discord Bot",
            description:
              "Take a look at our Discord Bot, which reminds you on upcoming Events and simplifies your life.",
            href: "/bot",
            buttonText: "LET'S GET STARTED",
            icon: SvgDiscordLogo,
          },
          {
            title: "Create School",
            description:
              "Create your own School and invite your friends to join you. Of course, you can edit everything as you wish. ",
            href: "/school/create",
            buttonText: "GET ME THERE",
            icon: SvgSchool,
          },
          {
            title: "Premium",
            description:
              "To enjoy even more of SchoolUtilities' functionality, you can upgrade to Premium and appreciate ALL the benefits we offer.",
            href: "/premium",
            buttonText: "GET PREMIUM",
            icon: SvgPremium,
          },
        ]}
      ></GeneralList>
      <Footer />
    </>
  );
}
