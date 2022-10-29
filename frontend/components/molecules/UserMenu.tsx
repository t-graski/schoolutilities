import React, { useState } from "react";
import { styled, keyframes } from "@stitches/react";
import { DotFilledIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import {
  getSelectedSchool,
  getUserData,
  loggedIn,
  logout,
  setSelectedSchool,
} from "../../utils/authHelper";
import { useTheme } from "next-themes";
import SvgRoundUser from "../atoms/svg/SvgRoundUser";
import { useQuery } from "react-query";
import { fetchCourses, fetchSchools } from "../../utils/requests";
import Link from "next/link";
import { getCurrentWeekMonday } from "./time-table/TimeTableWeekSelection";

type Props = {
  setIsLoggedIn?: Function;
};

const IconLayout = styled("div", {
  display: "flex",
  width: "30px",
  height: "30px",
  padding: "5px",
  borderRadius: "100%",

  backgroundColor: "$neutral-300",
});

const UserMenuLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  padding: "8px",
  gap: "10px",
  borderRadius: "200px",
  justifyContent: "center",
  alignItems: "center",

  backgroundColor: "$primary",
  color: "$onPrimary",
  cursor: "pointer",
});

const ArrowLayout = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  transition: "all 0.2s ease-in-out",

  variants: {
    open: {
      true: {
        transform: "rotate(-90deg)",
      },
      false: {},
    },
  },
});

const StyledUserName = styled("p", {});

const StyledLink = styled(Link, {
  display: "flex",
  width: "100%",
  justifyContent: "space-between",

  color: "$neutral-500",
  textDecoration: "none",
});

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const contentStyles = {
  minWidth: 220,
  backgroundColor: "$surface2",
  borderRadius: "$small",
  padding: "$1x",
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
};

const StyledContent = styled(DropdownMenuPrimitive.Content, {
  ...contentStyles,
});

const StyledArrow = styled(DropdownMenuPrimitive.Arrow, {
  fill: "white",
});

function Content({ children, ...props }) {
  return (
    <DropdownMenuPrimitive.Portal>
      <StyledContent {...props}>
        {children}
        <StyledArrow />
      </StyledContent>
    </DropdownMenuPrimitive.Portal>
  );
}

const StyledSubContent = styled(DropdownMenuPrimitive.SubContent, {
  ...contentStyles,
});

function SubContent(props) {
  return (
    <DropdownMenuPrimitive.Portal>
      <StyledSubContent {...props} />
    </DropdownMenuPrimitive.Portal>
  );
}

const itemStyles = {
  all: "unset",
  fontSize: "$s",
  lineHeight: 1,
  color: "$onSurface",
  borderRadius: "$small",
  display: "flex",
  alignItems: "center",
  position: "relative",
  userSelect: "none",
  padding: "$1x $2x",
  cursor: "pointer",
  gap: "$1x",
  paddingLeft: "$3x",

  "&[data-disabled]": {
    color: "$onSurfaceVariant",
    pointerEvents: "none",
  },

  "&[data-highlighted]": {
    backgroundColor: "$primaryContainer",
    color: "onPrimaryContainer",
  },
};

const StyledItem = styled(DropdownMenuPrimitive.Item, { ...itemStyles });
const StyledCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem, {
  ...itemStyles,
});
const StyledRadioItem = styled(DropdownMenuPrimitive.RadioItem, {
  ...itemStyles,
});
const StyledSubTrigger = styled(DropdownMenuPrimitive.SubTrigger, {
  '&[data-state="open"]': {
    backgroundColor: "$primaryContainer",
    color: "onPrimaryContainer",
  },
  ...itemStyles,
});

const StyledLabel = styled(DropdownMenuPrimitive.Label, {
  paddingLeft: 25,
  fontSize: 12,
  lineHeight: "25px",
  color: "$onSurfaceVariant",
});

const StyledSeparator = styled(DropdownMenuPrimitive.Separator, {
  height: 1,
  backgroundColor: "$surfaceVariant",
  margin: 5,
});

const StyledItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator, {
  position: "absolute",
  left: 0,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

// Exports
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = Content;
export const DropdownMenuItem = StyledItem;
export const DropdownMenuCheckboxItem = StyledCheckboxItem;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuRadioItem = StyledRadioItem;
export const DropdownMenuItemIndicator = StyledItemIndicator;
export const DropdownMenuLabel = StyledLabel;
export const DropdownMenuSeparator = StyledSeparator;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuSubTrigger = StyledSubTrigger;
export const DropdownMenuSubContent = SubContent;

// Your app...
const Box = styled("div", {});

const RightSlot = styled("div", {
  marginLeft: "auto",
  color: "$onSurface",
  "[data-highlighted] > &": { color: "$onPrimaryContainer" },
  "[data-disabled] &": { color: "$onPrimary" },
});

export const UserMenu: React.FC<Props> = ({ setIsLoggedIn }) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const [currentSchool, setCurrentSchool] = useState(getSelectedSchool());

  const { data: schools, status: schoolsStatus } = useQuery(
    "schools",
    fetchSchools,
    {
      refetchOnMount: false,
      staleTime: 120000,
      enabled: loggedIn(),
    }
  );
  const { data: courses, status: coursesStatus } = useQuery(
    ["courses", currentSchool],
    () => fetchCourses(currentSchool),
    {
      refetchOnMount: false,
      staleTime: 30000,
      enabled: loggedIn(),
    }
  );
  const { data: userInfo, status: userInfoStatus } = useQuery(
    "userInfo",
    getUserData,
    {
      refetchOnMount: false,
      staleTime: 60000,
      enabled: loggedIn(),
    }
  );

  if (schoolsStatus === "success" && !currentSchool) {
    setCurrentSchool(schools[0].schoolUUID);
  }

  return (
    <Box>
      <DropdownMenu onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <UserMenuLayout>
            <IconLayout>
              <SvgRoundUser />
            </IconLayout>
            <StyledUserName>
              {userInfo && userInfo.userFirstname
                ? userInfo.userFirstname
                : "Profile"}
            </StyledUserName>
            <ArrowLayout open={open}>
              <ChevronRightIcon />
            </ArrowLayout>
          </UserMenuLayout>
        </DropdownMenuTrigger>

        <DropdownMenuContent sideOffset={5} alignOffset={0}>
          {userInfoStatus == "success" && (
            <>
              <DropdownMenuItem>
                <StyledLink href={"/settings/account"} passHref>
                  Profile
                </StyledLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <StyledLink
                  href={`/school/${currentSchool}/planner?tab=timetable&startDate=${getCurrentWeekMonday()}&schoolClassUUID=${
                    userInfo && userInfo.userSchoolClass
                  }`}
                  passHref
                >
                  Planner
                </StyledLink>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <StyledLink href={`/school/${currentSchool}/course`} passHref>
                    Courses
                  </StyledLink>
                  <RightSlot>
                    <ChevronRightIcon />
                  </RightSlot>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent sideOffset={2} alignOffset={-5}>
                  {coursesStatus == "success" &&
                    courses.map((course) => (
                      <DropdownMenuItem key={course.courseUUID}>
                        <StyledLink
                          href={`/school/${currentSchool}/course/${course.courseUUID}`}
                          passHref
                        >
                          {course.courseName}
                        </StyledLink>
                      </DropdownMenuItem>
                    ))}
                  {coursesStatus == "success" && courses.length == 0 && (
                    <DropdownMenuItem>
                      <StyledLink href={"/school/select"} passHref>
                        Profile
                      </StyledLink>
                    </DropdownMenuItem>
                  )}
                  {coursesStatus == "success" && courses.length > 0 && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <StyledLink
                          href={`/school/${currentSchool}/course/create`}
                          passHref
                        >
                          Create a course
                        </StyledLink>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <StyledLink
                    href={`/school/${currentSchool}/course/create`}
                    passHref
                  >
                    Schools
                    <RightSlot>
                      <ChevronRightIcon />
                    </RightSlot>
                  </StyledLink>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent sideOffset={2} alignOffset={-5}>
                  <DropdownMenuRadioGroup
                    value={currentSchool}
                    onValueChange={(value) => {
                      setSelectedSchool(value);
                      setCurrentSchool(value);
                    }}
                  >
                    {schoolsStatus == "success" &&
                      schools.map((school) => (
                        <DropdownMenuRadioItem
                          key={school.schoolUUID}
                          value={school.schoolUUID}
                        >
                          <DropdownMenuItemIndicator>
                            <DotFilledIcon />
                          </DropdownMenuItemIndicator>
                          {school.schoolName}
                        </DropdownMenuRadioItem>
                      ))}
                  </DropdownMenuRadioGroup>
                  {schoolsStatus == "success" && schools.length > 0 && (
                    <DropdownMenuSeparator />
                  )}
                  <DropdownMenuItem>
                    <StyledLink href={"/school/join"} passHref>
                      Join a school
                    </StyledLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <StyledLink href={"/school/create"} passHref>
                      Create new school
                    </StyledLink>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  Theme
                  <RightSlot>
                    <ChevronRightIcon />
                  </RightSlot>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent sideOffset={2} alignOffset={-5}>
                  <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={setTheme}
                  >
                    <DropdownMenuRadioItem value="dark">
                      <DropdownMenuItemIndicator>
                        <DotFilledIcon />
                      </DropdownMenuItemIndicator>
                      Dark
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="light">
                      <DropdownMenuItemIndicator>
                        <DotFilledIcon />
                      </DropdownMenuItemIndicator>
                      Light
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">
                      <DropdownMenuItemIndicator>
                        <DotFilledIcon />
                      </DropdownMenuItemIndicator>
                      System
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  logout();
                  setIsLoggedIn(false);
                }}
              >
                <StyledLink href={"/"} passHref>
                  Logout
                </StyledLink>
              </DropdownMenuItem>
            </>
          )}
          {userInfoStatus != "success" && (
            <>
              <DropdownMenuItem>
                <StyledLink href={"/auth?tab=register"} passHref>
                  Register
                </StyledLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <StyledLink href={"/"} passHref>
                  Login
                </StyledLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  Theme
                  <RightSlot>
                    <ChevronRightIcon />
                  </RightSlot>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent sideOffset={2} alignOffset={-5}>
                  <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={setTheme}
                  >
                    <DropdownMenuRadioItem value="dark">
                      <DropdownMenuItemIndicator>
                        <DotFilledIcon />
                      </DropdownMenuItemIndicator>
                      Dark
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="light">
                      <DropdownMenuItemIndicator>
                        <DotFilledIcon />
                      </DropdownMenuItemIndicator>
                      Light
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </Box>
  );
};

export default UserMenu;
