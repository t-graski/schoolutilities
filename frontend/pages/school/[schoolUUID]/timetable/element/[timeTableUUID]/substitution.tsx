import Footer from "../../../../../../components/organisms/Footer";
const Navbar = dynamic(
  () => import("../../../../../../components/organisms/Navbar")
);
import Head from "next/head";
import { Headline } from "../../../../../../components/atoms/Headline";
import { Separator } from "../../../../../../components/atoms/Separator";
import { ContentLayout } from "../../../../../../utils/styles";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import {
  deleteTimeTableElement,
  editTimeTableItemSubstitution,
  getTimeTableElement,
  getTimeTableItemSubstitution,
} from "../../../../../../utils/requests/timeTable";
import { useEffect, useState } from "react";
import { Button } from "@/atoms/Button";
import { getCurrentWeekMonday } from "@/molecules/time-table/TimeTableWeekSelection";
import { Spacer } from "@/atoms/Spacer";
import { ChangeCreateSubstitution } from "@/organisms/time-table/ChangeCreateSubstitution";
import { BackLink } from "@/molecules/BackLink";

export default function EditTimeTableElement() {
  const router = useRouter();

  const timeTableUUID = router.query.timeTableUUID as string;
  const schoolUUID = router.query.schoolUUID as string;
  const [itemConfig, setItemConfig] = useState<any>(null);

  const { data: timeTableElement, status } = useQuery(
    ["timetableElement", timeTableUUID],
    () => getTimeTableElement(timeTableUUID)
  );

  const { data: substitution, status: substitutionStatus } = useQuery(
    ["substitution", timeTableUUID],
    () => getTimeTableItemSubstitution(timeTableUUID)
  );

  useEffect(() => {
    if (timeTableElement) {
      console.log(substitution);
      setItemConfig(substitution);
    }
  }, [substitution, timeTableElement]);

  if (status === "loading" && substitutionStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error" || substitutionStatus === "error") {
    return <div>Error</div>;
  }

  console.log(substitution);

  return (
    <>
      <Head>
        <title>Edit Timetable Substitution - SchoolUtilities</title>
      </Head>
      <Navbar></Navbar>
      <ContentLayout>
        {itemConfig &&
          substitution &&
          itemConfig.timeTableSubstitutionClasses && (
            <BackLink
              href={`/school/${schoolUUID}/planner?tab=timetable&startDate=${getCurrentWeekMonday()}&schoolClassUUID=${
                itemConfig?.timeTableSubstitutionClasses[0]
              }`}
              label={"Back to the timetable"}
            ></BackLink>
          )}
        <Headline label="Edit timetable substitution"></Headline>
        <Separator width="small" alignment="center" />
        {itemConfig && substitution && (
          <ChangeCreateSubstitution
            initialItemConfig={timeTableElement}
            itemConfig={itemConfig}
            setItemConfig={setItemConfig}
          ></ChangeCreateSubstitution>
        )}
        <Button
          buttonType="filled"
          onClick={async () => {
            try {
              const response = await editTimeTableItemSubstitution({
                ...itemConfig,
                timeTableSubstitutionDate: router.query.date as string,
              });
              router.push(
                `/school/${schoolUUID}/planner?tab=timetable&startDate=${getCurrentWeekMonday()}&schoolClassUUID=${
                  itemConfig.timeTableSubstitutionClasses[0]
                }`
              );
            } catch (e) {
              console.log(e);
              alert("Something went wrong");
            }
          }}
        >
          Change element substitution
        </Button>
        <Spacer size="4x"></Spacer>
        <Button
          buttonType="outlined"
          onClick={async () => {
            try {
              const response = await deleteTimeTableElement(timeTableUUID);
              router.push(
                `/school/${schoolUUID}/planner?tab=timetable&startDate=${getCurrentWeekMonday()}&schoolClassUUID=${
                  itemConfig.timeTableSubstitutionClasses[0]
                }`
              );
            } catch (e) {
              alert("Something went wrong");
            }
          }}
        >
          Remove subsitution
        </Button>
      </ContentLayout>
      <Footer></Footer>
    </>
  );
}
