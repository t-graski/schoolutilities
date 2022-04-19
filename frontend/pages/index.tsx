import { styled } from "../stitches.config";
import { Navbar } from "../components/organisms/Navbar";
import Head from "next/head";
import { StartPageBox } from "../components/molecules/StartPageBox";
import Image from "next/image";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("../components/organisms/Footer"));
const GeneralList = dynamic(
  () => import("../components/organisms/GeneralList")
);

export const MainContent = styled("div", {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100vw",
  paddingTop: "98px",
});

const FirstBoxLayout = styled("div", {
  display: "flex",
  width: "100vw",
  marginTop: "18vh",
  height: "82vh",
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
      <MainContent>
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
        <Navbar />
        <ArtworkLayout>
          <Image
            layout="fill"
            alt="Main Artwork"
            src="/images/startpage_artwork.svg"
          />
        </ArtworkLayout>
        <FirstBoxLayout>
          <StartPageBox
            title="LET’S MAKE"
            title2=" SCHOOL EASY."
            description="We think it is extremely important to bring
            joy into the daily School-Routine of students
            and teachers. With incredible features and
            the right design, we make this possible."
            descriptionLine="This is SchoolUtilities."
            buttonText="REGISTER NOW"
            buttonLink="/auth?tab=register"
            linkText="LEARN MORE"
            linkUrl="/learn-more"
          ></StartPageBox>
        </FirstBoxLayout>
        <div data-aos="fade-up">
          <GeneralList
            items={[
              {
                title: "Discord-Bot",
                description:
                  "Take a look at our Discord-Bot, which reminds you on upcoming Events and simplifies your life.",
                href: "/bot",
                buttonText: "LET'S GET STARTED",
                iconName: "SvgDiscordLogo",
              },
              {
                title: "Create School",
                description:
                  "Create your own School and invite your friends to join you. Of course, you can edit everything as you wish. ",
                href: "/school/create",
                buttonText: "GET ME THERE",
                iconName: "SvgSchool",
              },
              {
                title: "Premium",
                description:
                  "To enjoy even more of SchoolUtilities' functionality, you can upgrade to Premium and appreciate ALL the benefits we offer.",
                href: "/premium",
                buttonText: "LEARN MORE",
                iconName: "SvgPremium",
              },
            ]}
          ></GeneralList>
        </div>
        <Footer />
      </MainContent>
    </>
  );
}
