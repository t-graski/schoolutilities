import { styled } from "../stitches.config";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { StartPageNav } from "../components/StartPageNav";
import React from "react";

const Maincontent = styled("div", {
  position: "absolute",
  top: "0",
  left: "25vw",
  width: "75vw",
});

export default function Home() {
  return (
    <>
      <Navbar links={[
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
      ]} isOnMain={true}></Navbar>
      <Maincontent>
        <StartPageNav
          links={[
            {
              href: process.env.DICSCORD_LOGIN_URL,
              label: "Login with Discord",
              imageSrc: "/images/discord.svg",
              imageAlt: "Discord logo",
            },
            {
              href: "/features",
              label: "Features",
              imageSrc: "/images/features.svg",
              imageAlt: "Features icon",
            },
            {
              href: "/about-us",
              label: "About us",
              imageSrc: "/images/about_us.svg",
              imageAlt: "Speech bubble",
            },
            {
              href: "/change-log",
              label: "Change Log",
              imageSrc: "/images/change_log.svg",
              imageAlt: "Change Log"
            } 
          ]}
        >

        </StartPageNav>  
        <Footer links={[
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
        ]}></Footer>
        </Maincontent>
    </>
  );
}
