import React, { useEffect } from "react";
import { styled } from "../stitches.config";
import SvgChecklist from "./svg/SvgChecklist";
import SvgClass from "./svg/SvgClass";
import SvgClosedLogo from "./svg/SvgClosedLogo";
import SvgDelete from "./svg/SvgDelete";
import SvgDepartment from "./svg/SvgDepartment";
import SvgDiscordLogo from "./svg/SvgDiscordLogo";
import SvgEdit from "./svg/SvgEdit";
import SvgInfo from "./svg/SvgInfo";
import SvgOpenLogo from "./svg/SvgOpenLogo";
import SvgQuality from "./svg/SvgQuality";
import SvgStudent from "./svg/SvgStudent";
import SvgTeacher from "./svg/SvgTeacher";
import SvgUser from "./svg/SvgUser";
import SvgWarning from "./svg/SvgWarning";

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
    case "SvgUser":
      return <SvgUser alt="User Icon" />;
    case "SvgQuality":
      return <SvgQuality alt="Quality Icon" />;
    case "SvgWarning":
      return <SvgWarning alt="Warning Icon" />;
    case "SvgOpenLogo":
      return <SvgOpenLogo alt="Open Logo" />;
    case "SvgDiscordLogo":
      return <SvgDiscordLogo alt="Discord Logo" />;
    case "SvgChecklist":
      return <SvgChecklist alt="Checklist Icon" />;
    case "SvgInfo":
      return <SvgInfo alt="Info Icon" />;
    case "SvgClosedLogo":
      return <SvgClosedLogo alt="Closed Logo" />;
    default:
      return <SvgClass />;
  }
};