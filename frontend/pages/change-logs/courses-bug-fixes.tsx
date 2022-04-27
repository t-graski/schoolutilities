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
import { StyledLink } from "../../components/article/Link";
import { ArticleDetails } from "../../components/article/ArticleDetails";
import { ArticleList } from "../../components/article/ArticleList";

export default function Article() {
  const articleDetails = {
    title: "Courses and Bug Fixes",
    author: "Tobias Graski",
    date: "1/16/2022",
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
            Over the course of the couple last weeks we have added a some new
            features and fixed a lot of bugs. Here is a little break down of
            what we have added and fixed.
          </p>
          <br />
          <Headline
            label="Courses"
            fontSize="verySmall"
            alignment="left"
          ></Headline>
          <p>
            It is now possible to create courses in your school by clicking{" "}
            <Link href="/course/create-course" passHref>
              <StyledLink>here</StyledLink>
            </Link>
            . You can give it a name, a description, add singular users or a
            whole class to it.
          </p>
          <br />
          <Headline
            label="New Features & Changes"
            fontSize="verySmall"
            alignment="left"
          ></Headline>
          <ArticleList>
            <li>
              Added new questions to our{" "}
              <Link href="/help/faq" passHref>
                <StyledLink>FAQ</StyledLink>
              </Link>{" "}
              page.
            </li>
            <li>Added a new user menu to the navigation bar.</li>
            <li>
              Added a button in the user menu to change the website&apos;s theme.
            </li>
            <li>
              Added{" "}
              <Link href="/contact-us" passHref>
                <StyledLink>Contact Us</StyledLink>
              </Link>{" "}
              page.
            </li>
            <li>New premium tab on main page.</li>
            <li>Changed icons of register and login fields.</li>
            <li>Changed some internal API endpoints.</li>
            <li>
              Changed register button text and make it even more noticeable.
            </li>
            <li>Changed success and error messages to look prettier.</li>
            <li>Changed header to see user menu when logged out.</li>
            <li>CHanged checkbox in register menu.</li>
            <li>Removed reset and logout button in the profile page.</li>
          </ArticleList>
          <br />
          <Headline
            label="Bug Fixes"
            fontSize="verySmall"
            alignment="left"
          ></Headline>
          <ArticleList>
            <li>
              Fixed bug in password validation causing &apos;_&apos; to be not allowed.
            </li>
            <li>Fixed many hyperlinks not working properly</li>
            <li>Fixed favicon not working.</li>
            <li>Fixed CSS not loading fast enough.</li>
            <li>
              Fixed a bug causing users to see schools without being a member of
              it
            </li>
            <li>Fixed a weird bug which stopped certain pages from loading.</li>
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
