import { styled } from "../../../stitches.config";
const Navbar = dynamic(() => import("../../../components/organisms/Navbar"));
import Head from "next/head";
import Footer from "../../../components/organisms/Footer";
import { EditableList } from "../../../components/organisms/EditableList";
import { CockpitSideDashboardBar } from "../../../components/organisms/cockpit/CockpitSideDashboardBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAccessToken } from "../../../utils/authHelper";
import { SettingsPopUp } from "../../../components/molecules/schoolAdmin/SettingsPopUp";
import dynamic from "next/dynamic";

export const ContentLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "40px",
});

const StyledDeleteText = styled("p", {
  fontSize: "1rem",
  color: "$neutral-500",
  marginTop: "15px",
});

export default function Home() {
  const [deletePopUpIsVisible, setDeletePopUpIsVisible] = useState(false);
  const [articleName, setArticleName] = useState("");
  const [articleUUID, setArticleUUID] = useState("");
  const router = useRouter();
  useEffect(() => {
    getContent();
  }, []);

  const [items, setItems] = useState([]);

  const getContent = async () => {
    let accessToken = await getAccessToken();
    if (accessToken) {
      const getRequest = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/articles`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const getResponse = await getRequest.json();
      setItems(
        getResponse.map((item) => {
          return {
            name: item.articleHeadline,
            id: item.articleUUID,
            description: item.articleCatchPhrase,
          };
        })
      );
    }
  };

  async function deleteSettingsEntry(id) {
    const returnValue = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getAccessToken()}`,
        },
        body: JSON.stringify({
          articleUUID: id,
        }),
      }
    );
    if (returnValue.status !== 200) {
      console.log(returnValue);
    } else {
      let newSettingsEntries = items.filter((item) => item.id !== id);

      setItems(newSettingsEntries);
      if (newSettingsEntries.length == 0) {
        setItems([]);
      }
    }
  }

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
        {deletePopUpIsVisible && (
          <SettingsPopUp
            headline={`Remove ${articleName}`}
            inputValid={true}
            saveLabel="Confirm"
            saveFunction={() => {
              deleteSettingsEntry(articleUUID);
              setDeletePopUpIsVisible(false);
            } }
            closeFunction={() => {
              setDeletePopUpIsVisible(false);
              setArticleName("");
            } } open={false} setOpen={undefined}          >
            <StyledDeleteText>
              This action can&apos;t be undone and will permanently remove the
              class {articleName}.
            </StyledDeleteText>
          </SettingsPopUp>
        )}
        <CockpitSideDashboardBar active="Articles"></CockpitSideDashboardBar>
        <EditableList
          headline="Articles"
          headlineDescription="Articles are the main content of your cockpit. You can add, edit and delete articles here."
          addEntry={() => {
            router.push("/cockpit/articles/create");
          }}
          entries={items}
          entryProperties={{
            name: "name",
            description: "description",
            id: "id",
          }}
          editEntry={(item) => {
            router.push(`/cockpit/articles/${item}/edit`);
          }}
          deleteEntry={(uuid) => {
            setArticleUUID(uuid);
            setArticleName(items.find((item) => item.id === uuid).name);
            setDeletePopUpIsVisible(true);
          }}
        ></EditableList>
      </ContentLayout>
      <Footer />
    </>
  );
}
