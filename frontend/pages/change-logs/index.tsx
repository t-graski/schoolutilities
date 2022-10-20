import Head from "next/head";
const Navbar = dynamic(() => import("../../components/organisms/Navbar"));
import { Spacer } from "../../components/atoms/Spacer";
import { Headline } from "../../components/atoms/Headline";
import { Separator } from "../../components/atoms/Separator";
import Footer from "../../components/organisms/Footer";
import { Changelog } from "../../components/organisms/Changelog";
import dynamic from "next/dynamic";
import { BannerAd } from "../../components/molecules/ads/BannerAd";

export default function RegisterApproved({ entries }) {
  return (
    <>
      <Head>
        <title>Change-Logs - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Headline label="Change-Logs"></Headline>
      <Spacer size="verySmall"></Spacer>
      <Separator width="small" alignment="center" />
      <Spacer size="small"></Spacer>
      <Changelog entries={entries}></Changelog>
      <BannerAd></BannerAd>
      <Footer></Footer>
    </>
  );
}

export function getStaticProps() {
  return {
    props: {
      entries: [
        {
          name: "new-course-elements-bug-fixes",
          date: "April 23, 2022",
          headline: "April 23, 2022 - Patch Notes",
          text: "Today  we are releasing a new course element, bug fixes and many changes.\n\nClick the box to read more!",
        },
        {
          name: "courses-element-creation",
          date: "March 6, 2022",
          headline: "March 6, 2022 - Patch Notes",
          text: "In this release we add the ability to create elements in courses.\n\nClick the box to read more!",
        },
        {
          name: "courses-bug-fixes",
          date: "January 16, 2022",
          headline: "January 16, 2022 - Patch Notes",
          text: "This is our second release. In this release we fix bugs and add more features.\n\nClick the box to read more!",
        },
        {
          name: "login-registration-school-create",
          date: "December 20, 2021",
          headline: "December 20, 2021 - Patch Notes",
          text: "This is our very first release. In this release we present login, registration, school creation and much more.\n\nClick the box to read more!",
        },
      ],
    },
  };
}
