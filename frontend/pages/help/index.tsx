import Head from "next/head";
const Navbar = dynamic(() => import("../../components/organisms/Navbar"));
import { Spacer } from "../../components/atoms/Spacer";
import { Headline } from "../../components/atoms/Headline";
import Separator from "../../components/atoms/Separator";
import Footer from "../../components/organisms/Footer";
import HelpOverview from "../../components/organisms/help/HelpOverview";
import dynamic from "next/dynamic";

export default function RegisterApproved({ items }) {
  return (
    <>
      <Head>
        <title>Help - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Headline label="Help Center"></Headline>
      <Separator width="small" alignment="center" />
      <Spacer size="small"></Spacer>
      <HelpOverview items={items}></HelpOverview>
      <Spacer size="small"></Spacer>
      <Footer></Footer>
    </>
  );
}

export async function getStaticProps() {
  const getRequest = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/articles`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const getResponse = await getRequest.json();
  return {
    props: {
      items: getResponse.map((item) => {
        return {
          title: item.headline,
          href: `/help/articles/${item.articleUUID}`,
          description: item.catchPhrase,
        };
      }),
    },
  };
}
