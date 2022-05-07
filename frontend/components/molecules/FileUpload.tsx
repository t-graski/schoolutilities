import React, { useCallback, useState } from "react";
import { styled } from "../../stitches.config";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/router";
import { getAccessToken } from "../../utils/authHelper";
import { Spacer } from "../atoms/Spacer";
import { Button } from "../atoms/Button";
import SvgDelete from "../atoms/svg/SvgDelete";

export type Props = {};

const StyledDropzone = styled("div", {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  padding: "40px",
  backgroundColor: "$backgroundTertiary",
  color: "#fontPrimary",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    borderColor: "$specialPrimary",
  },
  "&:focus": {
    borderColor: "$specialPrimary",
  },
});

const RemoveButton = styled("button", {
  backgroundColor: "transparent",
  border: "none",
  padding: 2,
  cursor: "pointer",
  width: "20px",
  height: "20px",
  marginLeft: 20,
});

const StyledHeadline = styled("h4", {
  margin: "20px 0",
});

export const FileUpload: React.FC<Props> = ({ }) => {
  const [files, setFiles] = useState([]);
  const [filesSent, setFilesSent] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const router = useRouter();

  async function uploadFile(file) {
    const formData = new FormData();
    formData.append("elementUUID", router.query.submissionUUID as string);
    formData.append("files", file);

    let request = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/submitExercise`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
        },
        body: formData,
      }
    );

    let response = await request.json();

    if (request.status == 200) {
      setFilesSent("Files successfully uploaded..");
    } else {
      setFilesSent("Something went wrong..");
    }
  }

  let fileHtml = files.map((file) => {
    return (
      <li
        // @ts-ignore
        key={file.path}
      >
        {/* @ts-ignore */}
        {file.path} - {Math.round(file.size / 10000) / 100} MB
        <RemoveButton
          onClick={() => {
            removeFileFromList(file);
          }}
        >
          <SvgDelete />
        </RemoveButton>
      </li>
    );
  });

  function removeFileFromList(file) {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  }

  return (
    <>
      {filesSent ? (
        <>{filesSent}</>
      ) : (
        <section className="container">
          <StyledDropzone {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag &apos;n drop some files here, or click to select files</p>
          </StyledDropzone>
          <aside>
            <StyledHeadline>Files</StyledHeadline>
            <ul>{fileHtml}</ul>
            <Spacer size={"verySmall"}></Spacer>
            <Button
              backgroundColor={"primary"}
              color={"primary"}
              onClick={() => {
                uploadFile(files[0]);
              }}
            >Hand in</Button>
          </aside>
        </section>
      )}
    </>
  );
};
