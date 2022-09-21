import Head from "next/head";
const Navbar = dynamic(() => import("../../../../components/organisms/Navbar"));
import { SiteLayout } from "../../../../components/atoms/SiteLayout";
import { Spacer } from "../../../../components/atoms/Spacer";
import { Headline } from "../../../../components/atoms/Headline";
import { Separator } from "../../../../components/atoms/Separator";
import { CourseSelectionList } from "../../../../components/organisms/course/CourseSelectionList";
import Footer from "../../../../components/organisms/Footer";
import dynamic from "next/dynamic";
import { TimeTableOverview } from "../../../../components/organisms/time-table/TimeTableOverview";

export default function ShowCourses() {
  return (
    <SiteLayout>
      <Head>
        <title>Course Setup - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <TimeTableOverview></TimeTableOverview>
    </SiteLayout>
  );
}
