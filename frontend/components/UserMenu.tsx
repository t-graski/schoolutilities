import React, { useEffect, useState } from "react";
import { styled, keyframes } from "@stitches/react";
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import cookie from "js-cookie";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { SvgIcon } from "./SvgIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAccessToken, logout } from "../misc/authHelper";
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
  right: -10,
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

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 35,
  width: 35,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$fontPrimary",
  backgroundColor: "$fontPrimary",
  boxShadow: `0 2px 10px $fontPrimary`,
  "&:hover": { backgroundColor: "$fontPrimary" },
  "&:focus": { boxShadow: `0 0 0 2px $fontPrimary` },
});

const LinkLayout = styled("a", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "20px",
  padding: "15px 20px",
  borderRadius: "20px",
  backgroundColor: "$backgroundSecondary",
  cursor: "pointer",
  "&[data-size='small']": {
    justifyContent: "center",
    width: "fit-content",
  },
  variants: {
    color: {
      primary: {},
      secondary: {
        backgroundColor: "$fontPrimary",
      },
      special: {
        backgroundColor: "$specialPrimary",
      },
    },
  },
});

const IconLayout = styled("div", {
  width: "30px",
  height: "30px",
});

const LinkContentLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "70%",
});

const LinkLabel = styled("p", {
  fontWeight: "bold",
  variants: {
    color: {
      primary: {
        color: "$fontPrimary",
      },
      secondary: {
        color: "$backgroundTertiary",
      },
      special: {
        fontWeight: "normal",
      },
    },
  },
});

const StyledLink = styled(Link, {
  "& a": {
    color: "fontPrimary",
    textDecoration: "none",
  },
  "& a:hover": {
    textDecoration: "underline",
  },
});

export const UserMenu = (userName) => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState("pedro");
  const router = useRouter();
  const [schools, setSchools] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [userInfo, setUserInfo] = useState({
    firstName: "Firstname",
    lastName: "Lastname",
    email: "Email",
    creationDate: "",
    birthDate: new Date().toISOString(),
  });
  const { theme, setTheme } = useTheme();

  async function updateSchoolsFromDatabase() {
    let accessToken = await getAccessToken();
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
    console.log(fetchedSchools);
  }

  useEffect(() => {
    if (isFirstTime) {
      getUserInfo();
      updateSchoolsFromDatabase();
      setIsFirstTime(false);
    }
  });

  async function getUserInfo() {
    const token = await getAccessToken();
    if (!token) {
      router.push("/auth/login");
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/profile`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 200) {
    } else {
      const data = await response.json();
      setUserInfo(data);
    }
  }

  return (
    <Box>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconLayout>
            <SvgIcon iconName="SvgUser" />
          </IconLayout>
        </DropdownMenuTrigger>

        <DropdownMenuContent sideOffset={5} alignOffset={0}>
          <DropdownMenuItem
            onClick={() => {
              router.push("/profile/settings");
            }}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenu>
            <DropdownMenuTriggerItem>
              Theme
              <RightSlot>
                <ChevronRightIcon />
              </RightSlot>
            </DropdownMenuTriggerItem>
            <DropdownMenuContent sideOffset={2} alignOffset={-5}>
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
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
          <DropdownMenuSeparator />
          <DropdownMenu>
            <DropdownMenuTriggerItem>
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
                    cookie.set("schoolUUID", school.schoolUUID);
                    router.push("/school/admin/settings");
                    if (router.pathname.includes("/school/admin/settings")) {
                      router.reload();
                    }
                  }}
                >
                  {school.schoolName}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  router.push("/profile/school-join");
                }}
              >
                Join a school
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  router.push("/school/admin/create-school");
                }}
              >
                Create new school
              </DropdownMenuItem>
            </DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenu>
          <DropdownMenuArrow />
        </DropdownMenuContent>
      </DropdownMenu>
    </Box>
  );
};

export default UserMenu;
