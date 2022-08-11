const Navbar = dynamic(() => import("../../components/organisms/Navbar"));
import Footer from "../../components/organisms/Footer";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Headline } from "../../components/atoms/Headline";
import Separator from "../../components/atoms/Separator";
import { Spacer } from "../../components/atoms/Spacer";
import { styled } from "@stitches/react";
import { PremiumPlansList } from "../../components/organisms/PremiumPlansList";

const ContentLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "80vw",
  margin: "0 auto",
  maxWidth: "1200px",
});

export default function Features() {
  return (
    <>
      <Head>
        <title>Features - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <ContentLayout>
        <Spacer size="verySmall"></Spacer>
        <Headline label="YOUR PLAN" alignment="left"></Headline>
        <Separator width="small" alignment="left" />
        <PremiumPlansList></PremiumPlansList>
      </ContentLayout>
      <Footer></Footer>
    </>
  );
}
