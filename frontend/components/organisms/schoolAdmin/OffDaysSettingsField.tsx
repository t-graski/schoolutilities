import React from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/input/InputField";
import { regex } from "../../../utils/regex";
import { useRouter } from "next/router";
import { Spacer } from "../../atoms/Spacer";
import {
  addOffDay,
  deleteOffDay,
  editOffDay,
  fetchOffDays,
} from "../../../utils/requests";
import { AdminSettingsField } from "./AdminSettingsField";

type Props = {
  queryClient: any;
};

const StyledInputField = styled("div", {
  marginTop: "15px",
  marginBottom: "15px",
});

const EditElementInputs: React.FC<{
  itemConfig: any;
  setItemConfig: Function;
}> = ({ itemConfig, setItemConfig }) => {
  return (
    <StyledInputField>
      <InputField
        label="Off day name"
        inputType="text"
        value={itemConfig.holidayName}
        onChange={(event) => {
          setItemConfig({ ...itemConfig, holidayName: event });
        }}
        regex={regex.schoolName}
        min="2"
        max="30"
        theme="surface"
      />
      <Spacer size="verySmall" />
      <InputField
        label="Off day begin"
        value={itemConfig.holidayStartDate.split("T")[0]}
        inputType={"date"}
        onChange={(event) => {
          setItemConfig({
            ...itemConfig,
            holidayStartDate: event,
          });
        }}
        theme="surface"
      ></InputField>
      <Spacer size="verySmall" />
      <InputField
        label="Off day end"
        value={itemConfig.holidayEndDate.split("T")[0]}
        inputType={"date"}
        onChange={(event) => {
          setItemConfig({
            ...itemConfig,
            holidayEndDate: event,
          });
        }}
        theme="surface"
      ></InputField>
    </StyledInputField>
  );
};

export const OffDaysSettingsField: React.FC<Props> = ({ queryClient }) => {
  const router = useRouter();

  return (
    <>
      <AdminSettingsField
        queryClient={queryClient}
        reactQueryKey={"offDays"}
        texts={{
          title: "Off Days",
          addHeadline: "Add new off day",
          editHeadline: "Edit off day",
          deleteHeadline: "Remove off day",
          deleteDescription:
            "This action can't be undone and will permanently remove the off day",
          elementsLoadingErrorMessage:
            "While loading the off days an error occured. Please try again.",
          elementsNoElementsMessage:
            "There are no off days yet. Add one by clicking the plus button.",
        }}
        uuidKey={"holidayUUID"}
        nameKey={"holidayName"}
        addElement={addOffDay}
        editElement={editOffDay}
        deleteElement={deleteOffDay}
        getAllElements={fetchOffDays}
        isItemValid={function (item: unknown): boolean {
          return true;
        }}
        EditElementInputs={EditElementInputs}
        defaultItemConfig={{
          holidayName: "",
          holidayStartDate: "",
          holidayEndDate: "",
          schoolUUID: router.query.schoolUUID,
        }}
        columns={[
          {
            title: "Name",
            key: "holidayName",
            sortFunction: (a, b) => {
              return a.holidayName.localeCompare(b.holidayName);
            },
          },
          {
            title: "Start",
            key: "holidayStartDate",
            sortFunction: (a, b) => {
              return a.holidayStartDate.localeCompare(b.holidayStartDate);
            },
            toStringFunction: (item) => new Date(item).toLocaleDateString(),
          },
          {
            title: "End",
            key: "holidayEndDate",
            sortFunction: (a, b) => {
              return a.holidayEndDate.localeCompare(b.holidayEndDate);
            },
            toStringFunction: (item) => new Date(item).toLocaleDateString(),
          },
        ]}
      ></AdminSettingsField>
    </>
  );
};
