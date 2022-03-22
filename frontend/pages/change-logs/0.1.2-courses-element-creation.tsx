import React from "react";
import Head from "next/head";
import { Navbar } from "../../components/organisms/Navbar";
import { Spacer } from "../../components/atoms/Spacer";
import { Headline } from "../../components/atoms/Headline";
import { Separator } from "../../components/atoms/Separator";
import Footer from "../../components/organisms/Footer";
import Link from "next/link";
import { ArticleLayout } from "../../components/article/ArticleLayout";
import { GeneralLayout } from "../../components/article/GeneralLayout";
import { ArticleDetails } from "../../components/article/ArticleDetails";
import { ArticleList } from "../../components/article/ArticleList";

export default function Article() {
  const articleDetails = {
    title: "0.1.2 - Course Elements & Bug Fixes",
    author: "Tobias Graski",
    date: "3/6/2022",
    readingTime: "3 min read",
  };

  return (
    <>
      <Head>
        <title>0.1.2 - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline
        fontSize="medium"
        label="SchoolUtilities Version 0.1.2"
      ></Headline>
      <Separator width="small" alignment="center" />
      <Spacer size="small"></Spacer>
      <ArticleDetails {...articleDetails}></ArticleDetails>
      <Spacer size="verySmall"></Spacer>
      <GeneralLayout>
        <ArticleLayout>
          <p>
            Hey,
            <br />
            In the last couple weeks we have patched many bugs as well as added
            a brand new feature to our courses. We are really excited to release
            this new version of SchoolUtilities and show you everything we have
            done lately.
          </p>
          <br />
          <Headline
            label="Course Elements"
            fontSize="verySmall"
            alignment="left"
          ></Headline>
          <p>
            It is now possible to create the first two course elements:
            <ArticleList>
              <li>Headline</li>
              <li>Text</li>
            </ArticleList>
            You can create those elements by opening the menu next to the course
            title and clicking the "Create Element" button. Now you find
            yourself in the "Course-Editing-Mode", in which you can create,
            delete and modify elements as well as drag them around as you wish.
          </p>
          <br />
          <Headline
            label="New Features & Changes"
            fontSize="verySmall"
            alignment="left"
          ></Headline>
          <ArticleList>
            <li>Added new artwork to registration and login pages</li>
            {/* <li>Added new navbar navigation and hover effects</li> */}
            <li>Added lots of fancy new icons</li>
            <li>
              Added an indicator on how strong your password is next to password
              fields
            </li>
            <li>Added the ability to show the password</li>
            <li>Added loading animations to many pages</li>
            <li>Changed school & course selection pages to a better design</li>
            <li>Changed main-page to be responsive</li>
            <li>Changed Pop-up dialogues in school settings</li>
            <li>Changed URL structure for schools and courses</li>
            <li>Changed many many lines of CSS</li>
            <li>Changed some spellings of error messages</li>
            {/* <li>Changed user menu in navbar</li> */}
            <li>Improved security of some backend endpoints</li>
          </ArticleList>
          <br />
          <Headline
            label="Bug Fixes"
            fontSize="verySmall"
            alignment="left"
          ></Headline>
          <ArticleList>
            <li>Fixed a bug, which logged user out after 15 minutes</li>
          </ArticleList>
          <br />
          <p>Thanks for reading and see you soon!</p>
        </ArticleLayout>
      </GeneralLayout>
      <Spacer size="verySmall"></Spacer>
      <Footer></Footer>
    </>
  );
}
