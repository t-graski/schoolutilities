import Head from "next/head";
import { styled } from "../stitches.config";
import StitchesLogo from "../components/StitchesLogo";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Headline } from "../components/Headline";
import React from "react";
import { Spacer } from "../components/Spacer";
import { Seperator } from "../components/Separator";
import { FeatureOverview } from "../components/FeatureOverview";
import { FeatureOverviewList } from "../components/FeatureOverviewList";

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
          {
            href: "/dashboard",
            label: "Dashboard",
          },
        ]}
      ></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="Features"></Headline>
      <Seperator width="small" alignment="center" />
      <FeatureOverviewList
        features={[
          {
            imageSrc: "/images/timetable.svg",
            imageAlt: "Timetable icon",
            title: "#1 - Timetable",
            description:
              "Construct your timetable depending on your personal needs. Easily set up your timetable with just a few simple steps on our Dashboard.",
          },
          {
            imageSrc: "/images/calculator.svg",
            imageAlt: "Timetable icon",
            title: "#2 - Calculation",
            description:
              "Feel the need to quickly solve some math problems? Just use our new calculation feature!",
          },
          {
            imageSrc: "/images/immigration.svg",
            imageAlt: "Attendance icon",
            title: "#3 - Attendance",
            description:
              "Easier than ever before to check the attendance of your students or friends. This feature also comes with customizable time and roles to check.",
          },
          {
            imageSrc: "/images/promotion.svg",
            imageAlt: "Alert icon",
            title: "#4 - Alert",
            description:
              "You are a teacher, and want to send a message to all your students? This is now easily possible through the use of our alert feature.",
          },
        ]}
      ></FeatureOverviewList>
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
