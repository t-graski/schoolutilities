import Head from "next/head";
import { Navbar } from "../../components/organisms/Navbar";
import { Spacer } from "../../components/atoms/Spacer";
import { Headline } from "../../components/atoms/Headline";
import { Separator } from "../../components/atoms/Separator";
import Footer from "../../components/organisms/Footer";
import HelpOverview from "../../components/organisms/help/HelpOverview";
import { getAccessToken } from "../../misc/authHelper";
import { useEffect, useState } from "react";

export default function RegisterApproved() {
  const [isFirstTime, setIsFirstTime] = useState(true);
  useEffect(() => {
    if (isFirstTime) {
      getContent();
      setIsFirstTime(false);
    }
  });

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
            title: item.headline,
            href: `/help/articles/${item.articleUUID}`,
            description: item.catchPhrase,
            iconName: "SvgAlert",
          };
        })
      );
    }
  };

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
      <HelpOverview items={items}></HelpOverview>
      <Spacer size="small"></Spacer>
      <Footer></Footer>
    </>
  );
}
