import { styled } from "../stitches.config";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { StartPageNav } from "../components/StartPageNav";
import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import Head from "next/head";
import { logout } from "../misc/authHelper";
import { StartPageBox } from "../components/StartPageBox";
import { GeneralList } from "../components/GeneralList";

const Maincontent = styled("div", {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100vw",
});

const FirstBoxLayout = styled("div", {
  display: "flex",
  width: "100vw",
  marginTop: "18vh",
  height: "82vh",
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
          <StartPageBox
            title="LET’S MAKE"
            title2=" SCHOOL EASY."
            description="We think it is extremely important to bring
            joy into the daily School-Routine of students
            and teachers. With incredible features and
            the right design, we make this possible."
            descriptionLine="This is SchoolUtilities."
            buttonText="JOIN US"
            buttonLink="/auth/register"
            linkText="LEARN MORE"
            linkUrl="/features"
          ></StartPageBox>
        </FirstBoxLayout>
        <GeneralList
          items={[
            {
              title: "Discord-Bot",
              description:
                "Take a look at our Discord-Bot, which reminds you on upcoming Events and simplifies your life.",
              href: "https://discord.com/oauth2/authorize?client_id=737357503989415956&permissions=8&scope=bot",
              buttonText: "INVITE",
              iconName: "SvgDiscordLogo",
            },
            {
              title: "Features",
              description:
                "Learn more about all the features, our service has available for you. Don’t worry, we’ve got you covered.",
              href: "/features",
              buttonText: "GET ME THERE",
              iconName: "SvgChecklist",
            },
            {
              title: "About Us",
              description:
                "We think it’s cool to know who the people behind a service are. Learn more about us and our role in the team.",
              href: "/about-us",
              buttonText: "OK, LET’S GO",
              iconName: "SvgInfo",
            },
          ]}
        ></GeneralList>
        <Footer />
      </Maincontent>
    </>
  );
}
