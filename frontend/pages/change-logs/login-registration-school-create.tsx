import React from "react";
import Head from "next/head";
const Navbar = dynamic(() => import("../../components/organisms/Navbar"));
import { Spacer } from "../../components/atoms/Spacer";
import { Headline } from "../../components/atoms/Headline";
import { Separator } from "../../components/atoms/Separator";
import Footer from "../../components/organisms/Footer";
import { ArticleLayout } from "../../components/article/ArticleLayout";
import { GeneralLayout } from "../../components/article/GeneralLayout";
import { StyledLink } from "../../components/article/Link";
import { ArticleDetails } from "../../components/article/ArticleDetails";
import { ArticleList } from "../../components/article/ArticleList";
import dynamic from "next/dynamic";
import { BackLink } from "../../components/molecules/BackLink";

export default function Article() {
  const articleDetails = {
    title: "Login, Registration, School Create and more!",
    author: "Tobias Graski",
    date: "12/20/2021",
    readingTime: "2 min read",
  };

  return (
    <>
      <Head>
        <title>Patch Notes - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <BackLink href={"/change-logs"} label={"Back to help"}></BackLink>
      <Headline label="December 20th, 2021 - Patch Notes"></Headline>
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
            <li>Join someone&apos;s school</li>
            <li>Discord Bot</li>
            <li>And more!</li>
          </ArticleList>
          <br />
          <p>
            If you don&apos;t want to miss out on any previous Patch Logs, you
            can find them{" "}
            <StyledLink href="/patch-logs" passHref>
              here
            </StyledLink>
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
            <StyledLink href="/school/create" passHref>
              here
            </StyledLink>
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
            else&apos;s school{" "}
            <StyledLink href="/school/admin/school-join" passHref>
              here
            </StyledLink>
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
            <StyledLink
              href="https://discord.com/oauth2/authorize?client_id=737357503989415956&permissions=8&scope=bot"
              passHref
            >
              here
            </StyledLink>
            .<br />
            It comes with various features such as:
            <ArticleList>
              <li>Creating your personalized timetable</li>
              <li>Take attendance of your students</li>
              <li>Send a message to all of your students</li>
              <li>
                You can set up all of this in our{" "}
                <StyledLink href="/" passHref>
                  Bot Dashboard
                </StyledLink>
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
            <StyledLink href="https://www.patreon.com/schoolutilities" passHref>
              Patreon
            </StyledLink>
            .<br />
            We are looking forward to see you there!
          </p>
          <br />
          <br />
          <p>
            If you need any help, you can visit our{" "}
            <StyledLink href="/help/faq" passHref>
              FAQ
            </StyledLink>{" "}
            or our{" "}
            <StyledLink href="/help/help-center" passHref>
              Help Center
            </StyledLink>
            .
            <br />
            If you have any quetions, which are not answered feel free to send
            us an E-Mail{" "}
            <StyledLink href="/contact-us" passHref>
              here
            </StyledLink>
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
