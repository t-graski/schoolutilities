import Footer from "../../../../components/organisms/Footer";
const Navbar = dynamic(() => import("../../../../components/organisms/Navbar"));
import Head from "next/head";
import { Headline } from "../../../../components/atoms/Headline";
import { Separator } from "../../../../components/atoms/Separator";
import { ContentLayout } from "../../../../utils/styles";
import dynamic from "next/dynamic";
import { ChangeCreateItem } from "../../../../components/organisms/time-table/ChangeCreateItem";
import { SetStateAction } from "react";
import { TimeTableItemType } from "../../../../components/atoms/TimeTableItem";
import { WeekdaySelection } from "../../../../components/molecules/WeekdaySelection";
import { SubjectSelectionField } from "../../../../components/molecules/schoolAdmin/SubjectSelectionField";

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
        <WeekdaySelection
          items={[
            {
              name: "Monday",
              shortcut: "M",
              value: "monday",
            },
            {
              name: "Tuesday",
              shortcut: "T",
              value: "tuesday",
            },
            {
              name: "Wednesday",
              shortcut: "W",
              value: "wednesday",
            },
            {
              name: "Thursday",
              shortcut: "T",
              value: "thursday",
            },
            {
              name: "Friday",
              shortcut: "F",
              value: "friday",
            },
            {
              name: "Saturday",
              shortcut: "S",
              value: "saturday",
            },
            {
              name: "Sunday",
              shortcut: "S",
              value: "sunday",
            },
          ]}
          multipleSelection={false}
          updateSelection={() => {}}
        ></WeekdaySelection>
        <SubjectSelectionField
          selectedSubject={""}
          setSelectedSubject={function (subjectUUID: string): void {
            throw new Error("Function not implemented.");
          }}
        ></SubjectSelectionField>
      </ContentLayout>
      <Footer></Footer>
    </>
  );
}
