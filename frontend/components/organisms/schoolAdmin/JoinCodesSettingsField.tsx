import React from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/input/InputField";
import { useRouter } from "next/router";
import { regex } from "../../../utils/regex";
import {
  addSchoolJoinCode,
  deleteJoinCode,
  editJoinCode,
  fetchSchoolJoinCodes,
} from "../../../utils/requests";
import { AdminSettingsField } from "./AdminSettingsField";
import { QueryClient } from "react-query";

type Props = {
  queryClient: QueryClient;
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
        label="Name"
        inputType="text"
        value={itemConfig.schoolJoinCodeName}
        onChange={(event) => {
          setItemConfig({
            ...itemConfig,
            schoolJoinCodeName: event,
          });
        }}
        regex={regex.schoolName}
        min="2"
        max="30"
      />
    </StyledInputField>
  );
};

export const JoinCodesSettingsField: React.FC<Props> = ({ queryClient }) => {
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  return (
    <>
      <AdminSettingsField
        queryClient={queryClient}
        reactQueryKey={"joinCodes"}
        texts={{
          title: "Invite Codes",
          addHeadline: "Add new invite code",
          editHeadline: "Edit invite code",
          deleteHeadline: "Remove invite code",
          deleteDescription:
            "This action can't be undone and will permanently remove the invite code",
          elementsLoadingErrorMessage:
            "While loading the invite codes an error occured. Please try again.",
          elementsNoElementsMessage:
            "There are no invite codes yet. Click on the plus button to add one.",
        }}
        uuidKey={"schoolJoinCode"}
        nameKey={"schoolJoinCodeName"}
        addElement={addSchoolJoinCode}
        editElement={editJoinCode}
        deleteElement={deleteJoinCode}
        getAllElements={fetchSchoolJoinCodes}
        isItemValid={(item) => true}
        EditElementInputs={EditElementInputs}
        defaultItemConfig={{
          schoolJoinCodeName: "",
          schoolUUID: schoolUUID,
          schoolJoinCodeExpireTimestamp: "2023-10-22 14:00:00",
        }}
        columns={[
          {
            title: "Name",
            key: "schoolJoinCodeName",
            sortFunction: (a, b) => a.schoolJoinCodeName.localeCompare(b.schoolJoinCodeName),
          },
          {
            title: "Invite Code",
            key: "schoolJoinCode",
            sortFunction: (a, b) => a.schoolJoinCode.localeCompare(b.schoolJoinCode),
          },
        ]}
      ></AdminSettingsField>
    </>
  );
};
