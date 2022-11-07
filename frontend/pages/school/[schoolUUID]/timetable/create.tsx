import Footer from "../../../../components/organisms/Footer";
const Navbar = dynamic(() => import("../../../../components/organisms/Navbar"));
import Head from "next/head";
import { Headline } from "../../../../components/atoms/Headline";
import { Separator } from "../../../../components/atoms/Separator";
import { ContentLayout } from "../../../../utils/styles";
import dynamic from "next/dynamic";
import { ChangeCreateItem } from "../../../../components/organisms/time-table/ChangeCreateItem";
import { useState } from "react";
import { Button } from "@/atoms/Button";
import { addTimeTableElement } from "utils/requests/timeTable";
import { useRouter } from "next/router";
import { getCurrentWeekMonday } from "@/molecules/time-table/TimeTableWeekSelection";
import { Spacer } from "@/atoms/Spacer";

export default function CreateCourse() {
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;
  const [itemConfig, setItemConfig] = useState<any>({
    timeTableElementStartTime: "",
    timeTableElementEndTime: "",
    timeTableElementDay: "",
    schoolSubject: undefined,
    timeTableElementRoomUUID: "",
    timeTableElementTeachers: [],
    timeTableElementClasses: [],
  });

  return (
    <>
      <Head>
        <title>Course Setup - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <ContentLayout>
        <Headline label="Create timetable item"></Headline>
        <Separator width="big" alignment="center" />
        <Spacer size="3x" />
        <ChangeCreateItem
          itemConfig={itemConfig}
          setItemConfig={setItemConfig}
        ></ChangeCreateItem>
        <Spacer size="3x" />
        <Separator width="big" alignment="center" />
        <Spacer size="3x" />
        <Button
          buttonType="filled"
          onClick={async () => {
            try {
              const response = await addTimeTableElement({
                ...itemConfig,
              });
              router.push(
                `/school/${schoolUUID}/planner?tab=timetable&startDate=${getCurrentWeekMonday()}&schoolClassUUID=${
                  itemConfig.timeTableElementClasses[0]
                }`
              );
            } catch (e) {
              alert("Something went wrong");
            }
          }}
        >
          Create
        </Button>
      </ContentLayout>
      <Footer></Footer>
    </>
  );
}
