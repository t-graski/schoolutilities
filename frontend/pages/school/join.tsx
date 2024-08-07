import Head from "next/head";
const Navbar = dynamic(() => import("../../components/organisms/Navbar"));
import { Spacer } from "../../components/atoms/Spacer";
import { Headline } from "../../components/atoms/Headline";
import { SchoolJoin } from "../../components/molecules/school/SchoolJoin";
import Footer from "../../components/organisms/Footer";
import dynamic from "next/dynamic";

export default function RegisterApproved() {
  return (
    <>
      <Head>
        <title>School Join - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="Join a school"></Headline>
      <Spacer size="verySmall"></Spacer>
      <SchoolJoin></SchoolJoin>
      <Footer></Footer>
    </>
  );
}
