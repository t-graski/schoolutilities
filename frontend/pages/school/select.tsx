import Head from "next/head";
const Navbar = dynamic(() => import("../../components/organisms/Navbar"));
import { Spacer } from "../../components/atoms/Spacer";
import { Headline } from "../../components/atoms/Headline";
import { Separator } from "../../components/atoms/Separator";
import { SchoolSelectionList } from "../../components/organisms/school/SchoolSelectionList";
import Footer from "../../components/organisms/Footer";
import dynamic from "next/dynamic";

export default function RegisterApproved() {
  return (
    <>
      <Head>
        <title>School Selection - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="My Schools"></Headline>
      <Separator width="small" alignment="center" />
      <Spacer size="verySmall"></Spacer>
      <SchoolSelectionList></SchoolSelectionList>
      <Spacer size="medium"></Spacer>
      <Footer></Footer>
    </>
  );
}
