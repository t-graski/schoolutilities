import Head from "next/head";
import { Navbar } from "../../components/organisms/Navbar";
import { Spacer } from "../../components/atoms/Spacer";
import { Headline } from "../../components/atoms/Headline";
import { Separator } from "../../components/atoms/Separator";
import Footer from "../../components/organisms/Footer";
import { Changelog } from "../../components/organisms/Changelog";

export default function RegisterApproved() {
  return (
    <>
      <Head>
        <title>Change-Logs - SchoolUtilities</title>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7476966411807562"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="Change-Logs"></Headline>
      <Spacer size="verySmall"></Spacer>
      <Separator width="small" alignment="center" />
      <Spacer size="small"></Spacer>
      <Changelog></Changelog>
      <Footer></Footer>
    </>
  );
}
