import Head from "next/head";
import { Navbar } from "../../components/organisms/Navbar";
import { Spacer } from "../../components/atoms/Spacer";
import { Headline } from "../../components/atoms/Headline";
import { Separator } from "../../components/atoms/Separator";
import Footer from "../../components/organisms/Footer";
import HelpOverview from "../../components/organisms/help/HelpOverview";

export default function RegisterApproved() {
  return (
    <>
      <Head>
        <title>Help - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="Help Center"></Headline>
      <Separator width="small" alignment="center" />
      <Spacer size="small"></Spacer>
      <HelpOverview items={[
        {
          title: "How do I register my school?",
          href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          iconName: "SvgAlert",
        },
        {
          title: "How do I register my school?",
          href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          iconName: "SvgAlert",
        },
        {
          title: "How do I register my school?",
          href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          iconName: "SvgAlert",
        },
        {
          title: "How do I register my school?",
          href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          iconName: "SvgAlert",
        },
        {
          title: "How do I register my school?",
          href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          iconName: "SvgAlert",
        },
      ]}></HelpOverview>
      <Spacer size="small"></Spacer>
      <Footer></Footer>
    </>
  );
}
