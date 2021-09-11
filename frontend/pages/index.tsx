import Head from "next/head";
import { styled } from "../stitches.config";
import StitchesLogo from "../components/StitchesLogo";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import React from "react";

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
      ]}></Navbar>
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
    </>
  );
}
