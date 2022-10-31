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
import {
  deleteTimeTableElement,
  editTimeTableElement,
  getTimeTableElement,
} from "../../../../../../utils/requests/timeTable";
import { useEffect, useState } from "react";
import { Button } from "@/atoms/Button";
import { getCurrentWeekMonday } from "@/molecules/time-table/TimeTableWeekSelection";
import { Spacer } from "@/atoms/Spacer";

export default function EditTimeTableElement() {
  const router = useRouter();

  const timeTableUUID = router.query.timeTableUUID as string;
  const schoolUUID = router.query.schoolUUID as string;
  const [itemConfig, setItemConfig] = useState<any>(null);

  const { data: timeTableElement, status } = useQuery(
    ["timetableElement", timeTableUUID],
    () => getTimeTableElement(timeTableUUID)
  );

  useEffect(() => {
    if (timeTableElement) {
      setItemConfig({
        ...timeTableElement,
        timeTableElementStartTime: timeTableElement.timeTableElementStartTime
          .split("T")[1]
          .split(":00.")[0],
        timeTableElementEndTime: timeTableElement.timeTableElementEndTime
          .split("T")[1]
          .split(":00.")[0],
      });
    }
  }, [timeTableElement]);

  console.log(itemConfig);

  return (
    <>
      <Head>
        <title>Edit Timetable Element - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <ContentLayout>
        <Headline label="Edit timetable substitution"></Headline>
        <Separator width="small" alignment="center" />
        {itemConfig && (
          <ChangeCreateItem
            itemConfig={itemConfig}
            setItemConfig={setItemConfig}
          ></ChangeCreateItem>
        )}
        <Button
          buttonType="filled"
          onClick={async () => {
            try {
              const response = await editTimeTableElement({
                ...itemConfig,
                timeTableElementStartTime: new Date(`1970-01-01T${itemConfig.timeTableElementStartTime}`).toISOString(),
                timeTableElementEndTime: new Date(`1970-01-01T${itemConfig.timeTableElementEndTime}`).toISOString(),
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
          Send me_!!
        </Button>
        <Spacer size="4x"></Spacer>
        <Button
          buttonType="outlined"
          onClick={async () => {
            try {
              const response = await deleteTimeTableElement(timeTableUUID);
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
          Delete item
        </Button>
      </ContentLayout>
      <Footer></Footer>
    </>
  );
}
