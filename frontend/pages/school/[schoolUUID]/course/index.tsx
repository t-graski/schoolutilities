import Footer from "../../../../components/organisms/Footer";
const Navbar = dynamic(() => import("../../../../components/organisms/Navbar"));
import { Spacer } from "../../../../components/atoms/Spacer";
import Head from "next/head";
import { CourseSelectionList } from "../../../../components/organisms/course/CourseSelectionList";
import { Headline } from "../../../../components/atoms/Headline";
import Separator from "../../../../components/atoms/Separator";
import { ContentLayout } from "../../../../utils/styles";
import dynamic from "next/dynamic";

export default function CreateCourse() {
  return (
    <>
      <Head>
        <title>Course Setup - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <ContentLayout>
        <Headline label="My Courses"></Headline>
        <Separator width="small" alignment="center" />
        <CourseSelectionList></CourseSelectionList>
      </ContentLayout>
      <Footer></Footer>
    </>
  );
}
