import { Footer } from "../../../../components/organisms/Footer";
import { Navbar } from "../../../../components/organisms/Navbar";
import { Spacer } from "../../../../components/atoms/Spacer";
import Head from "next/head";
import { CourseSelectionList } from "../../../../components/organisms/course/CourseSelectionList";
import { Headline } from "../../../../components/atoms/Headline";
import { Separator } from "../../../../components/atoms/Separator";

export default function CreateCourse() {
  return (
    <>
      <Head>
        <title>Course Setup - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <Spacer size="medium"></Spacer>
      <Headline label="My Courses"></Headline>
      <Separator width="small" alignment="center" />
      <CourseSelectionList></CourseSelectionList>
      <Spacer size="medium" />
      <Footer></Footer>
    </>
  );
}
