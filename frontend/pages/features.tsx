import { styled } from "../stitches.config";
import { Navbar } from "../components/organisms/Navbar";
import { Footer } from "../components/organisms/Footer";
import { Headline } from "../components/atoms/Headline";
import React from "react";
import { Spacer } from "../components/atoms/Spacer";
import { Separator } from "../components/atoms/Separator";
import { FeatureOverviewList } from "../components/organisms/FeatureOverviewList";
import Head from "next/head";

export default function Features() {
  return (
    <>
      <Head>
        <title>Features - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="Features"></Headline>
      <Separator width="small" alignment="center" />
      <FeatureOverviewList
        features={[
          {
            iconName: "SvgTimetable",
            title: "#1 - Timetable",
            description:
              "Construct your timetable depending on your personal needs. Easily set up your timetable with just a few simple steps on our Dashboard.",
          },
          {
            iconName: "SvgCalcualtor",
            title: "#2 - Calculation",
            description:
              "Feel the need to quickly solve some math problems? Just use our new calculation feature!",
          },
          {
            iconName: "SvgAttendance",
            title: "#3 - Attendance",
            description:
              "Easier than ever before to check the attendance of your students or friends. This feature also comes with customizable time and roles to check.",
          },
          {
            iconName: "SvgAlert",
            title: "#4 - Alert",
            description:
              "You are a teacher, and want to send a message to all your students? This is now easily possible through the use of our alert feature.",
          },
        ]}
      ></FeatureOverviewList>
      <Footer></Footer>
    </>
  );
}
