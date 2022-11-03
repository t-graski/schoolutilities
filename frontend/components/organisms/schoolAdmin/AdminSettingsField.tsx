import React, { useEffect } from "react";
import { styled } from "../../../stitches.config";
import { useRouter } from "next/router";
import { SettingsHeader } from "../../molecules/schoolAdmin/SettingsHeader";
import { SettingsPopUp } from "../../molecules/schoolAdmin/SettingsPopUp";
import Skeleton from "react-loading-skeleton";
import {
  MutationFunction,
  QueryClient,
  useMutation,
  useQuery,
} from "react-query";
import { AdminList, Column } from "../AdminList";
import SvgDelete from "../../atoms/svg/SvgDelete";
import SvgEdit from "../../atoms/svg/SvgEdit";

type Props = {
  queryClient: QueryClient;
  reactQueryKey: string;
  texts: {
    title: string;
    addHeadline: string;
    editHeadline: string;
    deleteHeadline: string;
    deleteDescription: string;
    elementsLoadingErrorMessage: string;
    elementsNoElementsMessage: string;
  };
  uuidKey: string;
  nameKey: string;
  columns: Column[];
  addElement?: MutationFunction<unknown, void>;
  editElement?: Function;
  deleteElement?: any;
  getAllElements: Function;
  getElementLink?: (schoolUUID: string, elementUUID: string) => string;
  isItemValid: (item: any) => boolean;
  EditElementInputs: React.FC<{
    itemConfig: unknown;
    setItemConfig: Function;
  }>;
  defaultItemConfig: any;
};

const SchoolDetailLayout = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  justifySelf: "center",
  width: "100%",
  padding: "0 $8x $2x $8x",

  overflowY: "auto",
});

const SettingsEntriesLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
});

const LoadingLayout = styled("div", {
  position: "relative",
});

const StyledDeleteText = styled("p", {
  marginTop: "15px",

  fontSize: "1rem",
  color: "$neutral-500",
});

