import { styled } from "../stitches.config";
import { Navbar } from "../components/organisms/Navbar";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Spacer } from "../components/atoms/Spacer";
import { BrandStartPageField } from "../components/organisms/brand/BrandStartPageField";
import { LogoPresentationBox } from "../components/organisms/brand/LogoPresentationBox";
import { ColorBox } from "../components/organisms/brand/ColorBox";
import { FontTags } from "../components/organisms/brand/FontTags";
import SvgLogoPencilCombinedCompact from "../components/atoms/svg/SvgLogoPencilCombinedCompact";
import SvgLogoPencilCombinedCompactBlack from "../components/atoms/svg/SvgLogoPencilCombinedCompactBlack";
import SvgLogoPencilCombinedCompactWhite from "../components/atoms/svg/SvgLogoPencilCombinedCompactWhite";
import SvgLogoPencilLeft from "../components/atoms/svg/SvgLogoPencilLeft";
import SvgLogoPencilLeftBlack from "../components/atoms/svg/SvgLogoPencilLeftBlack";
import SvgLogoPencilLeftWhite from "../components/atoms/svg/SvgLogoPencilLeftWhite";

const Footer = dynamic(() => import("../components/organisms/Footer"));

export const MainContent = styled("div", {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100vw",
  paddingTop: "98px",
});

const StyledH2 = styled("h2", {
  fontSize: "2.8rem",
  fontWeight: "bold",
  marginBottom: "0.5rem",
  marginTop: "0.5rem",
});

const StyledH3 = styled("h3", {
  fontSize: "1.6rem",
  margin: "20px 0",
});

const ContentLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "50px 0",
});

export const InnerContentLayout = styled("div", {
  padding: "0 10vw",
});

export default function Home() {
  return (
    <>
      <MainContent>
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
        <Spacer size="small"></Spacer>
        <ContentLayout>
          <InnerContentLayout>
            <BrandStartPageField
              title="OUR BRAND"
              description={`We love to give our services a minimalistic and timeless look to keep them modern through generations and to provide our users a luxury experience while getting their work done. Our team is keen to develop on the highest possible standards at every time. Let’s keep rising together!`}
            ></BrandStartPageField>
            <Spacer size="medium"></Spacer>
            <StyledH2>Logos</StyledH2>
            <LogoPresentationBox
              description="Our default logo with lettering is available in three different variants: Color, black - and white!"
              logos={[
                { name: "LogoPencilCombinedCompact", icon: SvgLogoPencilCombinedCompact, imageBg: "1" },
                { name: "LogoPencilCombinedCompactBlack", icon: SvgLogoPencilCombinedCompactBlack, imageBg: "2" },
                { name: "LogoPencilCombinedCompactWhite", icon: SvgLogoPencilCombinedCompactWhite, imageBg: "3" },
              ]}
            ></LogoPresentationBox>
            <Spacer size="small"></Spacer>
            <StyledH2>Other Logos</StyledH2>
            <LogoPresentationBox
              description="Brand-lettering with icon"
              logos={[
                { name: "LogoPencilLeft", icon: SvgLogoPencilLeft, imageBg: "1" },
                { name: "LogoPencilLeftBlack", icon: SvgLogoPencilLeftBlack, imageBg: "2" },
                { name: "LogoPencilLeftWhite", icon: SvgLogoPencilLeftWhite, imageBg: "3" },
              ]}
            ></LogoPresentationBox>
            <Spacer size="small"></Spacer>
            <LogoPresentationBox
              description="Pencil icon only"
              logos={[
                {
                  name: "LogoPencilOnly",
                  imageBg: "1",
                  orientation: "vertical",
                },
                {
                  name: "LogoPencilOnlyBlack",
                  imageBg: "2",
                  orientation: "vertical",
                },
                {
                  name: "LogoPencilOnlyWhite",
                  imageBg: "3",
                  orientation: "vertical",
                },
              ]}
            ></LogoPresentationBox>
          </InnerContentLayout>
          <Spacer size="small"></Spacer>
          <ColorBox
            title="COLORS"
            colors={[
              { name: "Mid Blue", hexCode: "#B1B6CD" },
              { name: "Red", hexCode: "#DB8A8A" },
              { name: "Green", hexCode: "#B8D8B8" },
              { name: "Blue", hexCode: "#798FB5" },
              { name: "White", hexCode: "#FFFFFF" },
              { name: "Light Gray", hexCode: "#D9D9D9" },
              { name: "Dark Gray", hexCode: "#898989" },
              { name: "Black", hexCode: "#000000" },
            ]}
          ></ColorBox>
          <InnerContentLayout>
            <Spacer size="small"></Spacer>
            <StyledH2>FONTS</StyledH2>
            <StyledH3>Poppins</StyledH3>
            <FontTags
              fontStyles={["Lighter", "Light", "Regular", "Bold", "Bolder"]}
            ></FontTags>
            <Spacer size="small"></Spacer>
          </InnerContentLayout>
        </ContentLayout>
        <Footer />
      </MainContent>
    </>
  );
}
