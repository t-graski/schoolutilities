import React from "react";
import Head from "next/head";
import { Navbar } from "../../components/Navbar";
import { Spacer } from "../../components/Spacer";
import { Headline } from "../../components/Headline";
import { Separator } from "../../components/Separator";
import { Footer } from "../../components/Footer";
import Link from "next/link";
import { ArticleLayout } from "../../components/article/ArticleLayout";
import { GeneralLayout } from "../../components/article/GeneralLayout";
import { StyledLink } from "../../components/article/Link";
import { ArticleDetails } from "../../components/article/ArticleDetails";
import { ArticleList } from "../../components/article/ArticleList";

export default function Article() {
  const articleDetails = {
    title: "0.1 - Login, Registration, School Create and more!",
    author: "Tobias Graski",
    date: "12/20/2021",
    readingTime: "2 min read",
  };

  return (
    <>
      <Head>
        <title>0.1 - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="SchoolUtilities Version 0.1"></Headline>
      <Separator width="small" alignment="center" />
      <Spacer size="small"></Spacer>
      <ArticleDetails {...articleDetails}></ArticleDetails>
      <Spacer size="verySmall"></Spacer>
      <GeneralLayout>
        <ArticleLayout>
          <p>
            Hey,
            <br />
            Today we are releasing our first big content update for
            SchoolUtilities.
            <br />
            <br />
            It includes:
          </p>
          <ArticleList>
            <li>Registration & Login</li>
            <li>School creation</li>
            <li>Join someone's school</li>
            <li>Discord Bot</li>
            <li>And more!</li>
          </ArticleList>
          <br />
          <p>
            If you don't want to miss out on any previous Patch Logs, you can
            find them{" "}
            <Link href="/patch-logs">
              <StyledLink>here</StyledLink>
            </Link>
            .
          </p>
          <br />
          <Headline
            label="Registration & Login"
            fontSize="verySmall"
            alignment="left"
          ></Headline>
          <p>
            You can now register and login to our website.
            <br />
            Shortly after you successfully registered, you will receive a
            verification E-Mail
            <br />
            from us.
          </p>
          <br />

          <Headline
            label="School creation"
            fontSize="verySmall"
            alignment="left"
          ></Headline>
          <p>
            It is also possible to create your own school by clicking{" "}
            <Link href="/school/create">
              <StyledLink>here</StyledLink>
            </Link>
            .<br />
            You will also be able to create invite codes after successfully
            creating your school
            <br />
            to let all your friend join it.
          </p>
          <br />

          <Headline
            label="Join someone's school"
            fontSize="verySmall"
            alignment="left"
          ></Headline>
          <p>
            In case you are too lazy to set up your very own school, you can
            also join someone
            <br />
            else's school{" "}
            <Link href="/school/admin/school-join">
              <StyledLink>here</StyledLink>
            </Link>
            .<br />
          </p>
          <br />
          <Headline
            label="Discord Bot"
            fontSize="verySmall"
            alignment="left"
          ></Headline>
          <p>
            We also have our own Discord Bot, which you can invite to your
            discord server{" "}
            <Link href="https://discord.com/oauth2/authorize?client_id=737357503989415956&permissions=8&scope=bot">
              <StyledLink>here</StyledLink>
            </Link>
            .<br />
            It comes with various features such as:
            <ArticleList>
              <li>Creating your personalized timetable</li>
              <li>Take attendance of your students</li>
              <li>Send a message to all of your students</li>
              <li>
                You can set up all of this in our{" "}
                <Link href="/">
                  <StyledLink>Bot Dashboard</StyledLink>
                </Link>
              </li>
            </ArticleList>
          </p>
          <br />
          <Headline
            label="Support Us!"
            fontSize="verySmall"
            alignment="left"
          ></Headline>
          <p>
            You can suppoert us now on our brand new{" "}
            <Link href="https://www.patreon.com/schoolutilities">
              <StyledLink>Patreon</StyledLink>
            </Link>
            .<br />
            We are looking forward to see you there!
          </p>
          <br />
          <br />
          <p>
            If you need any help, you can visit our{" "}
            <Link href="/help/faq">
              <StyledLink>FAQ</StyledLink>
            </Link>{" "}
            or our{" "}
            <Link href="/help/help-center">
              <StyledLink>Help Center</StyledLink>
            </Link>
            .
            <br />
            If you have any quetions, which are not answered feel free to send
            us an E-Mail{" "}
            <Link href="/contact-us">
              <StyledLink>here</StyledLink>
            </Link>
            .
          </p>
          <br />
          <p>Thanks for reading, see you soon!</p>
        </ArticleLayout>
      </GeneralLayout>
      <Spacer size="verySmall"></Spacer>
      <Footer></Footer>
    </>
  );
}
