import Head from "next/head";
import { Navbar } from "../../../../components/organisms/Navbar";
import { SiteLayout } from "../../../../components/atoms/SiteLayout";
import { Spacer } from "../../../../components/atoms/Spacer";
import { Headline } from "../../../../components/atoms/Headline";
import { Separator } from "../../../../components/atoms/Separator";
import { CourseSelectionList } from "../../../../components/organisms/course/CourseSelectionList";
import Footer from "../../../../components/organisms/Footer";
import { useEffect, useState } from "react";
import { getAccessToken } from "../../../../misc/authHelper";
import { useRouter } from "next/router";
import { Article } from "../../../../components/organisms/help/Article";

export default function ArticleOverview() {

  return (
    <SiteLayout>
      <Head>
        <title>Headline</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <Article></Article>
      <Footer></Footer>
    </SiteLayout>
  );
}
