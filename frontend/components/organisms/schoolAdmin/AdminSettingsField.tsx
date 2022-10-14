import React, { useEffect } from "react";
import { styled } from "../../../stitches.config";
import Link from "next/link";
import { useRouter } from "next/router";
import { SettingsHeader } from "../../molecules/schoolAdmin/SettingsHeader";
import { SettingsEntry } from "../../molecules/schoolAdmin/SettingsEntry";
import { SettingsPopUp } from "../../molecules/schoolAdmin/SettingsPopUp";
import Skeleton from "react-loading-skeleton";
import {
  MutationFunction,
  QueryClient,
  useMutation,
  useQuery,
} from "react-query";

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
  addElement: MutationFunction<unknown, void>;
  editElement: MutationFunction<unknown, void>;
  deleteElement: any;
  getAllElements: Function;
  getElementLink?: (schoolUUID: string, elementUUID: string) => string;
  isItemValid: (item: unknown) => boolean;
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
  padding: "40px 60px",

  overflowY: "scroll",
});

const SettingsEntriesLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
});

const SettingsEntryLayout = styled("div", {
  width: "100%",
});

const SettingsEntryName = styled("p", {
  fontSize: "2rem",
  fontWeight: "bold",
  color: "$neutral-500",
});

const StyledInputField = styled("div", {
  marginTop: "15px",
  marginBottom: "15px",
});

const SettingsEntryLink = styled("a", {
  textDecoration: "none",
  cursor: "pointer",
});

const StyledError = styled("p", {
  marginTop: "15px",
  marginBottom: "15px",
  border: "solid 2px $error",
  padding: "20px",
  width: "fit-content",
  borderRadius: "25px",

  color: "$error",
  fontSize: "1.5rem",
  fontWeight: "$bold",
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
  addElement,
  editElement,
  deleteElement,
  getAllElements,
  getElementLink,
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

  const { data: elements, status: elementsStatus } = useQuery(
    [reactQueryKey, schoolUUID],
    () => getAllElements(schoolUUID),
    {
      enabled: !!schoolUUID,
    }
  );

  useEffect(() => {
    getTestElements();
  }, []);

  async function getTestElements() {
    const currElements = await getAllElements(schoolUUID);
    console.log(currElements);
  }


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

  return (
    <>
      <SchoolDetailLayout>
        {editPopUpIsVisible && (
          <SettingsPopUp
            headline={itemId == "" ? texts.addHeadline : texts.editHeadline}
            inputValid={isItemValid(itemConfig)}
            saveLabel={itemId == "" ? "Add" : "Save"}
            saveFunction={savePopUpInput}
            closeFunction={() => {
              setEditPopUpIsVisible(false);
              setItemConfig(null);
            }}
          >
            <EditElementInputs
              itemConfig={itemConfig}
              setItemConfig={setItemConfig}
            />
          </SettingsPopUp>
        )}
        {deletePopUpIsVisible && (
          <SettingsPopUp
            headline={`${texts.deleteHeadline} ${itemConfig[nameKey]}?`}
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
          >
            <StyledDeleteText>
              {texts.deleteDescription} {itemConfig[nameKey]}.
            </StyledDeleteText>
          </SettingsPopUp>
        )}
        <SettingsHeader
          headline={texts.title}
          addFunction={() => {
            setItemConfig(defaultItemConfig);
            setItemId("");
            setEditPopUpIsVisible(true);
          }}
        ></SettingsHeader>
        <LoadingLayout>
          <SettingsEntriesLayout>
            {elementsStatus == "success" &&
              elements.length > 0 &&
              elements.map((entry, index) => (
                <SettingsEntryLayout
                  key={entry[uuidKey]}
                  data-key={entry[uuidKey]}
                >
                  <SettingsEntry
                    editFunction={() => {
                      setItemConfig(entry);
                      setItemId(entry[uuidKey]);
                      setEditPopUpIsVisible(true);
                    }}
                    deleteFunction={() => {
                      setDeletePopUpIsVisible(true);
                      setItemId(entry[uuidKey]);
                      setItemConfig(entry);
                    }}
                    highlighted={
                      router.query &&
                      router.query[uuidKey] &&
                      entry[uuidKey] == router.query[uuidKey]
                    }
                  >
                    {getElementLink ? (
                      <Link
                        href={getElementLink(schoolUUID, entry[uuidKey])}
                        passHref
                      >
                        <SettingsEntryLink>
                          <SettingsEntryName>
                            {entry[nameKey]}
                          </SettingsEntryName>
                        </SettingsEntryLink>
                      </Link>
                    ) : (
                      <SettingsEntryName>{entry[nameKey]}</SettingsEntryName>
                    )}
                  </SettingsEntry>
                </SettingsEntryLayout>
              ))}
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
