import React from "react";

// this usually goes once
// to the entry point of the whole app
// (e.g. src/index.js)
import "react-nestable/dist/styles/index.css";

type Props = {
  text: string;
};

export const CourseText: React.FC<Props> = ({
  text
}) => {
  return (
    <>
      <p>{text}</p>
    </>
  );
};

export default CourseText;
