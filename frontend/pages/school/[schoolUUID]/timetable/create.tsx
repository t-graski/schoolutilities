import Footer from "../../../../components/organisms/Footer";
const Navbar = dynamic(() => import("../../../../components/organisms/Navbar"));
import Head from "next/head";
import { Headline } from "../../../../components/atoms/Headline";
import { Separator } from "../../../../components/atoms/Separator";
import { ContentLayout } from "../../../../utils/styles";
import dynamic from "next/dynamic";
import { ChangeCreateItem } from "../../../../components/organisms/time-table/ChangeCreateItem";
import { SetStateAction, useState } from "react";
import { Button } from "@/atoms/Button";
import { addTimeTableElement } from "utils/requests/timeTable";
import { useRouter } from "next/router";

export default function CreateCourse() {
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;
  const [itemConfig, setItemConfig] = useState<any>({
    timeTableElementStartTime: "",
    timeTableElementEndTime: "",
    timeTableElementDay: "",
    schoolSubjectUUID: "",
    timeTableElementRoom: "",
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
        <Separator width="small" alignment="center" />
        <ChangeCreateItem
          itemConfig={itemConfig}
          setItemConfig={setItemConfig}
        ></ChangeCreateItem>
        <Button
          buttonType="filled"
          onClick={async () => {
            const response = await addTimeTableElement({
              ...itemConfig,
              timeTableElementStartTime: `1970-01-01T${itemConfig.timeTableElementStartTime}:00.000Z`,
              timeTableElementEndTime: `1970-01-01T${itemConfig.timeTableElementEndTime}:00.000Z`,
            });

            if (response.status === 201) {
              router.push(`/school/${schoolUUID}/planner`);
            } else {
              alert("Something went wrong");
            }
          }}
        >
          Send me_!!
        </Button>
      </ContentLayout>
      <Footer></Footer>
    </>
  );
}
