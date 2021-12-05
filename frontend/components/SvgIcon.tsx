import React, { useEffect } from "react";
import { styled } from "../stitches.config";
import SvgClass from "./svg/SvgClass";
import SvgDelete from "./svg/SvgDelete";
import SvgDepartment from "./svg/SvgDepartment";
import SvgEdit from "./svg/SvgEdit";
import SvgStudent from "./svg/SvgStudent";
import SvgTeacher from "./svg/SvgTeacher";

type Props = {
  iconName: string;
};

export const SvgIcon: React.FC<Props> = ({ iconName }) => {
  switch (iconName) {
    case "SvgClass":
      return <SvgClass alt="Class Icon" />;
    case "SvgDepartment":
      return <SvgDepartment alt="Department Icon" />;
    case "SvgStudent":
      return <SvgStudent alt="Student Icon" />;
    case "SvgTeacher":
      return <SvgTeacher alt="Teacher Icon" />;
    case "SvgDelete":
      return <SvgDelete alt="Delete Icon" />;
    case "SvgEdit":
      return <SvgEdit alt="Edit Icon" />;
    default:
      return <SvgClass />;
  }
};
