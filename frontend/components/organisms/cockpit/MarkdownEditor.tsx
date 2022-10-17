import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EditorMenuBar } from "./EditorMenuBar";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";

type Props = {
  value: string;
  saveContent: Function;
};

export const MarkdownEditor: React.FC<Props> = ({ saveContent, value }) => {
  console.log("value", value);
  const editor = useEditor({
    extensions: [StarterKit, Highlight, TaskList, TaskItem, Link],
    content: value,
  });

  useEffect(() => {
    if (editor) {
      editor.on("update", () => {
        saveContent(editor.getHTML());
      });
    }
  }, [editor]);

  return (
    <div className="editor">
      {editor && <EditorMenuBar editor={editor} />}
      <EditorContent className="editor__content" editor={editor} />
    </div>
  );
};
