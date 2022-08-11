import Head from "next/head";
const Navbar = dynamic(() => import("../../components/organisms/Navbar"));
import { Spacer } from "../../components/atoms/Spacer";
import { Headline } from "../../components/atoms/Headline";
import Separator from "../../components/atoms/Separator";
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
      <Separator width="small" alignment="center" />
      <Spacer size="verySmall"></Spacer>
      <SchoolJoin></SchoolJoin>
      <Footer></Footer>
    </>
  );
}
