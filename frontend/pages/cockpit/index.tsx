import { styled } from "../../stitches.config";
import { Navbar } from "../../components/organisms/Navbar";
import Head from "next/head";
import Footer from "../../components/organisms/Footer";
import { Spacer } from "../../components/atoms/Spacer";
import { SvgIcon } from "../../components/atoms/SvgIcon";
import HelpOverview from "../../components/organisms/help/HelpOverview";

const MainContent = styled("div", {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100vw",
});

const StyledHeadline = styled("h1", {
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "$fontPrimary",
  textAlign: "center",
  margin: "0",
  lineHeight: "4.5rem",
  width: "100%",
});

const SvgLayout = styled("div", {
  display: "inline-block",
  width: "2.5rem",
  height: "2.5rem",
  margin: "0 15px",
});

export default function Home() {
  return (
    <>
      <MainContent>
        <Head>
          <title>Cockpit - SchoolUtilities</title>
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
        <Spacer size="medium"></Spacer>
        <Navbar />
        <StyledHeadline>
          You've just received some superpowers
          <SvgLayout>
            <SvgIcon iconName="SvgSuperman"></SvgIcon>
          </SvgLayout>
          <br />
          What do you wanna do with them?
        </StyledHeadline>
        <HelpOverview
          items={[
            {
              title: "Spread out new information",
              href: "/cockpit/articles",
              description:
                "Increase the feeling of genius updates and new features.",
              iconName: "SvgAlert",
            },
            {
              title: "Help penurious guys",
              href: "/admin/news",
              description:
                "Grab your first aid bag, run to someone and help them with gorgeous articles.",
              iconName: "SvgFirstAidKit",
            },
            {
              title: "Statistics",
              href: "/admin/stats",
              description:
                "Life is all about numbers. Let's learn more about those little fancy characters.",
              iconName: "SvgStats",
            },
          ]}
        ></HelpOverview>
        <Spacer size="medium"></Spacer>
        <Footer />
      </MainContent>
    </>
  );
}