export const AdminSettingsField: React.FC<Props> = ({
  queryClient,
  reactQueryKey,
  texts,
  uuidKey,
  nameKey,
  columns,
  addElement,
  editElement,
  deleteElement,
  getAllElements,
  isItemValid,
  EditElementInputs,
  defaultItemConfig,
}) => {
  const [editPopUpIsVisible, setEditPopUpIsVisible] = React.useState(false);
  const [deletePopUpIsVisible, setDeletePopUpIsVisible] = React.useState(false);
  const [itemConfig, setItemConfig] = React.useState(null);
  const [itemId, setItemId] = React.useState(null);
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const { data: elements, status: elementsStatus } = useQuery(
    [reactQueryKey, schoolUUID],
    () => getAllElements(schoolUUID),
    {
      enabled: !!schoolUUID,
    }
  );

  const addMutation = useMutation(addElement, {
    onMutate: async () => {
      await queryClient.cancelQueries([reactQueryKey, schoolUUID]);

      let entry = {
        ...itemConfig,
        [uuidKey]: "newEntry",
      };

      queryClient.setQueryData([reactQueryKey, schoolUUID], (old: any) => [
        ...old,
        entry,
      ]);

      return { entry };
    },
    onSuccess: (response) => {
      queryClient.setQueryData([reactQueryKey, schoolUUID], (old: any) =>
        old.map((currEntry) =>
          currEntry[uuidKey] === "newEntry" ? response : currEntry
        )
      );

      setItemConfig(null);
    },
    onError: (err: any) => {
      queryClient.setQueryData([reactQueryKey, schoolUUID], (old: any) =>
        old.filter((currEntry) => currEntry[uuidKey] !== "newEntry")
      );
    },
  });

  const deleteMutation = useMutation(deleteElement, {
    onSuccess: async () => {
      await queryClient.cancelQueries([reactQueryKey, schoolUUID]);

      queryClient.setQueryData([reactQueryKey, schoolUUID], (old: any) =>
        old.filter((currElement) => currElement[uuidKey] !== itemId)
      );
    },
    onError: (err: any) => {},
  });

  //@ts-ignore
  const editMutation = useMutation(editElement, {
    onSuccess: async () => {
      await queryClient.cancelQueries([reactQueryKey, schoolUUID]);

      queryClient.setQueryData([reactQueryKey, schoolUUID], (old: any) =>
        old.map((currEntry) =>
          currEntry[uuidKey] === itemId
            ? {
                ...currEntry,
                ...itemConfig,
              }
            : currEntry
        )
      );
    },
    onError: (err: any) => {},
  });

  function savePopUpInput() {
    if (itemId == "") {
      addMutation.mutate(itemConfig);
    } else {
      editMutation.mutate(itemConfig);
    }
    setEditPopUpIsVisible(false);
  }

  const listActions = [];

  if (editElement) {
    listActions.push({
      title: "Edit",
      Icon: SvgEdit,
      onClick: (item) => {
        setItemConfig(item);
        setItemId(item[uuidKey]);
        setEditPopUpIsVisible(true);
      },
    });
  }

  if (deleteElement) {
    listActions.push({
      title: "Delete",
      Icon: SvgDelete,
      onClick: (item) => {
        setDeletePopUpIsVisible(true);
        setItemId(item[uuidKey]);
        setItemConfig(item);
      },
    });
  }

  return (
    <>
      <SchoolDetailLayout>
        <SettingsPopUp
          headline={itemId == "" ? texts.addHeadline : texts.editHeadline}
          inputValid={isItemValid(itemConfig)}
          saveLabel={itemId == "" ? "Add" : "Save"}
          saveFunction={savePopUpInput}
          closeFunction={() => {
            setEditPopUpIsVisible(false);
            setItemConfig(null);
          }}
          open={editPopUpIsVisible}
          setOpen={setEditPopUpIsVisible}
        >
          {itemConfig ? (
            <EditElementInputs
              itemConfig={itemConfig}
              setItemConfig={setItemConfig}
            />
          ) : (
            <></>
          )}
        </SettingsPopUp>
        <SettingsPopUp
          headline={`${texts.deleteHeadline} ${
            itemConfig ? itemConfig[nameKey] : ""
          }?`}
          inputValid={true}
          saveLabel="Confirm"
          saveFunction={() => {
            deleteMutation.mutate(itemId);
            setDeletePopUpIsVisible(false);
          }}
          closeFunction={() => {
            setDeletePopUpIsVisible(false);
            setItemConfig(null);
          }}
          open={deletePopUpIsVisible}
          setOpen={setDeletePopUpIsVisible}
        >
          <StyledDeleteText>
            {texts.deleteDescription}
            {itemConfig ? itemConfig[nameKey] : ""}.
          </StyledDeleteText>
        </SettingsPopUp>
        <SettingsHeader
          headline={texts.title}
          {...(addElement && {
            addFunction: () => {
              setItemConfig(defaultItemConfig);
              setItemId("");
              setEditPopUpIsVisible(true);
            },
          })}
        ></SettingsHeader>
        <LoadingLayout>
          <SettingsEntriesLayout>
            {elementsStatus == "success" && elements.length > 0 && (
              <AdminList
                columns={columns}
                data={elements}
                selectedItems={selectedItems}
                onSelectionChange={setSelectedItems}
                actions={listActions}
                uuidKey={uuidKey}
              ></AdminList>
            )}

            {elementsStatus == "success" &&
              elements.length <= 0 &&
              texts.elementsNoElementsMessage}
            {elementsStatus == "loading" && (
              <>
                <Skeleton width="100%" height={80}></Skeleton>
                <Skeleton width="100%" height={80}></Skeleton>
                <Skeleton width="100%" height={80}></Skeleton>
              </>
            )}
            {elementsStatus == "error" && texts.elementsLoadingErrorMessage}
          </SettingsEntriesLayout>
        </LoadingLayout>
      </SchoolDetailLayout>
    </>
  );
};
