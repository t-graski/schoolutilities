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
import { BackLink } from "@/molecules/BackLink";
import { styled } from "@stitches/react";

const ButtonLayout = styled("div", {
  display: "flex",
  gap: "$4x",
});

export default function EditTimeTableElement() {
  const router = useRouter();

  const timeTableUUID = router.query.timeTableUUID as string;
  const schoolUUID = router.query.schoolUUID as string;
  const [itemConfig, setItemConfig] = useState<any>(null);

  const { data: timeTableElement, status } = useQuery(
    ["timetableElement", timeTableUUID],
    () => getTimeTableElement(timeTableUUID),
    {
      enabled: !!timeTableUUID,
    }
  );

  useEffect(() => {
    if (timeTableElement) {
      setItemConfig({
        ...timeTableElement,
        timeTableElementStartTime: timeTableElement.timeTableElementStartTime,
        timeTableElementEndTime: timeTableElement.timeTableElementEndTime,
      });
    }
  }, [timeTableElement]);

  return (
    <>
      <Head>
        <title>Edit Timetable Element - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <ContentLayout>
        {itemConfig && itemConfig.timeTableElementClasses && (
          <BackLink
            href={`/school/${schoolUUID}/planner?tab=timetable&startDate=${getCurrentWeekMonday()}&schoolClassUUID=${
              itemConfig?.timeTableElementClasses[0]
            }&detail=${timeTableUUID}`}
            label={"Back to the timetable"}
          ></BackLink>
        )}
        <Headline label="Edit timetable item"></Headline>
        <Separator width="big" alignment="center" />
        <Spacer size="3x" />
        {itemConfig && (
          <ChangeCreateItem
            itemConfig={itemConfig}
            setItemConfig={setItemConfig}
          ></ChangeCreateItem>
        )}
        <Spacer size="3x" />
        <Separator width="big" alignment="center" />
        <Spacer size="3x" />
        <ButtonLayout>
          <Button
            buttonType="filled"
            onClick={async () => {
              try {
                const response = await editTimeTableElement({
                  ...itemConfig,
                  timeTableElementStartTime: new Date(
                    itemConfig.timeTableElementStartTime
                  ).toISOString(),
                  timeTableElementEndTime: new Date(
                    itemConfig.timeTableElementEndTime
                  ).toISOString(),
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
            Edit
          </Button>
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
        </ButtonLayout>
      </ContentLayout>
      <Footer></Footer>
    </>
  );
}
