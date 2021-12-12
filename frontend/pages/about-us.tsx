import Head from "next/head";
import { styled } from "../stitches.config";
import StitchesLogo from "../components/StitchesLogo";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Headline } from "../components/Headline";
import React from "react";
import { Spacer } from "../components/Spacer";
import { Separator } from "../components/Separator";
import { FeatureOverview } from "../components/FeatureOverview";
import { FeatureOverviewList } from "../components/FeatureOverviewList";
import { AboutUsItem } from "../components/AboutUsItem";

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>About Us - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="About Us"></Headline>
      <Separator width="small" alignment="center" />
      <AboutUsItem
        imageSrc="/images/tobias_graski.svg"
        imageAlt="tobias"
        name="Tobias"
        position="Chief Executive Officer"
        description=""
        roles={["Management", "Backend Developer", "Network Developer"]}
      />
      <AboutUsItem
        imageSrc="/images/david_woegerbauer.svg"
        imageAlt="david"
        name="David"
        position="Chief Technology Officer"
        description=""
        roles={["Management", "Frontend Developer", "Backend Developer"]}
      />
      <AboutUsItem
        imageSrc="/images/florian_doppler.svg"
        imageAlt="florian"
        name="Florian"
        position="Chief Design Officer"
        description=""
        roles={["Design", "Frontend Developer"]}
      />
      <Footer></Footer>
    </>
  );
}
