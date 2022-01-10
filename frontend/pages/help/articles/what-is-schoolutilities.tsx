import React from "react";
import Head from "next/head";
import { Navbar } from "../../../components/Navbar";
import { Spacer } from "../../../components/Spacer";
import { Headline } from "../../../components/Headline";
import { Separator } from "../../../components/Separator";
import { Footer } from "../../../components/Footer";
import Link from "next/link";
import { ArticleLayout } from "../../../components/article/ArticleLayout";
import { GeneralLayout } from "../../../components/article/GeneralLayout";
import { StyledLink } from "../../../components/article/Link";
import { ImageLayout } from "../../../components/article/ImageLayout";
import Image from "next/image";

export default function Article() {
  return (
    <>
      <Head>
        <title>What is SchoolUtilities?</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="What is SchoolUtilities?"></Headline>
      <Separator width="small" alignment="center" />
      <Spacer size="small"></Spacer>
      <GeneralLayout>
        <ArticleLayout>
          <Headline
            label="What is SchoolUtilities?"
            fontSize="small"
          ></Headline>
          <Headline
            label="What is SchoolUtilities?"
            fontSize="medium"
            alignment="left"
          ></Headline>
          <p>
            SchoolUtilities is a web application that allows you to manage your
            school's students, teachers, and other{" "}
            <Link href="/features">
              <StyledLink>school-related</StyledLink>
            </Link>{" "}
            information.
          </p>
          <ul>
            <li>Test 1</li>
            <li>Test 2</li>
            <li>Test 3</li>
          </ul>
          <ImageLayout ratio="1/1">
            <Image
              src="/images/auth/Sign-Up-Mockup.png"
              alt="Sign Up Mockup"
              layout="fill"
            ></Image>
          </ImageLayout>
        </ArticleLayout>
      </GeneralLayout>
      <Spacer size="small"></Spacer>
      <Footer></Footer>
    </>
  );
}
