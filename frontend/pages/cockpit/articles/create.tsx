const Navbar = dynamic(() => import("../../../components/organisms/Navbar"));
import Head from "next/head";
import Footer from "../../../components/organisms/Footer";
import { CockpitSideDashboardBar } from "../../../components/organisms/cockpit/CockpitSideDashboardBar";
import { ArticleAddField } from "../../../components/organisms/cockpit/ArticleAddField";
import { ContentLayout } from ".";
import dynamic from "next/dynamic";

export default function Home() {
  return (
    <>
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
        <ArticleAddField></ArticleAddField>
      </ContentLayout>
      <Footer />
    </>
  );
}
