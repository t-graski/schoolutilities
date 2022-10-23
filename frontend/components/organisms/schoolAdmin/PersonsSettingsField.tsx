import React from "react";
import { styled } from "../../../stitches.config";
import { useRouter } from "next/router";
import { Select } from "../../atoms/input/Select";
import {
  deleteSchoolPerson,
  editSchoolPerson,
  fetchSchoolUsers,
} from "../../../utils/requests";
import { AdminSettingsField } from "./AdminSettingsField";

type Props = {
  queryClient: any;
};

export const RoleOrder = [
  {
    value: 1,
    label: "Admin",
  },
  {
    value: 2,
    label: "Teacher",
  },
  {
    value: 3,
    label: "Student",
  },
];

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
      <Select
        selectValue={itemConfig.schoolRoleId}
        selectOptions={RoleOrder}
        onChange={(event) => {
          setItemConfig({
            ...itemConfig,
            schoolRoleId: event,
          });
        }}
        theme="surface"
      ></Select>
    </StyledInputField>
  );
};

export const PersonsSettingsField: React.FC<Props> = ({ queryClient }) => {
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  return (
    <>
      <AdminSettingsField
        queryClient={queryClient}
        reactQueryKey={"users"}
        texts={{
          title: "Users",
          addHeadline: "Add user",
          editHeadline: "Edit user",
          deleteHeadline: "Remove user",
          deleteDescription: "Do you really want to remove ",
          elementsLoadingErrorMessage:
            "While loading the users an error occured. Please try again later.",
          elementsNoElementsMessage: "There are no users yet.",
        }}
        uuidKey={"userUUID"}
        nameKey={"userFirstname"}
        editElement={editSchoolPerson}
        deleteElement={deleteSchoolPerson}
        getAllElements={fetchSchoolUsers}
        isItemValid={(item) => item.userFirstname && item.userLastname}
        EditElementInputs={EditElementInputs}
        defaultItemConfig={{
          schoolUUID,
          userFirstname: "",
          userLastname: "",
          schoolRoleId: 1,
        }}
        columns={[
          {
            title: "Name",
            key: "userFirstname",
            sortFunction: (a, b) => {
              return a.userFirstname.localeCompare(b.userFirstname);
            },
          },
          {
            title: "Lastname",
            key: "userLastname",
            sortFunction: (a, b) => {
              return a.userLastname.localeCompare(b.userLastname);
            },
          },
          {
            title: "Role",
            key: "schoolRoleName",
            sortFunction: (a, b) => {
              return a.schoolRoleName.localeCompare(b.schoolRoleName);
            },
          },
        ]}
      ></AdminSettingsField>
    </>
  );
};
