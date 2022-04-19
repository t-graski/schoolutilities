import { styled } from "@stitches/react";
import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

type Props = {
  value: string;
  saveContent: Function;
};

export const MarkdownEditor: React.FC<Props> = ({ saveContent, value }) => {
  const options = {
    toolbarContainer: "#toolbar_container",
    showPathLabel: false,
    charCounter: true,
    maxCharCount: 720,
    width: "auto",
    maxWidth: "700px",
    height: "auto",
    minHeight: "100px",
    maxHeight: "250px",
    buttonList: [
      ["undo", "redo", "font", "fontSize", "formatBlock"],
      [
        "bold",
        "underline",
        "italic",
        "strike",
        "subscript",
        "superscript",
        "removeFormat",
      ],
      [
        "fontColor",
        "hiliteColor",
        "outdent",
        "indent",
        "align",
        "horizontalRule",
        "list",
        "table",
      ],
      [
        "link",
        "image",
        "video",
        "fullScreen",
        "showBlocks",
        "codeView",
        "preview",
        "print",
        "save",
      ],
    ],
    callBackSave: function (contents, isChanged) {
      saveContent(contents);
    },
  };

  return (
    <>
      <SunEditor setOptions={options} setContents={value} />
    </>
  );
};
