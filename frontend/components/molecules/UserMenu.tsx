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

type Props = {
  setIsLoggedIn?: Function;
};

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

const StyledContent = styled(DropdownMenuPrimitive.Content, {
  minWidth: 220,
  backgroundColor: "$secondaryContainer",
  borderRadius: 15,
  padding: 8,
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
});

const itemStyles = {
  all: "unset",
  lineHeight: 1,
  color: "$onSecondaryContainer",
  borderRadius: 5,
  display: "flex",
  alignItems: "center",
  height: 25,
  fontWeight: "$medium",
  fontSize: "1.05rem",
  padding: "3px 8px",
  position: "relative",
  paddingLeft: 25,
  userSelect: "none",
  cursor: "pointer",

  "&[data-disabled]": {
    color: "$neutral-500",
    pointerEvents: "none",
  },

  "&:focus": {
    backgroundColor: "$warning",
    color: "$neutral-500",
  },
};

const StyledItem = styled(DropdownMenuPrimitive.Item, { ...itemStyles });
const StyledCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem, {
  ...itemStyles,
});
const StyledRadioItem = styled(DropdownMenuPrimitive.RadioItem, {
  ...itemStyles,
});
const StyledTriggerItem = styled(DropdownMenuPrimitive.TriggerItem, {
  '&[data-state="open"]': {
    backgroundColor: "$warning",
    color: "$neutral-500",
  },
  ...itemStyles,
});

const StyledLabel = styled(DropdownMenuPrimitive.Label, {
  paddingLeft: 25,
  fontSize: 12,
  lineHeight: "25px",
  color: "$neutral-500",
});

const StyledSeparator = styled(DropdownMenuPrimitive.Separator, {
  height: 1,
  backgroundColor: "$outline",
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

const StyledArrow = styled(DropdownMenuPrimitive.Arrow, {
  fill: "$neutral-500",
  position: "relative",
  right: 40,
});

// Exports
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = StyledContent;
export const DropdownMenuItem = StyledItem;
export const DropdownMenuCheckboxItem = StyledCheckboxItem;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuRadioItem = StyledRadioItem;
export const DropdownMenuItemIndicator = StyledItemIndicator;
export const DropdownMenuTriggerItem = StyledTriggerItem;
export const DropdownMenuLabel = StyledLabel;
export const DropdownMenuSeparator = StyledSeparator;
export const DropdownMenuArrow = StyledArrow;

// Your app...
const Box = styled("div", {});

const RightSlot = styled("div", {
  marginLeft: "auto",
  paddingLeft: 20,

  color: "$neutral-500",

  ":focus > &": { color: "$neutral-500" },

  "[data-disabled] &": { color: "$neutral-500" },
});

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

const StyledLink = styled("a", {
  display: "flex",
  width: "100%",
  justifyContent: "space-between",

  color: "$neutral-500",
  textDecoration: "none",
});

export const UserMenu: React.FC<Props> = ({ setIsLoggedIn }) => {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState("en");
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
                <Link href={"/settings/account"} passHref>
                  <StyledLink>Profile</StyledLink>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/school/${currentSchool}/planner?tab=timetable`} passHref>
                  <StyledLink>Planner</StyledLink>
                </Link>
              </DropdownMenuItem>
              <DropdownMenu>
                <DropdownMenuTriggerItem>
                  <Link href={`/school/${currentSchool}/course`} passHref>
                    <StyledLink>Courses</StyledLink>
                  </Link>
                  <RightSlot>
                    <ChevronRightIcon />
                  </RightSlot>
                </DropdownMenuTriggerItem>
                <DropdownMenuContent sideOffset={2} alignOffset={-5}>
                  {coursesStatus == "success" &&
                    courses.map((course) => (
                      <DropdownMenuItem key={course.courseUUID}>
                        <Link
                          href={`/school/${currentSchool}/course/${course.courseUUID}`}
                          passHref
                        >
                          <StyledLink>{course.courseName}</StyledLink>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  {coursesStatus == "success" && courses.length == 0 && (
                    <DropdownMenuItem>
                      <Link href={"/school/select"} passHref>
                        <StyledLink>Profile</StyledLink>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {coursesStatus == "success" && courses.length > 0 && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link
                          href={`/school/${currentSchool}/course/create`}
                          passHref
                        >
                          <StyledLink>Create a course</StyledLink>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTriggerItem>
                  <Link
                    href={`/school/${currentSchool}/course/create`}
                    passHref
                  >
                    <StyledLink>
                      Schools
                      <RightSlot>
                        <ChevronRightIcon />
                      </RightSlot>
                    </StyledLink>
                  </Link>
                </DropdownMenuTriggerItem>
                <DropdownMenuContent sideOffset={2} alignOffset={-5}>
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
                    <Link href={"/school/join"} passHref>
                      <StyledLink>Join a school</StyledLink>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={"/school/create"} passHref>
                      <StyledLink>Create new school</StyledLink>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTriggerItem>
                  Theme
                  <RightSlot>
                    <ChevronRightIcon />
                  </RightSlot>
                </DropdownMenuTriggerItem>
                <DropdownMenuContent sideOffset={2} alignOffset={-5}>
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
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <DropdownMenu>
                <DropdownMenuTriggerItem>
                  Language
                  <RightSlot>
                    <ChevronRightIcon />
                  </RightSlot>
                </DropdownMenuTriggerItem>
                <DropdownMenuContent sideOffset={2} alignOffset={-5}>
                  <DropdownMenuRadioGroup
                    value={language}
                    onValueChange={setLanguage}
                  >
                    <DropdownMenuRadioItem value="en">
                      <DropdownMenuItemIndicator>
                        <DotFilledIcon />
                      </DropdownMenuItemIndicator>
                      English
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="de">
                      <DropdownMenuItemIndicator>
                        <DotFilledIcon />
                      </DropdownMenuItemIndicator>
                      German
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  logout();
                  setIsLoggedIn(false);
                }}
              >
                <Link href={"/"} passHref>
                  <StyledLink>Logout</StyledLink>
                </Link>
              </DropdownMenuItem>
            </>
          )}
          {userInfoStatus != "success" && (
            <>
              <DropdownMenuItem>
                <Link href={"/auth?tab=register"} passHref>
                  <StyledLink>Register</StyledLink>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/"} passHref>
                  <StyledLink>Login</StyledLink>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenu>
                <DropdownMenuTriggerItem>
                  Theme
                  <RightSlot>
                    <ChevronRightIcon />
                  </RightSlot>
                </DropdownMenuTriggerItem>
                <DropdownMenuContent sideOffset={2} alignOffset={-5}>
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
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          <DropdownMenuArrow />
        </DropdownMenuContent>
      </DropdownMenu>
    </Box>
  );
};

export default UserMenu;
