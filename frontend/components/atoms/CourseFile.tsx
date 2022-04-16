import React from "react";

// this usually goes once
// to the entry point of the whole app
// (e.g. src/index.js)
import "react-nestable/dist/styles/index.css";

type Props = {
    name: string;
    description: string;
    dueTime: string;
    submitLater: boolean;
    submitLaterTime: string;
    maxFileSize: number;
    allowedFileTypes: string;
};

export const CourseFile: React.FC<Props> = ({
  name,
  description,
  dueTime,
  submitLater,
  submitLaterTime,
  maxFileSize,
  allowedFileTypes,
}) => {
  return (
    <>
      <p>Abgabe: {name}</p>
    </>
  );
};

export default CourseFile;
