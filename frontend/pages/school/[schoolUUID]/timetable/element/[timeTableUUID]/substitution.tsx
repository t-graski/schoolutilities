import Footer from "../../../../../../components/organisms/Footer";
const Navbar = dynamic(
  () => import("../../../../../../components/organisms/Navbar")
);
import Head from "next/head";
import { Headline } from "../../../../../../components/atoms/Headline";
import { Separator } from "../../../../../../components/atoms/Separator";
import { ContentLayout } from "../../../../../../utils/styles";
import dynamic from "next/dynamic";
import { ChangeCreateItem } from "../../../../../../components/organisms/time-table/ChangeCreateItem";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { getTimeTableElement } from "../../../../../../utils/requests/timeTable";
import { SetStateAction } from "react";
import { TimeTableItemType } from "../../../../../../components/atoms/TimeTableItem";
import { ChangeCreateSubstitution } from "../../../../../../components/organisms/time-table/ChangeCreateSubstitution";

export default function EditTimeTableElement() {
  const router = useRouter();

  const timeTableUUID = router.query.timeTableUUID as string;

  const { data: timeTableElement, status } = useQuery(
    ["timetableElement", timeTableUUID],
    () => getTimeTableElement(timeTableUUID)
  );

  return (
    <>
      <Head>
        <title>Edit Timetable Element - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <ContentLayout>
        <Headline label="Edit timetable item"></Headline>
        <Separator width="small" alignment="center" />
        <ChangeCreateSubstitution ></ChangeCreateSubstitution>
      </ContentLayout>
      <Footer></Footer>
    </>
  );
}
