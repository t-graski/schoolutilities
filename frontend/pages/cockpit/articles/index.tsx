import { styled } from "../../../stitches.config";
import { Navbar } from "../../../components/organisms/Navbar";
import Head from "next/head";
import Footer from "../../../components/organisms/Footer";
import { Spacer } from "../../../components/atoms/Spacer";
import { EditableList } from "../../../components/organisms/EditableList";
import { CockpitSideDashboardBar } from "../../../components/organisms/cockpit/CockpitSideDashboardBar";
import { MainContent } from "../../index";

export const ContentLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "40px",
});

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
          <CockpitSideDashboardBar active="Articles"></CockpitSideDashboardBar>
          <EditableList
            headline="Articles"
            headlineDescription="Articles are the main content of your cockpit. You can add, edit and delete articles here."
            addEntry={() => {}}
            entries={[
              {
                name: "Article 1",
                description: "This is the first article",
                id: "1",
              },
              {
                name: "Article 2",
                description: "This is the second article",
                id: "2",
              },
            ]}
            entryProperties={{
              name: "name",
              description: "description",
              id: "id",
            }}
            editEntry={() => {}}
            deleteEntry={() => {}}
          ></EditableList>
        </ContentLayout>
        <Footer />
      </MainContent>
    </>
  );
}
