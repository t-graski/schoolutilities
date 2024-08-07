import React from "react";
import { styled } from "../../stitches.config";
import SvgDownload from "../atoms/svg/SvgDownload";

type Props = {
  entries: Array<any>;
  entryProperties: {
    name: string;
    description?: string;
    downloadLink?: string;
    downloadName?: string;
    id?: string;
  };
};

const SchoolDetailLayout = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  justifySelf: "center",
  width: "100%",
});

const SettingsEntriesLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
});

const SettingsEntryLayout = styled("div", {
  width: "100%",
  backgroundColor: "$neutral-300",
  borderRadius: "20px",
  padding: "20px 30px",
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  justifyContent: "space-between",
});

const SettingsDetailsLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const SettingsEntryName = styled("p", {
  fontSize: "2rem",
  fontWeight: "bold",
  color: "$neutral-500",
});

const StyledError = styled("p", {
  color: "$error",
  fontSize: "1.5rem",
  fontWeight: "$bold",
  marginTop: "15px",
  marginBottom: "15px",
  border: "solid 2px $error",
  padding: "20px",
  width: "fit-content",
  borderRadius: "25px",
});

const SettingsEntryDescription = styled("p", {
  fontSize: "1rem",
  color: "$neutral-500",
});

const SvgIconLayout = styled("div", {
  width: "30px",
  height: "30px",
});

const SvgLink = styled("a", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

export const DownloadList: React.FC<Props> = ({ entries, entryProperties }) => {
  const [error, setError] = React.useState("");

  return (
    <>
      <SchoolDetailLayout>
        {error && <StyledError>{error}</StyledError>}
        <SettingsEntriesLayout>
          {entries.map((entry, index) => {
            return (
              <SettingsEntryLayout key={entry[entryProperties.id ?? index]}>
                <SettingsDetailsLayout>
                  <SettingsEntryName>
                    {entry[entryProperties.name]}
                  </SettingsEntryName>
                  <SettingsEntryDescription>
                    {entry[entryProperties.description]}
                  </SettingsEntryDescription>
                </SettingsDetailsLayout>
                {entry[entryProperties.downloadLink] && (
                  <SvgLink
                    href={entry[entryProperties.downloadLink]}
                    target="_blank"
                  >
                    <SvgIconLayout>
                      <SvgDownload />
                    </SvgIconLayout>
                  </SvgLink>
                )}
              </SettingsEntryLayout>
            );
          })}
        </SettingsEntriesLayout>
      </SchoolDetailLayout>
    </>
  );
};
