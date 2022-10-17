import { styled } from "../stitches.config";
const Navbar = dynamic(() => import("../components/organisms/Navbar"));
import Footer from "../components/organisms/Footer";
import { Headline } from "../components/atoms/Headline";
import { Spacer } from "../components/atoms/Spacer";
import { Separator } from "../components/atoms/Separator";
import Head from "next/head";
import dynamic from "next/dynamic";

const ImprintLayout = styled("div", {
  width: "100%",
  padding: "0 15vw",
  minHeight: "80vh",
  color: "$neutral-500",
});

const MainContentText = styled("p", {
  display: "block",
  marginBlockStart: "1em",
  marginBlockEnd: "1em",
});

export default function Features() {
  return (
    <>
      <Head>
        <title>Contact Us - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Headline label="Contact Us" fontSize="medium"></Headline>
      <ImprintLayout>
        <Spacer size="small"></Spacer>
        <MainContentText>
          E-Mail:{" "}
          <a href="mailto:contact@schoolutilities.net">
            contact@schoolutilities.net
          </a>
          <br />
          Chief Executive Officer: Tobias Graski
          <br />
          Chief Technology Officer: David Wögerbauer
          <br />
          Chief Design Officer: Florian Doppler
        </MainContentText>
        <Spacer size="small"></Spacer>

        <p className="urheberechtserklärung">
          The layout and design of the web pages are protected by copyright. The
          same applies to the content of the contributions. Further use and
          duplication are only permitted for private purposes, changes to them
          are not permitted to be made.
        </p>
      </ImprintLayout>
      <Footer></Footer>
    </>
  );
}
