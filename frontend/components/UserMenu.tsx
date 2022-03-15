import React, { useEffect, useState } from "react";
import { styled, keyframes } from "@stitches/react";
import {
  DotFilledIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { SvgIcon } from "./SvgIcon";
import { useRouter } from "next/router";
import { getAccessToken, getUserData, logout } from "../misc/authHelper";
import { useTheme } from "next-themes";

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
  backgroundColor: "$backgroundSecondary",
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
  color: "$fontPrimary",
  borderRadius: 5,
  display: "flex",
  alignItems: "center",
  height: 25,
  fontWeight: "500",
  fontSize: "1.05rem",
  padding: "3px 8px",
  position: "relative",
  paddingLeft: 25,
  userSelect: "none",
  cursor: "pointer",

  "&[data-disabled]": {
    color: "$fontPrimary",
    pointerEvents: "none",
  },

  "&:focus": {
    backgroundColor: "$specialPrimary",
    color: "$fontPrimary",
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
    backgroundColor: "$specialPrimary",
    color: "$fontPrimary",
  },
  ...itemStyles,
});

const StyledLabel = styled(DropdownMenuPrimitive.Label, {
  paddingLeft: 25,
  fontSize: 12,
  lineHeight: "25px",
  color: "$fontPrimary",
});

const StyledSeparator = styled(DropdownMenuPrimitive.Separator, {
  height: 1,
  backgroundColor: "$fontPrimary",
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
  fill: "$fontPrimary",
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
  color: "$fontPrimary",
  ":focus > &": { color: "$fontPrimary" },
  "[data-disabled] &": { color: "$fontPrimary" },
});

const IconLayout = styled("div", {
  width: "30px",
  height: "30px",
  padding: "5px",
  backgroundColor: "$backgroundTertiary",
  borderRadius: "100%",
});

const UserMenuLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  padding: "8px",
  gap: "10px",
  borderRadius: "200px",
  backgroundColor: "#A2A8C3",
  cursor: "pointer",
  justifyContent: "center",
  alignItems: "center",
});

const ArrowLayout = styled("div", {
  transition: "all 0.2s ease-in-out",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  variants: {
    open: {
      true: {
        transform: "rotate(90deg)",
      },
      false: {},
    },
  },
});

const StyledUserName = styled("p", {});

export const UserMenu = () => {
  const router = useRouter();
  const [schools, setSchools] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  async function updateFromDatabase() {
    let accessToken = await getAccessToken();
    if (accessToken) {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/getSchools`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      let fetchedSchools = await response.json();
      setSchools(fetchedSchools);
      if (router.query.schoolUUID) {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/getCourses/${
            router.query.schoolUUID as string
          }`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        let fetchedCourses = await response.json();
        setCourses(fetchedCourses);
      }
    }
    const userInfo = await getUserData();
    setUserInfo(userInfo);
  }

  useEffect(() => {
    if (isFirstTime) {
      updateFromDatabase();
      setIsFirstTime(false);
    }
  });

  return (
    <Box>
      <DropdownMenu onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <UserMenuLayout>
            <IconLayout>
              <SvgIcon iconName="SvgRoundUser" />
            </IconLayout>
            <StyledUserName>
              {userInfo && userInfo.firstName ? userInfo.firstName : "Profile"}
            </StyledUserName>
            <ArrowLayout open={open}>
              <ChevronRightIcon />
            </ArrowLayout>
          </UserMenuLayout>
        </DropdownMenuTrigger>

        <DropdownMenuContent sideOffset={5} alignOffset={0}>
          {userInfo && userInfo.firstName && (
            <>
              <DropdownMenuItem
                onClick={() => {
                  router.push("/profile/settings");
                }}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenu>
                <DropdownMenuTriggerItem
                  onClick={() => {
                    router.push(
                      `/school/${router.query.schoolUUID as string}/course`
                    );
                  }}
                >
                  Courses
                  <RightSlot>
                    <ChevronRightIcon />
                  </RightSlot>
                </DropdownMenuTriggerItem>
                <DropdownMenuContent sideOffset={2} alignOffset={-5}>
                  {Array.isArray(courses) &&
                    courses.map((course) => (
                      <DropdownMenuItem
                        key={course.courseUUID}
                        onClick={() => {
                          router.push(
                            `/school/${
                              router.query.schoolUUID as string
                            }/course/${course.courseUUID}`
                          );
                        }}
                      >
                        {course.courseName}
                      </DropdownMenuItem>
                    ))}
                  {courses.length == 0 && (
                    <DropdownMenuItem
                      onClick={() => {
                        router.push("/school/select");
                      }}
                    >
                      Select a school to see courses
                    </DropdownMenuItem>
                  )}
                  {courses.length > 0 && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          router.push(
                            `/school/${
                              router.query.schoolUUID as string
                            }/course/create-course`
                          );
                        }}
                      >
                        Create a course
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTriggerItem
                  onClick={() => {
                    router.push("/school/select");
                  }}
                >
                  Schools
                  <RightSlot>
                    <ChevronRightIcon />
                  </RightSlot>
                </DropdownMenuTriggerItem>
                <DropdownMenuContent sideOffset={2} alignOffset={-5}>
                  {schools.map((school) => (
                    <DropdownMenuItem
                      key={school.schoolUUID}
                      onClick={() => {
                        router.push(`/school/${school.schoolUUID}`);
                      }}
                    >
                      {school.schoolName}
                    </DropdownMenuItem>
                  ))}
                  {schools.length > 0 && <DropdownMenuSeparator />}
                  <DropdownMenuItem
                    onClick={() => {
                      router.push("/school/join");
                    }}
                  >
                    Join a school
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push("/school/create");
                    }}
                  >
                    Create new school
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
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTriggerItem>
                  Language
                  <RightSlot>
                    <ChevronRightIcon />
                  </RightSlot>
                </DropdownMenuTriggerItem>
                <DropdownMenuContent sideOffset={2} alignOffset={-5}>
                  <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={setTheme}
                  >
                    <DropdownMenuRadioItem value="english">
                      <DropdownMenuItemIndicator>
                        <DotFilledIcon />
                      </DropdownMenuItemIndicator>
                      English
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="german">
                      <DropdownMenuItemIndicator>
                        <DotFilledIcon />
                      </DropdownMenuItemIndicator>
                      German
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                Logout
              </DropdownMenuItem>
            </>
          )}
          {(!userInfo || !userInfo.firstName) && (
            <>
              <DropdownMenuItem
                onClick={() => {
                  router.push("/auth?tab=register");
                }}
              >
                Register
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  router.push("/auth?tab=login");
                }}
              >
                Login
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
