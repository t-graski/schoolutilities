import Head from "next/head";
const Navbar = dynamic(() => import("../../../../components/organisms/Navbar"));
import { SiteLayout } from "../../../../components/atoms/SiteLayout";
import { Spacer } from "../../../../components/atoms/Spacer";
import Footer from "../../../../components/organisms/Footer";
import { getAccessToken } from "../../../../utils/authHelper";
import { Article } from "../../../../components/organisms/help/Article";
import { ContentLayout } from "../../../../utils/styles";
import dynamic from "next/dynamic";

export default function ArticleOverview({ content }) {
  return (
    <SiteLayout>
      <Head>
        <title>Headline</title>
      </Head>
      <Navbar></Navbar>
      <ContentLayout>
        <Spacer size="medium"></Spacer>
        <Article content={content}></Article>
        <Spacer size="small"></Spacer>
      </ContentLayout>
      <Footer></Footer>
    </SiteLayout>
  );
}

export async function getStaticProps({ params }) {
  const accessToken = await getAccessToken();
  const articleUUID = params.articleUUID;
  const getRequest = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/article/${articleUUID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const getResponse = await getRequest.json();
  console.log(getResponse);
  return {
    props: {
      content: getResponse,
    },
  };
}

export async function getStaticPaths() {
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
    paths: [
      ...getResponse.map((item) => {
        return {
          params: {
            articleUUID: item.articleUUID,
          },
        };
      }),
    ],
    fallback: false,
  };
}
