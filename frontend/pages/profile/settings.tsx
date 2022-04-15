import { styled } from "../../stitches.config";
import { Navbar } from "../../components/organisms/Navbar";
import Footer from "../../components/organisms/Footer";
import Head from "next/head";
import { Headline } from "../../components/atoms/Headline";
import { ProfileSettings } from "../../components/organisms/ProfileSettings";

const Maincontent = styled("div", {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100vw",
});

const FirstBoxLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100vw",
  marginTop: "18vh",
});

export default function Home() {
  return (
    <>
      <Maincontent>
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
        <FirstBoxLayout>
          <Headline label="YOUR PROFILE"></Headline>
          <ProfileSettings />
        </FirstBoxLayout>
        <Footer />
      </Maincontent>
    </>
  );
}
