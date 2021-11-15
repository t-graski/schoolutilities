import { styled } from "../stitches.config";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Headline } from "../components/Headline";
import React from "react";
import { Spacer } from "../components/Spacer";
import { Separator } from "../components/Separator";

const ImprintLayout = styled("div", {
  width: "100%",
  padding: "0 15vw",
  minHeight: "80vh",
});

const MainContentText = styled("p", {
  display: "block",
  marginBlockStart: "1em",
  marginBlockEnd: "1em",
});

export default function Features() {
  return (
    <>
      <Navbar
        links={[
          {
            href: "/",
            label: "Home",
          },
          {
            href: "/features",
            label: "Features",
          },
        ]}
      ></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="Imprint"></Headline>
      <Separator width="small" alignment="center" />
      <ImprintLayout>
        <h2>SchoolUtilities</h2>
        <Spacer size="small"></Spacer>
        <MainContentText>
          E-Mail:{" "}
          <a href="mailto:contact@schoolutilities.com">
            contact@schoolutilities.com
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
      <Footer
        links={[
          {
            href: "/data-policy",
            label: "Data Policy",
          },
          {
            href: "/imprint",
            label: "Imprint",
          },
          {
            href: "/logout",
            label: "Logout",
          },
        ]}
      ></Footer>
    </>
  );
}
