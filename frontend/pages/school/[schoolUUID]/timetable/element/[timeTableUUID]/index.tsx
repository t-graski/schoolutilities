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
import { editTimeTableElement, getTimeTableElement } from "../../../../../../utils/requests/timeTable";
import { SetStateAction, useEffect, useState } from "react";
import { Button } from "@/atoms/Button";

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
        <Headline label="Edit timetable item"></Headline>
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
            const response = await editTimeTableElement({
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
