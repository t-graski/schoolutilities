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
          {
            href: "/dashboard",
            label: "Dashboard",
          },
        ]}
      ></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="About Us"></Headline>
      <Separator width="small" alignment="center" />
      <AboutUsItem imageSrc="/media/user.svg" imageAlt="user" name="David" position="CDO" description="This is some sample text" roles={["CDO", "CDO"]} />
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
