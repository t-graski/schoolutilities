import React from "react";
import SvgAlert from "./svg/SvgAlert";
import SvgAttendance from "./svg/SvgAttendance";
import SvgBirthDate from "./svg/SvgBirthDate";
import SvgCalculator from "./svg/SvgCalculator";
import SvgChecklist from "./svg/SvgChecklist";
import SvgCheckMark from "./svg/SvgCheckMark";
import SvgClass from "./svg/SvgClass";
import SvgClose from "./svg/SvgClose";
import SvgClosedLogo from "./svg/SvgClosedLogo";
import SvgDelete from "./svg/SvgDelete";
import SvgDepartment from "./svg/SvgDepartment";
import SvgDiscordLogo from "./svg/SvgDiscordLogo";
import SvgEdit from "./svg/SvgEdit";
import SvgEmail from "./svg/SvgEmail";
import SvgExclamination from "./svg/SvgExclamination";
import SvgEye from "./svg/SvgEye";
import SvgEyeRestricted from "./svg/SvgEyeRestricted";
import SvgFile from "./svg/SvgFile";
import SvgFirstAidKit from "./svg/SvgFirstAidKit";
import SvgHamburger from "./svg/SvgHamburger";
import SvgHome from "./svg/SvgHome";
import SvgInfo from "./svg/SvgInfo";
import SvgPassword from "./svg/SvgKey";
import SvgLanguage from "./svg/SvgLanguage";
import SvgName from "./svg/SvgName";
import SvgOpenLogo from "./svg/SvgOpenLogo";
import SvgPremium from "./svg/SvgPremium";
import SvgQuality from "./svg/SvgQuality";
import SvgRightArrow from "./svg/SvgRightArrow";
import SvgRoundUser from "./svg/SvgRoundUser";
import SvgSchool from "./svg/SvgSchool";
import SvgStartpageArtwork from "./svg/SvgStartpageArtwork";
import SvgStats from "./svg/SvgStats";
import SvgStudent from "./svg/SvgStudent";
import SvgSuperman from "./svg/SvgSuperman";
import SvgTeacher from "./svg/SvgTeacher";
import SvgTimetable from "./svg/SvgTimetable";
import SvgTimezone from "./svg/SvgTimezone";
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
    case "SvgTimetable":
      return <SvgTimetable alt="Timetable Icon" />;
    case "SvgCalculator":
      return <SvgCalculator alt="Calculator Icon" />;
    case "SvgAttendance":
      return <SvgAttendance alt="Attendance Icon" />;
    case "SvgAlert":
      return <SvgAlert alt="Alert Icon" />;
    case "SvgHome":
      return <SvgHome alt="Home Icon" />;
    case "SvgRightArrow":
      return <SvgRightArrow alt="Right Arrow Icon" />;
    case "SvgSchool":
      return <SvgSchool alt="School Icon" />;
    case "SvgBirthDate":
      return <SvgBirthDate alt="Birth Date Icon" />;
    case "SvgName":
      return <SvgName alt="Name Icon" />;
    case "SvgEmail":
      return <SvgEmail alt="Email Icon" />;
    case "SvgPassword":
      return <SvgPassword alt="Password Icon" />;
    case "SvgRoundUser":
      return <SvgRoundUser alt="User Icon" />;
    case "SvgPremium":
      return <SvgPremium alt="Premium Icon" />;
    case "SvgTimezone":
      return <SvgTimezone alt="Timezone Icon" />;
    case "SvgLanguage":
      return <SvgLanguage alt="Language Icon" />;
    case "SvgHamburger":
      return <SvgHamburger alt="Hamburger Icon" />;
    case "SvgFile":
      return <SvgFile alt="File Icon" />;
    case "SvgCheckMark":
      return <SvgCheckMark alt="Check Mark Icon" />;
    case "SvgStartpageArtwork":
      return <SvgStartpageArtwork alt="Startpage Artwork Icon" />;
    case "SvgExclamination":
      return <SvgExclamination alt="Exclamation Icon" />;
    case "SvgEye":
      return <SvgEye alt="Eye Icon" />;
    case "SvgEyeRestricted":
      return <SvgEyeRestricted alt="Eye Restricted Icon" />;
    case "SvgClose":
      return <SvgClose alt="Close Icon" />;
    case "SvgSuperman":
      return <SvgSuperman alt="Superman Icon" />;
    case "SvgFirstAidKit":
      return <SvgFirstAidKit alt="First Aid Kit Icon" />;
    case "SvgStats":
      return <SvgStats alt="Stats Icon" />;
    default:
      return <SvgClass />;
  }
};
