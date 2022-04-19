import React from "react";
import { styled } from "../../stitches.config";
import { SettingsHeader } from "../molecules/schoolAdmin/SettingsHeader";
import { SettingsEntry } from "../molecules/schoolAdmin/SettingsEntry";

type Props = {
    headline: string;
    headlineDescription: string;
    addEntry: Function;
    entries: Array<any>;
    entryProperties: { 
        name: string;
        description?: string;
        id?: string;
    }
    editEntry: Function;
    deleteEntry: Function;
};

const SchoolDetailLayout = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  justifySelf: "center",
  width: "100%",
  padding: "40px 60px",
  overflowY: "scroll",
  marginTop: "12vh",
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
  color: "$fontPrimary",
});

const StyledError = styled("p", {
  color: "$specialTertiary",
  fontSize: "1.5rem",
  fontWeight: "700",
  marginTop: "15px",
  marginBottom: "15px",
  border: "solid 2px $specialTertiary",
  padding: "20px",
  width: "fit-content",
  borderRadius: "25px",
});

const DepartmentName = styled("p", {
  fontSize: "1rem",
  color: "$fontPrimary",
});

export const EditableList: React.FC<Props> = ({
    headline,
    headlineDescription,
    addEntry,
    entries,
    entryProperties,
    editEntry,
    deleteEntry,
}) => {
  const [error, setError] = React.useState("");

  return (
    <>
      <SchoolDetailLayout>
        <SettingsHeader
          headline={headline}
          addFunction={() => {
            addEntry();
          }}
        ></SettingsHeader>
        {error && <StyledError>{error}</StyledError>}
        <SettingsEntriesLayout>
          {entries.map((entry, index) => (
            <SettingsEntryLayout key={entry[entryProperties.id ?? index]}  key={entry[entryProperties.id ?? index]}>
              <SettingsEntry
                editFunction={() => {
                    editEntry(entry[entryProperties.id] ?? index);
                }}
                deleteFunction={() => {
                    deleteEntry(entry[entryProperties.id] ?? index);
                }}
              >
                <SettingsEntryName>{entry[entryProperties.name]}</SettingsEntryName>
                <DepartmentName>{entry[entryProperties.description]}</DepartmentName>
              </SettingsEntry>
            </SettingsEntryLayout>
          ))}
        </SettingsEntriesLayout>
      </SchoolDetailLayout>
    </>
  );
};
