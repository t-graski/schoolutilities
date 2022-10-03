import React from "react";
import Head from "next/head";
const Navbar = dynamic(() => import("../../components/organisms/Navbar"));
import { Spacer } from "../../components/atoms/Spacer";
import { Headline } from "../../components/atoms/Headline";
import { Separator } from "../../components/atoms/Separator";
import Footer from "../../components/organisms/Footer";
import Link from "next/link";
import { ArticleLayout } from "../../components/article/ArticleLayout";
import { GeneralLayout } from "../../components/article/GeneralLayout";
import { StyledLink } from "../../components/article/Link";
import { ArticleDetails } from "../../components/article/ArticleDetails";
import { ArticleList } from "../../components/article/ArticleList";
import dynamic from "next/dynamic";

export default function Article() {
  const articleDetails = {
    title: "Courses and Bug Fixes",
    author: "Tobias Graski",
    date: "4/23/2022",
    readingTime: "2 min read",
  };

  return (
    <>
      <Head>
        <title>Patch Notes - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="January 16, 2022 - Patch Notes"></Headline>
      <Separator width="small" alignment="center" />
      <Spacer size="small"></Spacer>
      <ArticleDetails {...articleDetails}></ArticleDetails>
      <Spacer size="verySmall"></Spacer>
      <GeneralLayout>
        <ArticleLayout>
          <p>
            Hey,
            <br />
            We are proud to announce the release of our brand new assignment
            course element. Additionally, many bugs on the entire page have been
            fixed. Also worth mentioning are the numerous changes we have made
            to improve your experience.
          </p>
          <br />
          <Headline
            label="Assignment"
            fontSize="verySmall"
            alignment="left"
          ></Headline>
          <p>
            It is now possible to create assignments in your course by clicking{" "}
            <Link href="/course/create" passHref>
              <StyledLink>here</StyledLink>
            </Link>
            .
            <br />
            Our assingments are highly customizable to perfectly fit into your
            everyday schoo life.
          </p>
          <br />
          <Headline
            label="Status"
            fontSize="verySmall"
            alignment="left"
          ></Headline>
          <p>
            We are also very excited to announce our new Status Page. From that
            page, you can always find the latest information about how our
            services are performing. If you are interested, you can find the
            details{" "}
            <Link href="https://schoolutilities.statuspage.io/" passHref>
              <StyledLink>here</StyledLink>
            </Link>
            .
          </p>
          <br />
          <Headline
            label="New features & Changes"
            fontSize="verySmall"
            alignment="left"
          ></Headline>
          <ArticleList>
            <li>Add new scrolling animation to main page</li>
            <li>Add help center start page</li>
            <li>Add new skeleton loading animations</li>
            <li>Add cookie banner</li>
            <li>Add functionality to change students&apos; roles</li>
            <li>Add new navbar</li>
            <li>Change footer</li>
            <li>Improve loading times by reducing bundle size</li>
            <li>Removed versioning from our Patch Notes</li>
          </ArticleList>
          <br />
          <Headline
            label="Bug fixes"
            fontSize="verySmall"
            alignment="left"
          ></Headline>
          <ArticleList>
            <li>Fix separator</li>
          </ArticleList>
          <br />
          <Headline
            label="What're our plans?"
            fontSize="verySmall"
            alignment="left"
          ></Headline>
          <p>
            We are currently working on translating our website in multiple
            languages.
          </p>
          <br />
          <p>Thanks for reading and see you soon!</p>
        </ArticleLayout>
      </GeneralLayout>
      <Spacer size="verySmall"></Spacer>
      <Footer></Footer>
    </>
  );
}
