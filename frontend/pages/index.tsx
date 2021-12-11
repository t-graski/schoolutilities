import { styled } from "../stitches.config";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { StartPageNav } from "../components/StartPageNav";
import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import Head from "next/head";
import { logout } from "../misc/authHelper";

const Maincontent = styled("div", {
  position: "absolute",
  top: "0",
  left: "25vw",
  width: "75vw",
});

export default function Home() {
  const router = useRouter();
  let path = router.query;
  if (path && path.logout) {
    logout();
  }

  const [userData, setUserData] = useState(null);
  if (cookie.get("access_token")) {
    let token = cookie.get("access_token");
    useEffect(() => {
      fetch("https://discord.com/api/users/@me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((jsonResponse) => {
          setUserData(jsonResponse);
        });
    }, []);
  }

  return (
    <>
      <Head>
        <title>SchoolUtilities</title>
        <meta property="og:type" content="SchoolUtilities"></meta>
        <meta property="og:url" content="https://schoolutilities.net/"></meta>
        <meta property="og:title" content="SchoolUtilities"></meta>
        <meta
          property="og:description"
          content="The easiest way to manage your school discord server"
        ></meta>
        <meta
          property="og:image"
          content="https://i.imgur.com/KJ63K3r.png"
        ></meta>
      </Head>
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
        isOnMain={true}
      ></Navbar>
      <Maincontent>
        <StartPageNav
          links={[
            // {
            //   href: userData ? "/dashboard" : process.env.DISCORD_LOGIN_URL,
            //   label: userData ? "Dashboard" : "Login with Discord",
            //   imageSrc: userData
            //     ? "/images/business-report.svg"
            //     : "/images/discord.svg",
            //   imageAlt: "Discord logo",
            // },
            {
              href: "/auth/register",
              label: "Register",
              imageSrc: "/images/user.svg",
              imageAlt: "Register",
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
          ]}
        ></StartPageNav>
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
              href: "/?logout=true",
              label: "Logout",
            },
          ]}
        ></Footer>
      </Maincontent>
    </>
  );
}
