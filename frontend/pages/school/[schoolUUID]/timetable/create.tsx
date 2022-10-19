import Footer from "../../../../components/organisms/Footer";
const Navbar = dynamic(() => import("../../../../components/organisms/Navbar"));
import { Spacer } from "../../../../components/atoms/Spacer";
import Head from "next/head";
import { CourseSelectionList } from "../../../../components/organisms/course/CourseSelectionList";
import { Headline } from "../../../../components/atoms/Headline";
import { Separator } from "../../../../components/atoms/Separator";
import { ContentLayout } from "../../../../utils/styles";
import dynamic from "next/dynamic";
import { ChangeCreateItem } from "../../../../components/organisms/time-table/ChangeCreateItem";
import { SetStateAction } from "react";
import { TimeTableItemType } from "../../../../components/atoms/TimeTableItem";

export default function CreateCourse() {
  return (
    <>
      <Head>
        <title>Course Setup - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <ContentLayout>
        <Headline label="Create timetable item"></Headline>
        <Separator width="small" alignment="center" />
        <ChangeCreateItem
          timeTableElement={{
            timeTableElementUUID: "",
            timeTableElementStartTime: "",
            timeTableElementEndTime: "",
            overlaps: 0,
            overlapStart: 0,
            omitted: {
              timeTableOmittedDate: "",
              timeTableOmittedReason: "",
            },
            schoolSubject: {
              schoolSubjectUUID: "",
              schoolSubjectName: "",
              schoolSubjectAbbreviation: "",
            },
            holidayUUID: "",
            holidayName: "",
            timeTableElementTeachers: [],
            substitution: {
              timeTableSubstitutionUUID: "",
              timeTableSubstitutionClasses: [],
              timeTableSubstitutionTeachers: [],
            },
          }}
          setTimeTableElement={function (
            value: SetStateAction<TimeTableItemType>
          ): void {
            throw new Error("Function not implemented.");
          }}
        ></ChangeCreateItem>
      </ContentLayout>
      <Footer></Footer>
    </>
  );
}
