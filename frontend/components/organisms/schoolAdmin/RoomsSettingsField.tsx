import { styled } from "@stitches/react";
import { useRouter } from "next/router";
import React from "react";
import {
  addSchoolRoom,
  deleteSchoolRoom,
  editSchoolRoom,
  fetchSchoolRooms,
} from "../../../utils/requests/admin";
import { InputField } from "../../atoms/input/InputField";
import { Spacer } from "../../atoms/Spacer";
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
        label="Room name"
        inputType="text"
        value={itemConfig.schoolRoomName}
        onChange={(event) => {
          setItemConfig({
            ...itemConfig,
            schoolRoomName: event,
          });
        }}
        min="2"
        max="30"
        theme="surface"
      />
      <Spacer size="verySmall" />
      <InputField
        label="Room Abbreviation"
        value={itemConfig.schoolRoomAbbreviation}
        inputType={"text"}
        onChange={(event) => {
          setItemConfig({
            ...itemConfig,
            schoolRoomAbbreviation: event,
          });
        }}
        min="2"
        max="30"
        theme="surface"
      ></InputField>
      <Spacer size="verySmall" />
      <InputField
        label="Room Building"
        value={itemConfig.schoolRoomBuilding}
        inputType={"text"}
        onChange={(event) => {
          setItemConfig({
            ...itemConfig,
            schoolRoomBuilding: event,
          });
        }}
        min="2"
        max="30"
        theme="surface"
      ></InputField>
    </StyledInputField>
  );
};

export const RoomsSettingsField: React.FC<Props> = ({ queryClient }) => {
  const router = useRouter();

  return (
    <>
      <AdminSettingsField
        queryClient={queryClient}
        reactQueryKey={"rooms"}
        texts={{
          title: "Rooms",
          addHeadline: "Add new room",
          editHeadline: "Edit room",
          deleteHeadline: "Remove",
          deleteDescription:
            "This action can't be undone and will permanently remove the room ",
          elementsLoadingErrorMessage:
            "While loading the room an error occured. Please try again.",
          elementsNoElementsMessage:
            "There is no room yet. Add one by clicking the plus button.",
        }}
        uuidKey={"schoolRoomUUID"}
        nameKey={"schoolRoomName"}
        addElement={addSchoolRoom}
        editElement={editSchoolRoom}
        deleteElement={deleteSchoolRoom}
        getAllElements={fetchSchoolRooms}
        isItemValid={function (item: unknown): boolean {
          return true;
        }}
        EditElementInputs={EditElementInputs}
        defaultItemConfig={{
          schoolRoomName: "",
          schoolRoomAbbreviation: "",
          schoolRoomBuilding: "",
          schoolUUID: router.query.schoolUUID,
        }}
        columns={[
          {
            title: "Room name",
            key: "schoolRoomName",
            sortFunction: (a: any, b: any) => {
              return a.schoolRoomName.localeCompare(b.schoolRoomName);
            },
          },
        ]}
      ></AdminSettingsField>
    </>
  );
};
