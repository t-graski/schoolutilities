import Head from "next/head";
import { ContentLayout } from "..";
import { MainContent } from "../../..";
import { CockpitSideDashboardBar } from "../../../../components/organisms/cockpit/CockpitSideDashboardBar";
import Footer from "../../../../components/organisms/Footer";
import { ArticleEdit } from "../../../../components/organisms/help/ArticleEdit";
import { Navbar } from "../../../../components/organisms/Navbar";

export default function Home() {
  return (
    <>
      <MainContent>
        <Head>
          <title>Articles (Cockpit) - SchoolUtilities</title>
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
        <ContentLayout>
          <CockpitSideDashboardBar></CockpitSideDashboardBar>
          <ArticleEdit></ArticleEdit>
        </ContentLayout>
        <Footer />
      </MainContent>
    </>
  );
}
